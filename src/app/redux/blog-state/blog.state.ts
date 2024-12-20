import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BlogPostDto } from '../../entities/dto/blog-post.dto';
import { CreateBlogDto } from '../../entities/dto/create-blog.dto';
import {
  DeleteBlogPost,
  EditBlogPost,
  LoadPopularBlogPosts,
  NextPageBlogPosts,
  RefreshNewBlogPost,
  SaveEditedBlogPost,
  SaveNewBlogPost,
  UpdateNewBlogPost,
} from './blog.actions';
import { BlogService } from '../../services/blog.service';

export interface BlogStateModel {
  posts: BlogPostDto[];
  popular: BlogPostDto[];
  page: number;
  hasMore: boolean;
  newPost: Partial<CreateBlogDto> & { id?: string };
}

@State<BlogStateModel>({
  name: 'blogState',
  defaults: {
    posts: [],
    popular: [],
    page: 0,
    hasMore: false,
    newPost: {},
  },
})
@Injectable()
export class BlogState {
  constructor(private readonly blogService: BlogService) {}

  @Selector()
  static posts(state: BlogStateModel): BlogPostDto[] {
    return state.posts;
  }
  @Selector()
  static page(state: BlogStateModel): number {
    return state.page;
  }
  @Selector()
  static popular(state: BlogStateModel): BlogPostDto[] {
    return state.popular;
  }

  @Selector()
  static newPost(state: BlogStateModel): Partial<CreateBlogDto> {
    return state.newPost;
  }

  @Selector()
  static hasMore(state: BlogStateModel): boolean {
    return state.hasMore;
  }

  @Action(NextPageBlogPosts)
  nextPageBlogPosts({ getState, patchState }: StateContext<BlogStateModel>) {
    const state = getState();
    this.blogService
      .findBlogPosts({ page: state.page + 1, take: 10 })
      .subscribe((page) => {
        patchState({
          posts: [...(state.posts || []), ...(page.items || [])],
          page: state.page + 1,
          hasMore: page.meta.hasNextPage,
        });
      });
  }

  @Action(LoadPopularBlogPosts)
  loadPopularBlogPosts({ patchState }: StateContext<BlogStateModel>) {
    this.blogService.getPopularBlogPosts().subscribe((popular) => {
      patchState({
        popular,
      });
    });
  }

  @Action(RefreshNewBlogPost)
  refreshNewBlogPost({ patchState }: StateContext<BlogStateModel>) {
    patchState({
      newPost: {},
    });
  }

  @Action(UpdateNewBlogPost)
  updateNewBlogPost(
    { patchState, getState }: StateContext<BlogStateModel>,
    { postUpdate }: UpdateNewBlogPost,
  ) {
    const state = getState();
    patchState({
      newPost: {
        ...state.newPost,
        ...postUpdate,
      },
    });
  }

  @Action(DeleteBlogPost)
  deleteBlogPost(
    { patchState, getState }: StateContext<BlogStateModel>,
    { id }: DeleteBlogPost,
  ) {
    const state = getState();
    const posts = state.posts.filter((post) => post.id !== id);
    patchState({
      posts,
    });
  }

  @Action(SaveNewBlogPost)
  saveNewBlogPost({ getState, patchState }: StateContext<BlogStateModel>) {
    const state = getState();
    this.blogService
      .createBlogPost({
        ...(state.newPost as CreateBlogDto),
        image: this.formatImage(state.newPost.image as string) || '',
      })
      .subscribe((blogPost) => {
        patchState({
          newPost: {},
          posts: [blogPost, ...(state.posts || [])],
        });
      });
  }

  @Action(SaveEditedBlogPost)
  saveEditedBlogPost({ getState, patchState }: StateContext<BlogStateModel>) {
    const state = getState();
    const { image, ...rest } = state.newPost;
    const payload = {
      ...rest,
      ...(image !== undefined &&
        image !== '' && { image: this.formatImage(image) }),
    };

    if (!payload.id) return;

    this.blogService.editBlogPost(payload.id, payload).subscribe((blogPost) => {
      patchState({
        newPost: {},
        posts: [blogPost, ...(state.posts || [])],
      });
    });
  }

  @Action(EditBlogPost)
  editBlogPost(
    { patchState, getState }: StateContext<BlogStateModel>,
    { id }: EditBlogPost,
  ) {
    const state = getState();
    const post = state.posts.find((p) => p.id === id);
    if (post) {
      patchState({
        newPost: post,
      });
    } else {
      // get from server
      this.blogService.getBlogPostById(id).subscribe((p) => {
        patchState({
          newPost: { ...p, mdContent: p.mdContentPath },
        });
      });
    }
  }

  private formatImage(image?: string): string | undefined {
    if (!image) return undefined;
    return image
      .replace('data:image/jpeg;base64,', '')
      .replace('data:image/png;base64,', '')
      .replace('data:image/gif;base64,', '')
      .replace('data:image/webp;base64,', '')
      .replace('data:image/svg+xml;base64,', '');
  }
}

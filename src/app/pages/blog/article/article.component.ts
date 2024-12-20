import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
  PlatformLocation,
} from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MarkdownModule } from 'ngx-markdown';
import { map } from 'rxjs';
import { ArticleDisplayComponent } from '../../../components/article-display/article-display.component';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { BlogPostDto } from '../../../entities/dto/blog-post.dto';
import { environment } from '../../../environment/environment';
import { LoadPopularBlogPosts } from '../../../redux/blog-state/blog.actions';
import { BlogState } from '../../../redux/blog-state/blog.state';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MarkdownModule,
    ArticleDisplayComponent,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  private projectId = environment.projectId;
  slug = this.route.snapshot.paramMap.get('slug');
  post$ = this.blogService.getBlogPost(this.slug || '');
  post: BlogPostDto | undefined;
  imgLoaded = false;
  articleBreadcrumbs: { label: string; href?: string }[] | string[] = [
    'Blog',
    '<loading>',
  ];

  otherPosts$ = this.store.select(BlogState.popular).pipe(
    map((posts) => posts.filter((p) => p.slug !== this.slug)),
    map((posts) => posts.slice(0, 3)),
  );

  isEditor$ = this.blogService.isEditor(this.projectId);

  constructor(
    private platformLocation: PlatformLocation,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly blogService: BlogService,
    // private readonly popupService: PopupService,
    private readonly metaService: Meta,
    private readonly titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  ngOnInit(): void {
    // For our project, leave everything to be handled by the SSG
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new LoadPopularBlogPosts());
    }
    this.post$.subscribe((post) => {
      this.post = post;
      this.addMetaTags(post);
      this.articleBreadcrumbs = [
        { label: 'Blog', href: '/blog' },
        { label: post.title, href: this.blogService.createArticleHref(post) },
      ];
    });
  }

  loadImage(): void {
    this.imgLoaded = true;
  }

  getArticleHref(blogPost: BlogPostDto): string {
    return this.blogService.createArticleHref(blogPost);
  }

  // handleDelete(): void {
  //   const post = this.post;
  //   if (!post) return;
  //   this.popupService
  //     .showDeleteArticlePopup(post)
  //     .pipe(take(1))
  //     .subscribe((res) => {
  //       if (res === Resolution.Confirm) {
  //         this.deleteBlogPost(post);
  //       }
  //     });
  // }

  // handleEdit() {
  //   if (!this.post) return;
  //   this.store.dispatch(new EditBlogPost(this.post.id)).subscribe(() => {
  //     if (isPlatformBrowser(this.platformId)) {
  //       setTimeout(() => {
  //         this.router.navigate([`${Navigation.blog.href}/edit`]);
  //       }, 500);
  //     }
  //   });
  // }
  //
  // private deleteBlogPost(post: BlogPostDto) {
  //   this.blogService.deleteBlogPost(post).subscribe(() => {
  //     this.redirectToBlog();
  //   });
  // }

  redirectToBlog(): void {
    this.router.navigate(['/blog']).then(() => {
      window.location.reload();
    });
  }

  addMetaTags(blogPost: BlogPostDto): void {
    this.metaService.updateTag({
      name: 'description',
      content: blogPost.tldr || '',
    });

    this.metaService.updateTag({
      name: 'title',
      content: blogPost.title || '',
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: [
        ...blogPost.tags,
        'activ kinetic',
        'blog',
        'kinetoterapie',
        'domiciliu',
      ].join(', '),
    });

    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    this.metaService.updateTag({
      property: 'og:title',
      content: blogPost.title || '',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: blogPost.tldr || '',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: blogPost.imagePath || '',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: `https://activkinetic.ro${this.router.url}`,
    });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'Activ Kinetic',
    });

    // Twitter Card Meta Tags
    this.metaService.updateTag({
      name: 'twitter:card',
      content: blogPost.imagePath || '',
    });
    this.metaService.updateTag({
      name: 'twitter:title',
      content: blogPost.title || '',
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: blogPost.tldr || '',
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: blogPost.imagePath || '',
    });
    this.metaService.updateTag({
      name: 'twitter:url',
      content: this.router.url,
    });

    // update title
    this.titleService.setTitle(blogPost.title || '');

    // update canonical link
    const canonicalLinkElement = this.document.querySelector(
      'link[rel="canonical"]',
    );
    if (canonicalLinkElement) {
      canonicalLinkElement.setAttribute(
        'href',
        `https://activkinetic.ro${this.router.url}`,
      );
    }
  }
}

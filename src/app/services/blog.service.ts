import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { BlogPostDto } from '../entities/dto/blog-post.dto';
import { CreateBlogDto } from '../entities/dto/create-blog.dto';
import { PageOptionsDto } from '../entities/dto/page-options.dto';
import { PageDto } from '../entities/dto/page.dto';
import { UpdateBlogDto } from '../entities/dto/update-blog.dto';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private readonly http: HttpClient) {}

  createArticleHref(blogPost: BlogPostDto): string {
    return `/blog/${blogPost.slug}`;
  }

  findBlogPosts(
    pageOptionsDto: PageOptionsDto,
  ): Observable<PageDto<BlogPostDto>> {
    return this.http.post<PageDto<BlogPostDto>>(
      `website-api::blog/${environment.projectId}/find`,
      pageOptionsDto,
    );
  }

  getPopularBlogPosts(): Observable<BlogPostDto[]> {
    return this.http.get<BlogPostDto[]>(
      `website-api::blog/${environment.projectId}/popular`,
    );
  }

  getBlogPost(slug: string): Observable<BlogPostDto> {
    return this.http.get<BlogPostDto>(
      `website-api::blog/${environment.projectId}/slug/${slug}`,
    );
  }

  getBlogPostById(id: string): Observable<BlogPostDto> {
    return this.http.get<BlogPostDto>(
      `website-api::blog/${environment.projectId}/${id}`,
    );
  }

  downloadMarkdown(mdContentPath: string): Observable<string> {
    return this.http.get(mdContentPath, { responseType: 'text' });
  }

  createBlogPost(blogPost: CreateBlogDto): Observable<BlogPostDto> {
    return this.http.post<BlogPostDto>(
      `website-api::blog/${environment.projectId}`,
      blogPost,
    );
  }

  editBlogPost(id: string, blogPost: UpdateBlogDto): Observable<BlogPostDto> {
    return this.http.put<BlogPostDto>(
      `website-api::blog/${environment.projectId}/${id}`,
      blogPost,
    );
  }

  deleteBlogPost(blogPost: BlogPostDto) {
    return this.http.delete<BlogPostDto>(
      `website-api::blog/${environment.projectId}/${blogPost.id}`,
    );
  }

  isEditor(projectId: string): Observable<boolean> {
    return this.http.get<boolean>(`website-api::blog/editor/${projectId}`).pipe(
      map((isEditor) => {
        if (isEditor) {
          return true;
        } else {
          return false;
        }
      }),
      catchError((_error) => {
        return of(false);
      }),
    );
  }
}


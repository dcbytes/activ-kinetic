import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ArticleDisplayComponent } from '../../components/article-display/article-display.component';
import { ArticleMiniPreviewComponent } from '../../components/article-mini-preview/article-mini-preview.component';
import { Store } from '@ngxs/store';
import { BlogPostDto } from '../../entities/dto/blog-post.dto';
import {
  NextPageBlogPosts,
  LoadPopularBlogPosts,
} from '../../redux/blog-state/blog.actions';
import { BlogState } from '../../redux/blog-state/blog.state';
import { LoadPopularTags } from '../../redux/tag-state/tag.actions';
import { TagState } from '../../redux/tag-state/tag.state';
import { BlogService } from '../../services/blog.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    ArticleDisplayComponent,
    ArticleMiniPreviewComponent,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  posts$ = this.store.select(BlogState.posts);
  hasMore$ = this.store.select(BlogState.hasMore);
  popularPosts$ = this.store.select(BlogState.popular);
  popularTags$ = this.store.select(TagState.popular);

  constructor(
    private readonly store: Store,
    private readonly blogService: BlogService,
    private readonly metaService: Meta,
    private readonly titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  ngOnInit(): void {
    this.loadMetaTags();
    if (isPlatformBrowser(this.platformId)) {
      this.loadNextPage();
    }
    this.loadPopular();
    this.loadPopularTags();
  }

  getArticleHref(blogPost: BlogPostDto) {
    return this.blogService.createArticleHref(blogPost);
  }

  loadNextPage() {
    this.store.dispatch(new NextPageBlogPosts());
  }

  loadPopular() {
    this.store.dispatch(new LoadPopularBlogPosts());
  }

  loadPopularTags() {
    this.store.dispatch(new LoadPopularTags());
  }

  loadMetaTags() {
    this.metaService.updateTag({
      name: 'description',
      content:
        'Descoperă articole utile despre kinetoterapie, recuperare medicală și sănătate pe blogul Activ Kinetic. Inspiră-te din expertiza noastră pentru a-ți îmbunătăți sănătatea.',
    });
    this.metaService.updateTag({
      name: 'title',
      content:
        'Blog Activ Kinetic - Articole despre kinetoterapie, recuperare medicală și sănătate',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Dcbytes, blog web design, dezvoltare web, branding, soluții digitale, Sibiu, design modern, funcționalitate, afaceri online, articole web, software personalizat, sibiu',
    });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    this.metaService.updateTag({
      name: 'author',
      content: 'DCBYTES SRL',
    });
    this.metaService.updateTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    });

    // Open Graph Meta Tags
    this.metaService.updateTag({
      property: 'og:title',
      content:
        'Blog Activ Kinetic - Articole despre kinetoterapie, recuperare medicală și sănătate',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Descoperă articole utile despre kinetoterapie, recuperare medicală și sănătate pe blogul Activ Kinetic. Inspiră-te din expertiza noastră pentru a-ți îmbunătăți sănătatea.',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://activkinetic.ro/ogimage.png',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://activkinetic.ro/blog',
    });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'Activ Kinetic Blog',
    });

    // Twitter Card Meta Tags
    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'https://activkinetic.ro/ogimage.png',
    });
    this.metaService.updateTag({
      name: 'twitter:title',
      content:
        'Blog Activ Kinetic - Articole despre kinetoterapie, recuperare medicală și sănătate',
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Descoperă articole utile despre kinetoterapie, recuperare medicală și sănătate pe blogul Activ Kinetic. Inspiră-te din expertiza noastră pentru a-ți îmbunătăți sănătatea.',
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: 'https://activkinetic.ro/ogimage.png',
    });
    this.metaService.updateTag({
      name: 'twitter:url',
      content: 'https://activkinetic.ro/blog',
    });

    // update title
    this.titleService.setTitle(
      'Blog Activ Kinetic - Articole despre kinetoterapie, recuperare medicală și sănătate',
    );

    // update canonical link
    const canonicalLinkElement = this.document.querySelector(
      'link[rel="canonical"]',
    );
    if (canonicalLinkElement) {
      canonicalLinkElement.setAttribute('href', 'https://activkinetic.ro/blog');
    }
  }
}

/**
 * Data Transfer Object for a Blog Post.
 */
export class BlogPostDto {
  /**
   * Unique identifier for the blog post.
   */
  id: string;

  /**
   * URL or path to the image associated with the blog post.
   */
  imagePath: string;

  /**
   * Title of the blog post.
   */
  title: string;

  /**
   * Unique identifier for the blog post, used in the URL.
   * @example "how-to-build-a-website"
   */
  slug: string;

  /**
   * Short summary or "too long; didn't read" (TL;DR) of the blog post.
   */
  tldr: string;

  /**
   * Array of tags associated with the blog post.
   */
  tags: string[];

  /**
   * Path to the markdown content of the blog post.
   */
  mdContentPath: string;

  /**
   * Date when the blog post was created.
   */
  created: Date;

  /**
   * The blog post's author
   */
  author: string;
}


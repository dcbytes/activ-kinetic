export class CreateBlogDto {
  image: string;
  title: string;
  tldr: string;
  tags: string[];
  // we recieve the content as a string, so we need
  // to convert it to a file and save it in the db
  mdContent: string;
}


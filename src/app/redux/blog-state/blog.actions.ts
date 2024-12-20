import { CreateBlogDto } from '../../entities/dto/create-blog.dto';

export class NextPageBlogPosts {
  static readonly type = '[Blog] Load Blog Posts';
  constructor() {}
}

export class LoadPopularBlogPosts {
  static readonly type = '[Blog] Load Popular Blog Posts';
  constructor() {}
}

export class RefreshNewBlogPost {
  static readonly type = '[Blog] Refresh New Blog Post';
  constructor() {}
}

export class UpdateNewBlogPost {
  static readonly type = '[Blog] Update New Blog Post';
  constructor(public postUpdate: Partial<CreateBlogDto>) {}
}

export class SaveNewBlogPost {
  static readonly type = '[Blog] Save New Blog Post';
  constructor() {}
}

export class DeleteBlogPost {
  static readonly type = '[Blog] Delete Blog Post';
  constructor(public id: string) {}
}

export class EditBlogPost {
  static readonly type = '[Blog] Edit Blog Post';
  constructor(public id: string) {}
}

export class SaveEditedBlogPost {
  static readonly type = '[Blog] Save Edited Blog Post';
  constructor() {}
}


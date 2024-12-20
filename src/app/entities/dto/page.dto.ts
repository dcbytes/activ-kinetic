import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  items: T[];

  meta: PageMetaDto;
}

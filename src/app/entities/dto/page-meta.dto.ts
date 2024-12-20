import { type PageOptionsDto } from './page-options.dto';

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export class PageMetaDto {
  page: number;

  take: number;

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  filter?: { [key: string]: any };

  orderBy?: string;

  order?: string;

  itemCount: number;

  pageCount: number;

  hasPreviousPage: boolean;

  hasNextPage: boolean;
}

import { Order } from './order.enum';

export class PageOptionsDto {
  order?: Order = Order.DESC;

  orderBy?: string;

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  filter?: { [key: string]: any } = {};

  page: number = 1;

  take: number = 10;
}

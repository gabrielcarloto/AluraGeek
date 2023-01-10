import type { Product } from './product';

export type CartProducts = (Product & {
  quantity: number;
})[];

export type Cart =
  | {
      products?: CartProducts;
    }
  | undefined;

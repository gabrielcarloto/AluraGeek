import type { Product } from '@prisma/client';

export type CartProducts = (Product & {
  quantity: number;
})[];

export type Cart =
  | {
      products?: CartProducts;
    }
  | undefined;

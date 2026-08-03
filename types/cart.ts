import type { Product } from '@lib/db';

export type CartProduct = Product & {
  quantity: number;
};

export type Cart = CartProduct[];

import type { Product } from '@prisma/client';

export type CartProduct = Product & {
  quantity: number;
};

export type Cart = CartProduct[];

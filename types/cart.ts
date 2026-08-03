import type { Product } from '@lib/generated/prisma';

export type CartProduct = Product & {
  quantity: number;
};

export type Cart = CartProduct[];

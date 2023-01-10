import type { Product } from '@prisma/client';

import type { DeepPartial } from '@utils/types';

import { prisma } from './db';

export async function createProduct(data: Product) {
  try {
    return await prisma.product.create({ data: data });
  } catch (err) {
    if (err instanceof Error)
      console.error(`Couldn't create product: ${err.message}`);
    return undefined;
  }
}

export async function getUniqueProduct(id: number) {
  try {
    return await prisma.product.findUnique({ where: { id: id } });
  } catch (err) {
    if (err instanceof Error)
      console.error(`Couldn't get product (id: ${id}): ${err.message}`);
    return undefined;
  }
}

type GetManyProductsOptions = DeepPartial<{
  max: number;
  filter: {
    category: string;
    OR: GetManyProductsOptions['filter'];
    NOT: GetManyProductsOptions['filter'];
    AND: GetManyProductsOptions['filter'];
  };
}>;

export async function getManyProducts(options?: GetManyProductsOptions) {
  try {
    return await prisma.product.findMany({
      take: options?.max,
      where: options?.filter,
    });
  } catch (err) {
    if (err instanceof Error)
      console.error(`Couldn't get products: ${err.message}`);
    return undefined;
  }
}

export async function updateProduct(id: number, data: Product) {
  try {
    return await prisma.product.update({ where: { id: id }, data: data });
  } catch (err) {
    if (err instanceof Error)
      console.error(`Couldn't update product (id: ${id}): ${err.message}`);
    return undefined;
  }
}

export async function deleteProduct(id: number) {
  try {
    await prisma.product.delete({ where: { id: id } });
  } catch (err) {
    if (err instanceof Error)
      console.error(`Couldn't delete product (id: ${id}): ${err.message}`);
  }
}

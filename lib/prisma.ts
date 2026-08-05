import type { Prisma, Product } from '@lib/db';
import { prisma } from '@lib/db';

export async function createProduct(data: Product) {
  return prisma.product.create({ data });
}

export async function getUniqueProduct(id: number) {
  return prisma.product.findUnique({ where: { id } });
}

type GetManyProductsOptions = {
  max?: number;
  filter?: Prisma.ProductWhereInput;
};

export async function getManyProducts(options?: GetManyProductsOptions) {
  return prisma.product.findMany({
    take: options?.max,
    where: options?.filter,
  });
}

export async function updateProduct(id: number, data: Product) {
  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({ where: { id } });
}

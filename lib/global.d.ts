import type { Prisma } from '@lib/generated/prisma';
import { PrismaClient } from '@lib/generated/prisma';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

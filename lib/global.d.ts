import type { Prisma } from '@lib/db';
import { PrismaClient } from '@lib/db';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

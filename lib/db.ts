import { PrismaPg } from '@prisma/adapter-pg';

import { getENV } from '@utils/env';

import { PrismaClient } from './generated/prisma';

const { DATABASE_URL } = getENV('DATABASE_URL');

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
});

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export * from './generated/prisma';

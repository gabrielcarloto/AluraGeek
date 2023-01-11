import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

import { getENV } from './env';

export const ADMIN_USER = {
  NAME: 'Admin',
  EMAIL: 'nevergonna@giveyou.up',
  USERNAME: 'peypey',
  PASSWORD: 'negoney',
} as const;

/**
 * Can be used both in client and server
 */
export function isAdmin(session: Session | null): boolean;
export function isAdmin(session: JWT | null): boolean;
export function isAdmin(session: JWT | Session | null): boolean {
  if (!session) return false;

  if ('user' in session)
    return Boolean(
      (session as Session).user?.name === ADMIN_USER.NAME &&
        (session as Session).user?.email === ADMIN_USER.EMAIL,
    );
  else
    return Boolean(
      (session as JWT).name === ADMIN_USER.NAME &&
        (session as JWT).email === ADMIN_USER.EMAIL,
    );
}

/**
 * Should be used only on the server. As I exposed the Admin login and I don't want
 * someone deleting, adding or changing products, I added this verification, with
 * a password only I know
 */
export function authAdminAction(req: NextApiRequest, res: NextApiResponse) {
  const PRODUCTS_PASSWORD = getENV('PRODUCTS_PASSWORD').PRODUCTS_PASSWORD;

  if (req.headers.authorization !== PRODUCTS_PASSWORD) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }

  return true;
}

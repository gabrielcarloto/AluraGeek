import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const ADMIN_USER = {
  NAME: 'Admin',
  EMAIL: 'nevergonna@giveyou.up',
  USERNAME: 'peypey',
  PASSWORD: 'negoney',
} as const;

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

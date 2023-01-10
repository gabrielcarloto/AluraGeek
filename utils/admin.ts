import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

const ADMIN_NAME = 'Admin';
const ADMIN_EMAIL = 'nevergonna@giveyou.up';

export function isAdmin(session: Session | null): boolean;
export function isAdmin(session: JWT | null): boolean;
export function isAdmin(session: JWT | Session | null): boolean {
  if (!session) return false;

  if ('user' in session)
    return Boolean(
      (session as Session).user?.name === ADMIN_NAME &&
        (session as Session).user?.email === ADMIN_EMAIL,
    );
  else
    return Boolean(
      (session as JWT).name === ADMIN_NAME &&
        (session as JWT).email === ADMIN_EMAIL,
    );
}

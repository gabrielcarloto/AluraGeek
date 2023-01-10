import type { JWT } from 'next-auth/jwt';

const ADMIN_NAME = 'Admin';
const ADMIN_EMAIL = 'nevergonna@giveyou.up';

export function isAdmin(session: JWT | undefined) {
  return (
    session && session.name === ADMIN_NAME && session.email === ADMIN_EMAIL
  );
}

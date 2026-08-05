import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { BASE_URL, isAdmin } from '@utils/all';

export async function middleware(req: NextRequest) {
  // The matcher already restricts this middleware to `/admin/:path*`, but we
  // double-check the pathname so a query string can't trick it into running
  // on a non-admin route.
  if (!req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env['NEXTAUTH_SECRET'] as string,
  });

  if (!isAdmin(session)) return NextResponse.redirect(BASE_URL);

  // If user is authenticated, continue.
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

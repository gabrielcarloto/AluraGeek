import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { BASE_URL, isAdmin } from '@utils/all';

export async function middleware(req: NextRequest) {
  // return early if url isn't supposed to be protected
  // ? probably it isnt needed
  if (!req.url.includes('/admin')) {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env['SECRET'] as string,
  });

  if (!isAdmin(session)) return NextResponse.redirect(BASE_URL);

  // If user is authenticated, continue.
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

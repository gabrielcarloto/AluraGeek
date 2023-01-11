import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { BASE_URL, isAdmin } from '@utils';

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

// https://gist.github.com/balazsorban44/30e2267fe1105529f217acbe3763b468

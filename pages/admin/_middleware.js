import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const dev = process.env.NODE_ENV !== 'production';
const baseURL = dev
  ? 'http://localhost:3000/'
  : 'https://alura-geek-mocha.vercel.app/';

export async function middleware(req) {
  // return early if url isn't supposed to be protected
  if (!req.url.includes('/admin')) {
    return NextResponse.next();
  }

  const session = await getToken({ req, secret: process.env.SECRET });

  const isAdmin =
    session &&
    session.name === 'Admin' &&
    session.email === 'nevergonna@giveyou.up';

  if (!isAdmin) return NextResponse.redirect(baseURL);

  // If user is authenticated, continue.
  return NextResponse.next();
}

// https://gist.github.com/balazsorban44/30e2267fe1105529f217acbe3763b468

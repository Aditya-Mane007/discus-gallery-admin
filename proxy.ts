import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside

const publicRoutes = ['/login', '/forget-password'];

const preVerificationRoutes = ['/verify'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

  const token = cookieStore?.get('token');

  const csrfToken = cookieStore?.get('XSRF-TOKEN');

  const tempSessionId = cookieStore?.get('temp-session-id');

  if (
    preVerificationRoutes.includes(pathname) &&
    !tempSessionId &&
    !csrfToken
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (publicRoutes.includes(pathname) && tempSessionId) {
    return NextResponse.redirect(new URL('/verify', request.url));
  }

  // Redirect logged-in users away from auth pages
  if (
    (preVerificationRoutes.includes(pathname) ||
      publicRoutes.includes(pathname)) &&
    token &&
    csrfToken
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Protect private routes ONLY if no refresh token
  // if (
  //   !preVerificationRoutes.includes(pathname) &&
  //   !publicRoutes.includes(pathname)
  // ) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

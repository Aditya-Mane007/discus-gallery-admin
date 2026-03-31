import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside

const publicRoutes = ["/login", "/forget-password"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

  const token = cookieStore?.get("token");

  const csrfToken = cookieStore?.get("XSRF-TOKEN");

  const sessionId = cookieStore.get("session-id");

  // Redirect logged-in users away from auth pages
  if (publicRoutes.includes(pathname) && token && csrfToken && sessionId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect private routes ONLY if no refresh token
  if (
    !publicRoutes.includes(pathname) &&
    (!token || !csrfToken || !sessionId)
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!publicRoutes.includes(pathname) && token && csrfToken && !sessionId) {
    return NextRe
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

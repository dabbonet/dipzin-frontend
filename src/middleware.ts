import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();

  // List of public routes that don't require authentication
  const allowedRoute = ['/access', '/access/otp'];

  // Check if the requested path is a public route
  const isPublicRoute = allowedRoute.some((route) => request.nextUrl.pathname.startsWith(route));

  if (!session && !isPublicRoute) {
    // Redirect to login page if user is not authenticated and trying to access a protected route
    return NextResponse.redirect(new URL('/access', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run the middleware on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

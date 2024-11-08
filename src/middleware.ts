import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  try {
    const session = await auth();
    const { pathname } = request.nextUrl;

    if (session?.user && pathname === "/access") {
      // Redirect authenticated users away from the access (login) page
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/profile")) {
      if (!session?.user) {
        // Disallow access to /profile/* pages if there is no session.user
        return NextResponse.redirect(new URL("/access", request.url));
      }

      if (session?.user.confirmed) {
        // Disallow access to /profile/* pages if user.confirmed is true
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/access", request.url));
  }
}

// Configure which routes to run the middleware on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

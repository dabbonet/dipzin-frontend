import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  try {
    const session = await auth();
    const { pathname } = request.nextUrl;

    if (session) {
      if (pathname === "/access") {
        // Redirect authenticated users away from the access (login) page
        return NextResponse.redirect(new URL("/", request.url));
      }

      if (pathname.startsWith("/access/profile")) {
        if (session.user?.confirmed) {
          // Restrict access for confirmed users to profile routes
          return NextResponse.redirect(new URL("/", request.url));
        }
        // Redirect unconfirmed users to the profile setup page
        if (!session.user?.confirmed) {
          return NextResponse.redirect(
            new URL("/access/profile/profile-information", request.url),
          );
        }
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/access", request.url));
  }
}

// Configure which routes to run the middleware on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

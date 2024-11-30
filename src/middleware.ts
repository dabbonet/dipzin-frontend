import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "./auth";
import { validateToken } from "./actions/validateToken";

export async function middleware(request: NextRequest) {
  try {
    const session = await auth();
    const { pathname } = request.nextUrl;

    // Check if the token has already been validated today
    const validatedCookie = request.cookies.get("validated");
    let isValid = false;

    if (session?.user) {
      if (validatedCookie) {
        isValid = true;
      } else if (session.user.token) {
        isValid = await validateToken(session.user.token);
        console.log('isValid: ', JSON.stringify(isValid, null, 2));
      }

      if (!isValid) {
      // Redirect to login if validation fails
        return NextResponse.redirect(new URL("/access", request.url));
      }

      // If the token was validated but no cookie exists, set a validation cookie
      if (!validatedCookie) {
        const response = NextResponse.next();
        response.cookies.set("validated", "true", { maxAge: 86400 }); // 1 day
        return response;
      }
    }

    // Redirect authenticated users away from the login page
    if (session?.user && pathname === "/access") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Restrict access to /profile pages
    if (pathname.startsWith("/profile")) {
      if (!session?.user) {
        return NextResponse.redirect(new URL("/access", request.url));
      }

      if (!session.user.confirmed) {
        return NextResponse.redirect(new URL("/", request.url));
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

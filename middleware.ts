import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.has("JWT");
  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/home") ||
      request.nextUrl.pathname.startsWith("/application") ||
      request.nextUrl.pathname.startsWith("/collection") ||
      request.nextUrl.pathname.startsWith("/profile") ||
      request.nextUrl.pathname.startsWith("/pricing"))
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  } else if (token && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
}

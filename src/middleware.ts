import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const token = request?.cookies?.get('token')?.value

  if (url.pathname.startsWith('/access') && token) {
    return NextResponse.redirect(new URL('/', url))
  }
  if (url.pathname.startsWith('/account') && !token) {
    return NextResponse.redirect(new URL('/', url))
  }

  if (url.pathname.startsWith('/access')) {
    const res = NextResponse.next();
    const invitationToken = url.searchParams.get("inv");
    const referralToken = url.searchParams.get("ref");
    const expires = new Date(Date.now() + (1000 * 60 * 60 * 24) * 60) // 60 days from the initial request
    if (invitationToken) {
      res.cookies.set('invitation-token', invitationToken, { expires })
    }
    if (referralToken) {
      res.cookies.set('referral-token', referralToken, { expires })
    }
    return res;
  }
}
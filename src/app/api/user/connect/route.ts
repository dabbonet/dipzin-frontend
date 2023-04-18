import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get('provider');
    return NextResponse.redirect('https://rah.dipzin.com/api/connect/' + provider)
}
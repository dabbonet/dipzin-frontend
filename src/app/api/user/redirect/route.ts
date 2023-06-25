import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get('provider');
    const access_token = searchParams.get('access_token');
    const invitation_token = searchParams.get('invitation_token');
    const referral_token = searchParams.get('referral_token');
    const params = new URLSearchParams({
        access_token: access_token ?? '',
        referral_token: referral_token ?? '',
        invitation_token: invitation_token ?? '',
    });
    try {
        const req = await fetch(`https://rah.dipzin.com/api/auth/${provider}/callback?${params}`);
        const data = await req.json();
        if (data.error) {
            return new Response(data.error.message, {
                status: data.error.status,
            });
        } else {
            return NextResponse.json(data);
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: error.status });
    }
}
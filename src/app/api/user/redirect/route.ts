import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get('provider');
    const token = searchParams.get('token');
    try {
        const req = await fetch(`https://rah.dipzin.com/api/auth/${provider}/callback?access_token=${token}`);
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
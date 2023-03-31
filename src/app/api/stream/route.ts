import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const previousPages = searchParams.get('previousPages');

    const params = new URLSearchParams({
        platform: platform ?? '',
        previousPages: previousPages ?? '',
    });

    const res = await fetch(`https://rah.dipzin.com/api/stream?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }
    });

    if (!res.ok) {
        return NextResponse.json({ error: 'Error fetching stream' }, { status: res.status })
    }
    return NextResponse.json(await res.json());
}
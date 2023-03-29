import { NextResponse } from 'next/server';
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const limit = searchParams.get('limit');
    const previousIds = searchParams.get('previousIds');

    const params = new URLSearchParams({
        platform: platform ?? '',
        limit: limit ?? '',
        previousIds: previousIds ?? '',
    });

    const res = await fetch(`https://rah.dipzin.com/api/stream?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        // Handle non-2xx HTTP response status codes
        const errorResponse = await res.json();
        throw new Error(errorResponse.message);
    }

    const stream = await res.json();
    return NextResponse.json(stream);
}

export async function POST(request: Request) {
    return new Response('Hello, POST api!')
}
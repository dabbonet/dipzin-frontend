import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');

    const params = new URLSearchParams({
        keyword: keyword ?? '',
    });

    const res = await fetch(`https://rah.dipzin.com/api/search?${params}`, {
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

    const search = await res.json();
    return NextResponse.json({ search });

}

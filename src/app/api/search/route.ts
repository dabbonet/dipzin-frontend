import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const headersList = headers();
    const token = headersList.get('Authorization');
    const keyword = searchParams.get('keyword');

    const params = new URLSearchParams({
        keyword: keyword ?? '',
    });

    const res = await fetch(`https://rah.dipzin.com/api/search?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });

    if (!res.ok) {
        // Handle non-2xx HTTP response status codes
        const errorResponse = await res.json();
        return NextResponse.json({ errorResponse }, { status: res.status });
    }

    const search = await res.json();
    if (res.status === 204) {
        return NextResponse.json({ search, maxQouta: true });
    }
    return NextResponse.json({ search }, { status: res.status });

}
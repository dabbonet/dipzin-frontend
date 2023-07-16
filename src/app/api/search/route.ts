import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const headersList = headers();
    const token = headersList.get('Authorization');
    const { keyword } = await request.json()
    const data = JSON.stringify({
        data: {
            keyword: keyword
        }
    })

    const res = await fetch(`https://rah.dipzin.com/api/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: data
    });
    if (!res.ok) {
        // Handle non-2xx HTTP response status codes
        const errorResponse = await res.json();
        return NextResponse.json({ errorResponse, maxQouta: false }, { status: res.status });
    }
    if (res.status === 204) {
        return NextResponse.json({ maxQouta: true });
    }

    const search = await res.json();
    return NextResponse.json({ search, maxQouta: false }, { status: res.status });

}
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { keyword, token, filters, limit, offset } = await request.json()
    // console.log(limit , offset)
    const data = JSON.stringify({
        data: {
            keyword: keyword,
            filters,
            limit,
            offset
        }
    })

    const res = await fetch(`https://rah.dipzin.com/api/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data
    });

    const search = await res.json();
    return NextResponse.json({ screens: search?.search?.hits }, { status: 200 });
}

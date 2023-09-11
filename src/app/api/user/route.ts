import { NextResponse } from "next/server";
import { headers } from 'next/headers';
const qs = require('qs')
export async function GET(request: Request) {
    const headersList = headers();
    const Authorization = headersList.get('Authorization');

    const query = qs.stringify({
            populate: ['avatar']
        },
        {
            encodeValuesOnly: true,
        });
    const req = await fetch(`https://rah.dipzin.com/api/users/me?${query}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization,
        },
    });

    const data = await req.json();
    if (data.error) {
        return NextResponse.json(data.error.message, { status: data.error.status });
    } else {
        return NextResponse.json(data);
    }

}
import { NextResponse } from "next/server";
import { headers } from 'next/headers';

export async function GET(request: Request) {
    const headersList = headers();
    const Authorization = headersList.get('Authorization');

    try {
        const req = await fetch("https://rah.dipzin.com/api/users/me", {
            headers: {
                "Content-Type": "application/json",
                Authorization,
            },
        });

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
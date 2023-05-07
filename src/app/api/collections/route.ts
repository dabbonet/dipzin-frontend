import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { token } = await req.json();
    
    const request = await fetch('https://rah.dipzin.com/api/collections', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            token: token
        })
    })
    const response = await request.json();
    if (request.ok) {
        return NextResponse.json({message: 'server error'});
    }

    return NextResponse.json({message: 'hi'});
}
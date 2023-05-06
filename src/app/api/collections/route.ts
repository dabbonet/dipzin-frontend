import { NextResponse } from "next/server";

export default async function POST(req: Request) {
    const { token } = await req.json();
    
    const request = await fetch('example', {
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
        return NextResponse.json(response);
    }

    return NextResponse.json({message: 'hi'});
}
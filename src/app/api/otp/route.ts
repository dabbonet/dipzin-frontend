import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const email = request.cookies['_parsed'].get('cokemail').value

    const req = await fetch('https://rah.dipzin.com/api/otps', {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            data: {
                email : email
            }
        })
    })

    if (!req.ok) {
        return NextResponse.json({data : 'hello world'})
    }
    
    
    return NextResponse.json(await req.json())
}





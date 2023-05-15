import {  NextResponse} from 'next/server'

export async function POST(req) {
    const body = req.json()
    const request = await fetch('someWhere', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    const response = await request.json()
    if (request.ok) {
        return  NextResponse.json({ response } , {status: request.status})
    }
    return NextResponse.json({ message: 'something went wrong' }, { status: 500})
}
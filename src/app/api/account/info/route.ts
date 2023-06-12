import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { auth } = await request.json()
    const response = await fetch("https://rah.dipzin.com/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
          }
    });
    const data = await response.json()
    if (response.ok) {
        return NextResponse.json({data},{status: response.status})
    }
    return NextResponse.json({message: 'something went wrong'} , {status: response.status})
}
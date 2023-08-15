import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { data } = await request.json()
    const response = await fetch(`https://rah.dipzin.com/api/user-positions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.auth}`
        },
        body: JSON.stringify({
          data: {
            positions : data.positions
          }
        })
    });
    const res = await response.json()
    return NextResponse.json(res , {status : response.status})
}
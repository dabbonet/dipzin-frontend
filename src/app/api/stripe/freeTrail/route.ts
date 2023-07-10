import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { token } = await request.json()
    const response = await fetch(`https://rah.dipzin.com/api/subscriptions/create-trial`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          data: {
            "item": "price_1MoZ4VEXp8HEl8qL0FAGJ6eX"
          }
        })
    });
    const res = await response.json()
    return NextResponse.json(res , {status : response.status})
}
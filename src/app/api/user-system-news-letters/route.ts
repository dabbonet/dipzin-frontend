import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { news_letters , auth } = await request.json()
    console.log(news_letters , auth)
    const response = await fetch(`https://rah.dipzin.com/api/user-system-news-letters`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`
        },
        body: JSON.stringify({
          data: {
            news_letters : news_letters
          }
        })
    });
    const data = await response.json()
    return NextResponse.json(data , {status : response.status})
}
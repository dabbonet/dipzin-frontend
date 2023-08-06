import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { data } = await request.json()
    const response = await fetch(`https://rah.dipzin.com/api/user-system-news-letters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.auth}`
        },
        body: JSON.stringify({
          data: {
            news_letters : data.news_letters
          }
        })
    });
    const res = await response.json()
    return NextResponse.json(res , {status : response.status})
}
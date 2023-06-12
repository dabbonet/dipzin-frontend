import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { id, username, name, country, bio, job_title, auth } = await request.json()
    console.log(auth , id , name)
    const response = await fetch(`https://rah.dipzin.com/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`
        },
        body: JSON.stringify({
          data: {
            username: username,
            country: country,
            bio:  bio,
            name: name,
            job_title: job_title
          }
        })
    });
    const data = await response.json()
    return NextResponse.json(data , {status : response.status})
}
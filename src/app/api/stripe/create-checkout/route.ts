import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {token , id} = await request.json();
  try {
    const req = await fetch('https://rah.dipzin.com/api/subscriptions/create-checkout',{
      method :'POST',
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        data: {
          item: id
        }
      })
    })
    const data = await req.json();
    return NextResponse.json(data.url , {status : req.status})

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }
}

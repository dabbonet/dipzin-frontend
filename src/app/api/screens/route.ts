import { NextResponse } from "next/server";
const qs = require('qs')
export async function POST(request: Request) {
  const { screenId } = await request.json();
  const query = qs.stringify({
    populate: {
        tags: '*'
    }
}, {
    encode: false
  })
    console.log(screenId , query)
  try {
    const req = await fetch(`https://rah.dipzin.com/api/screens/${screenId}?${query}`);

    const data = await req.json();
    return NextResponse.json(data , {status :req.status});

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }
}



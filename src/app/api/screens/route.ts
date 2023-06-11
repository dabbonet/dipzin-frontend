import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { screenId, query } = await request.json();
    console.log(screenId , query)
  try {
    const req = await fetch(`https://rah.dipzin.com/api/screens/${screenId}?${query}`);

    const data = await req.json();
    return NextResponse.json(data , {status :req.status});

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }
}



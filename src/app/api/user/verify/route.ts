import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqBody = await request.json();
  try {
    const req = await fetch("https://rah.dipzin.com/api/otps/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const data = await req.json();
    return NextResponse.json(data , {status: req.status});

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }
}

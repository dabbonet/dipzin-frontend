import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqBody = await request.json();
  const req = await fetch("https://rah.dipzin.com/api/otps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  if (!req.ok) {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: req.status }
    );
  }
  const data = await req.json()
  return NextResponse.json(data);
}

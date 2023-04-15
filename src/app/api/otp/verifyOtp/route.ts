import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqBody = await request.json();
  console.log(reqBody);
  const req = await fetch("https://rah.dipzin.com/api/otps/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  const data = await req.json()
  console.log(data)
  return NextResponse.json(data);
}

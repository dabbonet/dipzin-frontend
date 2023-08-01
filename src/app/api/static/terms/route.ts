import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const req = await fetch("https://rah.dipzin.com/api/term-of-service", {
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });

        const data = await req.json();
        if (data.error) {
            return new Response(data.error.message, {
                status: data.error.status,
            });
        } else {
            return NextResponse.json(data);
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: error.status });
    }
}
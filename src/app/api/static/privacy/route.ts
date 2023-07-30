import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const req = await fetch("https://rah.dipzin.com/api/privacy-policy", {
            headers: {
                "Content-Type": "application/json",
            },
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
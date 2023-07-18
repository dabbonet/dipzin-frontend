import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { keyword , token } = await request.json()
    console.log(keyword , token)
    const data = JSON.stringify({
        data: {
            keyword: keyword
        }
    })

    const res = await fetch(`https://rah.dipzin.com/api/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: data
    });
    
    const search = await res.json();
    console.log(search)
    return NextResponse.json({ screens:['57439a89_8bcd_438d_b8f7_8bf4e913f641_3d7a69b7fd.png' , '57439a89_8bcd_438d_b8f7_8bf4e913f641_3d7a69b7fd.png' , '57439a89_8bcd_438d_b8f7_8bf4e913f641_3d7a69b7fd.png'] }, { status: 200 });
}

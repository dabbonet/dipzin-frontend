const qs = require('qs');

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const page = searchParams.get('page');

    const params = new URLSearchParams({
        platform: platform ?? '',
        page: page ?? '',
    });

    const req = await fetch(`https://rah.dipzin.com/api/stream?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return new Response(req.body)
}

export async function POST(request: Request) {
    return new Response('Hello, POST api!')
}
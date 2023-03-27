const qs = require('qs');

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const keyword = searchParams.get('keyword');

        const params = new URLSearchParams({
            keyword: keyword ?? '',
        });

        const req = await fetch(`https://rah.dipzin.com/api/search?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!req.ok) {
            // Handle non-2xx HTTP response status codes
            const errorResponse = await req.json();
            throw new Error(errorResponse.message);
        }

        return new Response(req.body);
    } catch (error: any) {
        // Handle any errors that occur during the fetch request
        console.error(error);
        return new Response('Error: ' + error.message, { status: 500 });
    }
}

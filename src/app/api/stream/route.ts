const qs = require('qs');

export async function GET(request: Request) {
    const query = qs.stringify(
        {
            filters: {
                is_published: {
                    $eq: true
                }
            },
            populate: {
                screens: {
                    populate: {
                        screen: {
                            fields: ['formats']
                        }
                    },
                    filters: {
                        is_showcase: {
                            $eq: true,
                        },
                    },
                },
            },
            pagination: {
                page: 1,
                pageSize: 10
            }
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    )

    const req = await fetch(`https://rah.dipzin.com/api/apps?${query}`, {
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
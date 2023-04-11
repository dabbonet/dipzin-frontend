import { NextResponse } from 'next/server';
const qs = require('qs');

export async function POST(request: Request) {
    const body = await request.json()

    const tagFilters = body.tags.map((tag) => ({
        tags: {
            name: {
                $containsi: tag || '',
            },
        },
    }));
    const query = qs.stringify(
        {
            filters: {
                $and: tagFilters,
                app: {
                    categories: {
                        name: {
                            $containsi: body.categories || '',
                        },
                    },
                    platform: {
                        id: {
                            $eq: body.platform || 1
                        }
                    }
                }
            },
            populate: {
                screen: {
                    fields: ["hash", "ext"]
                }
            },
            pagination: {
                page: body.page,
                pageSize: 10
            }
        },
        {
            encodeValuesOnly: true, // prettify URL
        });

    const res = await fetch(`https://rah.dipzin.com/api/screens?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }
    });

    if (!res.ok) {
        // Handle non-2xx HTTP response status codes
        const errorResponse = await res.json();
        throw new Error(errorResponse.message);
    }

    const screens = await res.json();
    return NextResponse.json({ screens });

}

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!id) return NextResponse.json('No id');

    let preview = [];
    if (type === 'tag') {
        preview = await getTagPreview({ id: id });
    } else if (type === 'app') {
        preview = await getAppPreview({ id: id });
    } else if (type === 'category') {
        preview = await getCategoryPreview({ id: id });
    }
    return NextResponse.json(preview);

}




const getAppPreview = async ({ id }: { id: string }) => {
    const qs = require('qs');
    const query = qs.stringify(
        {
            fields: ['screen'],
            filters: {
                app: {
                    id: {
                        $eq: id
                    }
                },
                is_showcase: {
                    $eq: true
                }
            },
            populate: {
                screen: {
                    fields: ['hash', 'ext']
                }
            }
        }
    )
    const res = await fetch(`https://rah.dipzin.com/api/screens?${query}`)
    const data = await res.json()
    const screens = data.data.flatMap(item => ({
        hash: item.attributes.screen.data?.attributes.hash,
        ext: item.attributes.screen.data?.attributes.ext
    }));
    return screens
}

const getCategoryPreview = async ({ id }: { id: string }) => {
    const qs = require('qs');
    const query = qs.stringify(
        {
            fields: ['id'],
            filters: {
                categories: {
                    id: {
                        $eq: id
                    }
                },
                is_published: {
                    $eq: true
                }
            },
            populate: {
                screens: {
                    fields: ['id'],
                    filters: {
                        is_published: {
                            $eq: true
                        }
                    },
                    populate: {
                        screen: {
                            fields: ['hash', 'ext']
                        }
                    }
                }
            },
            pagination: {
                start: 0,
                limit: 5,
            }
        }
    )
    const res = await fetch(`https://rah.dipzin.com/api/apps?${query}`)
    const data = await res.json()

    const screens = data.data.flatMap((item) => {
        return item.attributes.screens.data.map((screen) => ({
            hash: screen.attributes.screen.data?.attributes.hash,
            ext: screen.attributes.screen.data?.attributes.ext,
        }));
    });
    return screens
}

const getTagPreview = async ({ id }: { id: string }) => {
    const qs = require('qs');
    const query = qs.stringify(
        {
            fields: ['screen'],
            filters: {
                tags: {
                    id: {
                        $eq: id
                    }
                },
                is_published: {
                    $eq: true
                }
            },
            populate: {
                screen: {
                    fields: ['hash', 'ext']
                }
            },
            pagination: {
                page: 0,
                pageSize: 5,
            }
        }
    )
    const res = await fetch(`https://rah.dipzin.com/api/screens?${query}`)
    const data = await res.json()

    const screens = data.data.flatMap(item => ({
        hash: item.attributes.screen.data?.attributes.hash,
        ext: item.attributes.screen.data?.attributes.ext
    }));
    return screens
}

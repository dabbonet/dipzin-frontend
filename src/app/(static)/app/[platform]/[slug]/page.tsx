import { notFound } from 'next/navigation';
import Content from './content'
const qs = require('qs');

interface appProps {
    slug: string;
    platform: string;
}


export default async function AppPage({
    params: { slug, platform }
}: {
    params: appProps;
}) {
    let appData = await getApp({ slug, platform });
    let app = appData.data[0].attributes;
    if (!app) {
        notFound();
    }
    return (
        <Content app={app} />
    );
}


interface ResponseData {
    data: any;
}

async function getApp({ slug, platform }: appProps) {
    const query = qs.stringify(
        {
            fields: ["name", "slug", "tag_line", "store_link", "copy_right"],
            filters: {
                slug: {
                    $eq: slug
                },
                platform: {
                    name: {
                        $containsi: platform
                    }
                },
                is_published: {
                    $eq: true
                }
            },
            populate: {
                screens: {
                    fields: ["id"],
                    sort: ["order:asc"],
                    filters: {
                        is_published: {
                            $eq: true
                        }
                    },
                    populate: {
                        screen: {
                            fields: ["hash", "ext", "url"]
                        }
                    }
                },
                categories: {
                    fields: ["name"]
                },
                icon: {
                    fields: ["hash", "ext"]
                }
            }
        },
        {
            encodeValuesOnly: true, // prettify URL
        });

    const res = await fetch(`https://rah.dipzin.com/api/apps?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }
    });

    return res.json();
}
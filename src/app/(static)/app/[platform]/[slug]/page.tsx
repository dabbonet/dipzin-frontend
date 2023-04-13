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
    let apps = await getApps({ slug });

    // Filter apps to get the selected app
    const app = apps.data.filter(data => data.attributes.platform.data.attributes.name.toLowerCase() === platform.toLowerCase())[0].attributes;

    if (!apps) {
        notFound();
    }
    return (
        <Content apps={apps} selectedApp={app} />
    );
}


async function getApps({ slug }: any) {
    const query = qs.stringify(
        {
            fields: ["name", "slug", "tag_line", "store_link", "copy_right"],
            filters: {
                slug: {
                    $eq: slug
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
                platform: {
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
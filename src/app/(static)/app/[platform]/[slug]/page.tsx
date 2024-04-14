import { notFound } from 'next/navigation';
import Content from './content'
import AppActions from './AppActions';
const qs = require('qs');

interface AppProps {
    slug: string;
    platform: string;
}

export const metadata = {
    title: '',
    description: '',
};

export default async function AppPage({ params: { slug, platform } }: { params: AppProps; }) {
    const apps = await getApps({ slug });


    const app = apps.data.find((data) => data.attributes.platform.data.attributes.name.toLowerCase() === platform.toLowerCase())?.attributes;

    if (!apps || !app) {
        notFound();
    }

    // initial tags and components from the first 25 screens
    const tags = new Set();
    const components = new Set();

    app.screens.data.slice(0, 25).forEach(screen => {
        screen.attributes.tags.data.forEach(tag => tags.add(tag.attributes.name));
        screen.attributes.components.data.forEach(component => components.add(component.attributes.name));
    });

    const title = `Dipzin - get your inspiration from ${app.name} | ${app.categories.data[0].attributes.name} on ${platform}`;

    const description = `Discover ${app.name}, a ${app.categories.data[0].attributes.name} app on ${platform}. Features include tags such as ${Array.from(tags).join(', ')} and components like ${Array.from(components).join(', ')}. Learn more about what makes this app unique.`;

    return (
        <>
            <head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </head>
            <Content apps={apps} selectedApp={app} />
            <AppActions app={app} />
        </>
    );
}

async function getApps({ slug }: any) {
    const query = qs.stringify({
        fields: ["name", "slug", "tag_line", "store_link", "copy_right"],
        filters: {
            slug: { $eq: slug },
            is_published: { $eq: true }
        },
        populate: {
            screens: {
                fields: ["id"],
                sort: ["order:asc"],
                filters: {
                    is_published: { $eq: true }
                },
                populate: {
                    tags: { fields: ['name'] }, // Populating only the name field for tags
                    components: { fields: ['name'] }, // Populating only the name field for components
                    screen: {
                        fields: ["hash", "ext", "url"]
                    }
                }
            },
            categories: { fields: ["name"] },
            platform: { fields: ["name"] },
            icon: { fields: ["hash", "ext"] }
        }
    }, {
        encodeValuesOnly: true, // prettify URL
    });

    const res = await fetch(`https://rah.dipzin.com/api/apps?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return res.json();
}
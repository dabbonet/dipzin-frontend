const qs = require('qs');

async function getApps() {
    const query = qs.stringify({
        fields: ["name", "slug"],
        filters: {
            is_published: { $eq: true }
        },
        populate: {
            platform: { fields: ["name"] },
        },
        pagination: {
            page: 1,
            pageSize: 69420,
        },
    }, {
        encodeValuesOnly: true, // prettify URL
    });

    try {
        const response = await fetch(`https://rah.dipzin.com/api/apps?${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        return await response.json(); // Ensure JSON is valid
    } catch (error) {
        console.error("Failed to fetch apps:", error);
        throw error; // Re-throw to handle it in the calling function
    }
}

module.exports = {
    siteUrl: 'https://dipzin.com/',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: '*', disallow: '/profile' },
        ],
    },
    sitemapSize: 5000,
    autoLastmod: true,
    additionalPaths: async (config) => {
        const apps = await getApps();
        console.log(apps[0]);
        return apps.data.map(app => ({
            loc: `app/${app.attributes.platform.data.attributes.name}/${app.attributes.slug}`,
            changefreq: 'monthly',
            priority: 0.8,
        }));
    }
};

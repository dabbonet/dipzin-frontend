
// export async function generateStaticParams() {
//     // const apps = await fetch('https://rah.dipzin.com/api/apps?fields[0]=slug&populate[platform][fields][0]=name&filters[is_published][$eq]=true&pagination[limit]=1000', { next: { revalidate: 2 } });
//     const apps = await fetch('https://rah.dipzin.com/api/apps?fields[0]=slug&populate[platform][fields][0]=name&filters[is_published][$eq]=true&pagination[limit]=500', { next: { revalidate: 20 } }).then((res) => res.json());

//     return apps?.data?.map(app => ({
//         slug: app.attributes.slug.toString(),
//         platform: app.attributes.platform.data.attributes.name.toLowerCase()
//     }));
// }

export default function Layout({
    params: { slug, platform },
    children
}: {
    params: {
        slug: string,
        platform: string
    },
    children: React.ReactNode
}) {
    return (
        <div className="max-w-[85%] mx-auto">
            {children}
        </div>
    )
}
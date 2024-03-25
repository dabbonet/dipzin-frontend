import { notFound } from "next/navigation";
import Content from "./content";
import AppActions from "./AppActions";
import Head from "next/head";
const qs = require("qs");

interface appProps {
  slug: string;
  platform: string;
}
const AppPage = async ({
  params: { slug, platform },
}: {
  params: appProps;
}) => {
  let apps = await getApps({ slug });

  // Filter apps to get the selected app

  const app = apps.data.filter(
    (data) =>
      data.attributes.platform.data.attributes.name.toLowerCase() ===
      platform.toLowerCase()
  )[0]?.attributes;

  if (!apps || !app) {
    console.error("App not found");
    notFound();
  }
  console.log("App object before metadata generation:", app);
  const metadata = generateMetadataForApp(app);
  console.log("Metadata to be rendered in <Head> :", metadata);

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <Content apps={apps} selectedApp={app} />
      <AppActions app={app} />
    </>
  );
};
export default AppPage;

function generateMetadataForApp(app) {
  // Check if each part of the app object is present and has a 'data' property
  const appName = app.name;
  const appCategory = app?.categories?.data[0]?.attributes?.name;
  const appPlatform = app?.platform?.data?.attributes?.name;

  // Since we don't have the structure of tags and components,
  // make sure to access them correctly if they are nested like categories or platform
  // For this example, let's assume tags and components are directly on the app object
  const tags = app?.tags?.length ? app.tags.join(", ") : "";
  const components = app?.components?.length ? app.components.join(", ") : "";

  if (!appName || !appCategory || !appPlatform) {
    console.error("Missing data for metadata generation");
    return { title: "Error", description: "Required app data is missing" };
  }

  const title = `${appName} - ${appCategory} on ${appPlatform}`;
  const description = `Discover ${appName}, a ${appCategory} app available on ${appPlatform}. Features include ${tags}, ${components}, and more.`;
  return { title, description };
}

async function getApps({ slug }: any) {
  const query = qs.stringify(
    {
      fields: ["name", "slug", "tag_line", "store_link", "copy_right"],
      filters: {
        slug: {
          $eq: slug,
        },
        is_published: {
          $eq: true,
        },
      },
      populate: {
        screens: {
          fields: ["id"],
          sort: ["order:asc"],
          filters: {
            is_published: {
              $eq: true,
            },
          },
          populate: {
            screen: {
              fields: ["hash", "ext", "url"],
            },
          },
        },
        categories: {
          fields: ["name"],
        },
        platform: {
          fields: ["name"],
        },
        icon: {
          fields: ["hash", "ext"],
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const res = await fetch(`https://rah.dipzin.com/api/apps?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 300 },
  });

  return res.json();
}

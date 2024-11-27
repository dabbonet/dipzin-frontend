import { get } from "@/utils/api";
import type { MetadataRoute } from "next";
import QueryString from "qs";

interface App {
  attributes: {
    slug: string;
    platform: string;
  };
}

interface Tag {
  attributes: {
    name: string;
  };
}

async function getAppsSlug(page: number): Promise<{ data: App[] }> {
  const query = QueryString.stringify(
    {
      fields: ["slug", "platform"],
      pagination: {
        page,
        pageSize: 100,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const response = await get(`/apps?${query}`);
  return response;
}

async function getTags(page: number): Promise<{ data: Tag[] }> {
  const query = QueryString.stringify(
    {
      fields: ["name"],
      pagination: {
        page,
        pageSize: 100,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const response = await get(`/tags?${query}`);
  return response;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL;
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  let page = 1;
  let apps: App[] = [];
  let hasMoreApps = true;

  while (hasMoreApps) {
    // eslint-disable-next-line no-await-in-loop
    const response = await getAppsSlug(page);
    if (response.data.length > 0) {
      apps = apps.concat(response.data);
      page += 1;
    } else {
      hasMoreApps = false;
    }
  }

  page = 1;
  let tags: Tag[] = [];
  let hasMoreTags = true;

  while (hasMoreTags) {
    // eslint-disable-next-line no-await-in-loop
    const response = await getTags(page);
    if (response.data.length > 0) {
      tags = tags.concat(response.data);
      page += 1;
    } else {
      hasMoreTags = false;
    }
  }

  const appRoutes = apps.map((app) => ({
    url: `${baseUrl}/${app.attributes.platform}/screens?app=${app.attributes.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // const tagRoutes = tags.flatMap((tag) => [
  //   {
  //     url: `${baseUrl}/ios/screens?screens=${tag.attributes.name}`,
  //     lastModified: new Date(),
  //     changeFrequency: "weekly" as const,
  //     priority: 0.8,
  //   },
  //   {
  //     url: `${baseUrl}/android/screens?screens=${tag.attributes.name}`,
  //     lastModified: new Date(),
  //     changeFrequency: "weekly" as const,
  //     priority: 0.8,
  //   },
  //   {
  //     url: `${baseUrl}/web/screens?screens=${tag.attributes.name}`,
  //     lastModified: new Date(),
  //     changeFrequency: "weekly" as const,
  //     priority: 0.8,
  //   },
  // ]);

  return [...staticRoutes, ...appRoutes,
    //  ...tagRoutes
  ];
}

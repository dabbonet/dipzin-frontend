import { get } from "@/utils/api";
import type { MetadataRoute } from "next";

export const revalidate = 86400;

interface App {
  slug: string;
  platform: string;
}

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
  types?: {
    data: {
      id: number;
      name: "mobile" | "web" | "marketing";
    }[];
  };
}

interface Component {
  id: number;
  name: string;
}

interface FlowAction {
  id: number;
  name: string;
}

const MAX_PAGES = 50;

async function fetchPaginatedData<T>(endpoint: string, maxPages = MAX_PAGES): Promise<T[]> {
  let results: T[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= maxPages) {
    const query = `pagination[page]=${page}&pagination[pageSize]=100`;
    // eslint-disable-next-line no-await-in-loop
    const response = await get(`/${endpoint}?${query}`);
    const data = (response.data as T[]) ?? [];

    if (data.length > 0) {
      results = results.concat(data);
      page += 1;
    } else {
      hasMore = false;
    }
  }

  return results;
}

const platforms = ["ios", "android", "web"] as const;
const changeFrequency = "weekly" as const;

function platformRoutes(baseUrl: string, path: string, priority: number) {
  return platforms.map(
    (platform) => ({
      url: `${baseUrl}/${platform}/${path}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority,
    }) as const,
  );
}

function entityRoutes<T>(
  items: T[],
  baseUrl: string,
  getPath: string,
  getParam: (item: T) => string,
  getItemPlatforms: (item: T) => readonly string[] = () => platforms,
) {
  return items.flatMap(
    (item) => getItemPlatforms(item).map(
      (platform) => ({
        url: `${baseUrl}/${platform}/${getPath}?${getParam(item)}`,
        lastModified: new Date(),
        changeFrequency,
        priority: 0.8,
      }),
    ),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "https://dipfe.fin.dabbo.net";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1
    },
    ...platformRoutes(baseUrl, "screens", 0.9),
    ...platformRoutes(baseUrl, "apps", 0.9),
    ...platformRoutes(baseUrl, "components", 0.9),
    ...platformRoutes(baseUrl, "flows", 0.9),
    {
      url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5
    },
  ];

  const [apps, categories, tags, components, flowActions] = await Promise.all([
    fetchPaginatedData<App>("apps"),
    fetchPaginatedData<Category>("categories"),
    fetchPaginatedData<Tag>("tags"),
    fetchPaginatedData<Component>("components"),
    fetchPaginatedData<FlowAction>("flow-actions"),
  ]);

  const appRoutes = entityRoutes(
    apps,
    baseUrl,
    "screens",
    (app) => `apps=${encodeURIComponent(app.slug)}`,
  );

  const categoryRoutes = entityRoutes(
    categories,
    baseUrl,
    "screens",
    (category) => `categories=${encodeURIComponent(category.name)}`,
  );

  const tagRoutes = entityRoutes(
    tags,
    baseUrl,
    "screens",
    (tag) => `tags=${encodeURIComponent(tag.name)}`,
    (tag) => tag.types?.data?.map((t) => (t.name === "mobile" ? ["ios", "android"] : [t.name])).flat() ?? platforms,
  );

  const componentRoutes = entityRoutes(
    components,
    baseUrl,
    "components",
    (component) => `components=${encodeURIComponent(component.name)}`,
  );

  const flowActionRoutes = entityRoutes(
    flowActions,
    baseUrl,
    "flows",
    (flowAction) => `flows=${encodeURIComponent(flowAction.name)}`,
  );

  return [
    ...staticRoutes,
    ...appRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...componentRoutes,
    ...flowActionRoutes,
  ];
}

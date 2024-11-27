import { get } from "@/utils/api";
import type { MetadataRoute } from "next";
import QueryString from "qs";

interface App {
  attributes: {
    slug: string;
    platform: string;
  };
}

interface Category {
  id: number;
  attributes: {
    name: string;
  };
}

interface Tag {
  id: number;
  attributes: {
    name: string;
    types: {
      data: {
        id: number;
        attributes: {
          name: "mobile" | "web" | "marketing";
        };
      }[];
    };
  };
}

interface Component {
  id: number;
  attributes: {
    name: string;
  };
}

interface FlowAction {
  id: number;
  attributes: {
    name: string;
  };
}

// Generic function to fetch paginated data from a given endpoint
async function fetchPaginatedData<T>(
  endpoint: string,
  fields: string[],
  populate?: any
): Promise<T[]> {
  let page = 1;
  let hasMore = true;
  let results: T[] = [];

  while (hasMore) {
    const query = QueryString.stringify(
      {
        fields,
        populate,
        pagination: {
          page,
          pageSize: 100,
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    // eslint-disable-next-line no-await-in-loop
    const response = await get(`/${endpoint}?${query}`);
    const data = response.data as T[];

    if (data.length > 0) {
      results = results.concat(data);
      page += 1;
    } else {
      hasMore = false;
    }
  }

  return results;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  const apps = await fetchPaginatedData<App>("apps", ["slug", "platform"]);

  // Generate routes for apps
  const appRoutes = apps.map((app) => ({
    url: `${baseUrl}/${app.attributes.platform}/apps/${encodeURIComponent(
      app.attributes.slug
    )}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categories = await fetchPaginatedData<Category>("categories", ["name"]);

  // Generate routes for categories
  const categoryRoutes = categories.flatMap((category) => {
    const platforms = ["ios", "android", "web"];
    return platforms.map((platform) => ({
      url: `${baseUrl}/${platform}/apps?categories=${encodeURIComponent(
        category.attributes.name
      )}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  });

  const tags = await fetchPaginatedData<Tag>("tags", ["name"], {
    types: {
      fields: ["name"],
    },
  });

  // Generate routes for tags based on their types
  const tagRoutes = tags.flatMap((tag) => {
    const routes: MetadataRoute.Sitemap = [];
    const tagName = encodeURIComponent(tag.attributes.name);
    const lastModified = new Date();
    const changeFrequency = "weekly" as const;
    const priority = 0.8;

    tag.attributes.types.data.forEach((type) => {
      switch (type.attributes.name) {
        case "mobile":
          routes.push(
            {
              url: `${baseUrl}/ios/screens?screens=${tagName}`,
              lastModified,
              changeFrequency,
              priority,
            },
            {
              url: `${baseUrl}/android/screens?screens=${tagName}`,
              lastModified,
              changeFrequency,
              priority,
            }
          );
          break;
        case "web":
          routes.push({
            url: `${baseUrl}/web/screens?screens=${tagName}`,
            lastModified,
            changeFrequency,
            priority,
          });
          break;
        case "marketing":
          routes.push({
            url: `${baseUrl}/web/marketing/${tagName}`,
            lastModified,
            changeFrequency,
            priority,
          });
          break;
        default:
          // Handle unexpected types
          console.warn(`Unexpected type: ${type.attributes.name}`);
          break;
      }
    });

    return routes;
  });

  const components = await fetchPaginatedData<Component>("components", ["name"]);

  // Generate routes for components
  const componentRoutes = components.flatMap((component) => {
    const platforms = ["ios", "android", "web"];
    const changeFrequency = "weekly" as const;
    return platforms.map((platform) => ({
      url: `${baseUrl}/${platform}/components/${encodeURIComponent(
        component.attributes.name
      )}`,
      lastModified: new Date(),
      changeFrequency,
      priority: 0.8,
    }));
  });

  const flowActions = await fetchPaginatedData<FlowAction>(
    "flow-actions",
    ["name"]
  );

  // Generate routes for flow actions
  const flowActionRoutes = flowActions.flatMap((flowAction) => {
    const platforms = ["ios", "android", "web"];
    const changeFrequency = "weekly" as const;
    return platforms.map((platform) => ({
      url: `${baseUrl}/${platform}/flows?flows=${encodeURIComponent(
        flowAction.attributes.name
      )}`,
      lastModified: new Date(),
      changeFrequency,
      priority: 0.8,
    }));
  });

  // Combine all routes
  const sitemapRoutes = [
    ...staticRoutes,
    ...appRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...componentRoutes,
    ...flowActionRoutes,
  ];

  // Return the combined sitemap
  return sitemapRoutes;
}

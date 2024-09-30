export const getInitialQuery = (explorer: string[]) => {
  let app:any = [];
  let categories:any = [];
  let tags:any = [];
  let components:any = [];
  let marketing:any = [];
  let flows:any = [];

  // Handle app logic
  if (explorer?.[2] === "app" && explorer?.[3]) {
    app = [explorer[3]];
  }

  // Handle categories logic
  if (explorer?.[1] === "apps" && explorer?.[2]) {
    categories = [explorer[2]];
  }

  // Handle tags logic
  if (explorer?.[1] === "screens" && explorer?.[2]) {
    if (explorer[2] !== "app") {
      tags = [explorer[2]];
    }
  }

  // Handle components logic
  if (explorer?.[1] === "components" && explorer?.[2]) {
    components = [explorer[2]];
  }

  // Handle marketing logic
  if (explorer?.[1] === "marketing" && explorer?.[2]) {
    marketing = [explorer[2]];
  }

  // Handle flows logic
  if (explorer?.[1] === "flows" && explorer?.[2]) {
    flows = [explorer[2]];
  }

  return {
    apps: app,
    platform: explorer?.[0] || "ios",
    pattern: explorer?.[1] || "screens",
    categories,
    tags,
    components,
    marketing,
    flows
  };
};

export const getInitialQueryWithSearchParams = (query: any, initialQuery: any, searchParams: any) => {
  const apps = initialQuery.apps.length > 0 ? initialQuery.apps : searchParams.getAll('app');
  const tags = initialQuery.tags.length > 0 ? initialQuery.tags : searchParams.getAll('tag');
  const categories = initialQuery.categories.length > 0 ? initialQuery.categories : searchParams.getAll('category');
  const components = initialQuery.components.length > 0 ? initialQuery.components : searchParams.getAll('component');
  const flows = initialQuery.flows.length > 0 ? initialQuery.flows : searchParams.getAll('flow');
  const marketing = initialQuery.marketing.length > 0 ? initialQuery.marketing : searchParams.getAll('marketing');

  return {
    apps,
    platform: query.platform || initialQuery.platform,
    pattern: query.pattern || initialQuery.pattern,
    categories,
    tags,
    components,
    flows,
    marketing
  };
};

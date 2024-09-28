export const getInitialQuery = (explorer: any) => {
  const app = explorer?.[1] === "app" && explorer?.[2] ? [explorer[2]] : [];
  const categories = explorer?.[1] === "apps" && explorer?.[2] ? [explorer[2]] : [];
  const tags = explorer?.[1] === "screens" && explorer?.[2] ? [explorer[2]] : [];
  const components = explorer?.[1] === "components" && explorer?.[2] ? [explorer[2]] : [];
  const marketing = explorer?.[1] === "marketing" && explorer?.[2] ? [explorer[2]] : [];
  const flows = explorer?.[1] === "flows" && explorer?.[2] ? [explorer[2]] : [];

  return {
    apps:app,
    platform: explorer?.[0] || "ios",
    pattern: explorer?.[1] || "screens",
    categories,
    tags,
    components,
    marketing,
    flows
  };
};


export const getInitialQueryWithSearchParams = (urlQuery:any, initialQuery: any, searchParams: any) => {
  
  const apps = initialQuery.apps.length > 0 ? initialQuery.apps : searchParams.getAll('app');
  const tags = initialQuery.tags.length > 0 ? initialQuery.tags : searchParams.getAll('tag');
  const categories = initialQuery.categories.length > 0 ? initialQuery.categories : searchParams.getAll('category');
  const components = initialQuery.components.length > 0 ? initialQuery.components : searchParams.getAll('component');
  const flows = initialQuery.flows.length > 0 ? initialQuery.flows : searchParams.getAll('flow');
  const marketing = initialQuery.marketing.length > 0 ? initialQuery.marketing : searchParams.getAll('marketing');

  return {
    apps: apps,
    platform: urlQuery.platform ? urlQuery.platform : initialQuery.platform,
    pattern: urlQuery.pattern ? urlQuery.pattern : initialQuery.pattern,
    categories,
    tags,
    components,
    flows,
    marketing
  }
}
// getInitialQuery.ts

import type { Filter } from '@/types/navigation-types';
import { safeDecode } from './queryUtils';

// Function to get the initial query from the URL segments
export const getInitialQuery = (explorer: string[]) => {
  let app: any = [];
  let categories: any = [];
  let tags: any = [];
  let components: any = [];
  let marketing: any = [];
  let flows: any = [];

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
    flows,
  };
};

// Function to get the initial query with search parameters
export const getInitialQueryWithSearchParams = (query: any, initialQuery: any, searchParams: any) => {
  const apps = initialQuery.apps?.length > 0 ? initialQuery.apps : searchParams.getAll('app');

  const correctedPattern = (pattern:any) => (pattern === 'screens' ? 'tags' : pattern);
  // Combine tags, categories, components, flows, and marketing into filters
  const patterns = ['screens', 'categories', 'components', 'flows', 'marketing'];
  const filters: Filter[] = [];
  for (const pattern of patterns) {
    // Use optional chaining (?.) and provide a default empty array if undefined
    const items = initialQuery[pattern]?.length > 0
      ? initialQuery[pattern]
      : searchParams.getAll(pattern).map((item: string) => safeDecode(item)); // Decode all items safely
    for (const item of items) {
      filters.push({
        name: safeDecode(item), // Make sure to safely decode the name
        pattern: correctedPattern(pattern),
      });
    }
  }

  // Determine the value of correctedChange based on the logic provided
  const correctedChange = searchParams.get('change') || 'pattern';
  //  || (filters.length > 0 ? 'filters' : 'pattern')
  return {
    apps,
    platform: query?.platform || initialQuery.platform,
    pattern: query?.pattern || initialQuery.pattern,
    change: correctedChange,
    filters,
    offset: query?.offset || 0,
    limit: query?.limit || 10,
    initialized: false
  };
};

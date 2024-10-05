import type { Filter, UrlQuery } from '@/types/navigation-types';

// This function combines filters from both URLSearchParams and query
export const combineFilters = (searchParams: URLSearchParams, query: UrlQuery, filters: Filter[]): Filter[] => {
  const combinedFilters: Filter[] = [];
  if (filters.length > 0) return filters;
  // Helper function to add filters from an array based on pattern
  const addFiltersFromArray = (items: string[], pattern: any) => {
    items.forEach((item) => {
      combinedFilters.push({ pattern, name: item });
    });
  };

  // Combine filters from query
  addFiltersFromArray(query.tags, 'tags');
  addFiltersFromArray(query.components, 'components');
  addFiltersFromArray(query.categories, 'categories');
  addFiltersFromArray(query.flows, 'flowActions');
  addFiltersFromArray(query.marketing, 'marketing');

  // Combine filters from searchParams, overriding any existing ones from query if necessary
  searchParams.forEach((value, key) => {
    const decodedValue = decodeURIComponent(value);
    const filterToAdd: Filter | undefined = (() => {
      switch (key) {
        case 'tag':
          return { name: decodedValue, pattern: 'tags' };
        case 'component':
          return { name: decodedValue, pattern: 'components' };
        case 'category':
          return { name: decodedValue, pattern: 'categories' };
        case 'flow':
          return { name: decodedValue, pattern: 'flowActions' };
        case 'marketing':
          return { name: decodedValue, pattern: 'marketing' };
        default:
          return undefined;
      }
    })();

    if (filterToAdd) {
      // Check if the filter with the same pattern and name already exists in the combinedFilters
      const existingFilterIndex = combinedFilters.findIndex(
        (filter) => filter.pattern === filterToAdd.pattern && filter.name === filterToAdd.name
      );

      if (existingFilterIndex !== -1) {
        // Overwrite existing filter
        combinedFilters[existingFilterIndex] = filterToAdd;
      } else {
        // Add new filter
        combinedFilters.push(filterToAdd);
      }
    }
  });

  return combinedFilters;
};

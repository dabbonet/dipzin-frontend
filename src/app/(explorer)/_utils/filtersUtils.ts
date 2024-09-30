import type { Filter, UrlQuery } from '@/types/navigation-types';

// This function combines filters from both URLSearchParams and UrlQuery
export const combineFilters = (searchParams: URLSearchParams, urlQuery: UrlQuery, filters: Filter[]): Filter[] => {
  const combinedFilters: Filter[] = [];
  if (filters.length > 0) return filters;
  // Helper function to add filters from an array based on pattern
  const addFiltersFromArray = (items: string[], pattern: any) => {
    items.forEach((item) => {
      combinedFilters.push({ pattern, name: item });
    });
  };

  // Combine filters from UrlQuery
  addFiltersFromArray(urlQuery.tags, 'tags');
  addFiltersFromArray(urlQuery.components, 'components');
  addFiltersFromArray(urlQuery.categories, 'categories');
  addFiltersFromArray(urlQuery.flows, 'flowActions');
  addFiltersFromArray(urlQuery.marketing, 'marketing');

  // Combine filters from searchParams, overriding any existing ones from UrlQuery if necessary
  searchParams.forEach((value, key) => {
    const decodedValue = decodeURIComponent(value);
    const filterToAdd: Filter | undefined = (() => {
      switch (key) {
        case 'tag':
          return { pattern: 'tags', name: decodedValue };
        case 'component':
          return { pattern: 'components', name: decodedValue };
        case 'category':
          return { pattern: 'categories', name: decodedValue };
        case 'flow':
          return { pattern: 'flowActions', name: decodedValue };
        case 'marketing':
          return { pattern: 'marketing', name: decodedValue };
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

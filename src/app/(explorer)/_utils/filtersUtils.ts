// utils/filterUtils.ts

import type { Filter, UrlQuery } from '@/types/navigation-types';

// This function extracts and combines filters from the provided URLSearchParams
// without relying on any initial queries or state.
export const combineFilters = (searchParams: URLSearchParams): Filter[] => {
  const combinedFilters: Filter[] = [];

  // Extract filters from the URL query parameters in the order they appear.
  searchParams.forEach((value, key) => {
    const decodedValue = decodeURIComponent(value);
    switch (key) {
      case 'tag':
        combinedFilters.push({ pattern: 'tags', name: decodedValue });
        break;
      case 'component':
        combinedFilters.push({ pattern: 'components', name: decodedValue });
        break;
      case 'category':
        combinedFilters.push({ pattern: 'categories', name: decodedValue });
        break;
      case 'flow':
        combinedFilters.push({ pattern: 'flowActions', name: decodedValue });
        break;
      case 'marketing':
        combinedFilters.push({ pattern: 'marketing', name: decodedValue });
        break;
    }
  });

  return combinedFilters;
};


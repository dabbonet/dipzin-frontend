// utils/queryUtils.ts

import { Filter } from '@/types/navigation-types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


interface UpdateStateAndUrlParams {
  newPlatform?: string;
  newPattern?: string;
  newFilters?: Filter[] | ((currentFilters: Filter[]) => Filter[]); // Accept either array or function
  setPlatform: (platform: string) => void;
  setPattern: (pattern: string) => void;
  setFilters: (updateFn: (currentFilters: Filter[]) => Filter[]) => void;
  updateUrlPart: (part: 'platform' | 'pattern' | 'filters', value: string | Filter[]) => void;
}

// Unified function to update state and URL
export const updateStateAndUrl = ({
  newPlatform,
  newPattern,
  newFilters,
  setPlatform,
  setPattern,
  setFilters,
  updateUrlPart,
}: UpdateStateAndUrlParams) => {
  if (newPlatform) {
    setPlatform(newPlatform);
    updateUrlPart('platform', newPlatform);
  }

  if (newPattern) {
    setPattern(newPattern);
    updateUrlPart('pattern', newPattern);
  }

  if (newFilters) {
    setFilters((currentFilters) => {
      let updatedFilters: Filter[];

      // Handle both array and function cases for newFilters
      if (typeof newFilters === 'function') {
        updatedFilters = newFilters(currentFilters); // Invoke the function
      } else {
        updatedFilters = newFilters; // Use the provided array
      }

      updateUrlPart('filters', updatedFilters);
      return updatedFilters;
    });
  }
};

// Utility function to update a specific part of the URL
export const useUpdateUrlPart = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const searchParams = useSearchParams(); // Get the current query parameters

  const updateUrlPart = (
    part: 'platform' | 'pattern' | 'filters',
    value: string | Filter[],
  ) => {
    // Get current path segments from pathname
    const pathSegments = pathname.split('/').filter(Boolean);

    // Determine the updated path based on part
    if (part === 'platform') {
      pathSegments[0] = value as string; // Update the platform (assuming platform is the first segment)
    } else if (part === 'pattern') {
      pathSegments[1] = value as string; // Update the pattern (assuming pattern is the second segment)
    }

    // Rebuild the updated path
    const updatedPath = `/${pathSegments.join('/')}`;

    // Create a new URLSearchParams object to preserve current query parameters
    const updatedQueryParams = new URLSearchParams(searchParams.toString());

    if (part === 'filters') {
      // Clear existing filters
      updatedQueryParams.delete('tag');
      updatedQueryParams.delete('component');
      updatedQueryParams.delete('category');
      updatedQueryParams.delete('flow');
      updatedQueryParams.delete('marketing');

      // Assume value is an array of Filter objects for filters
      const filters = value as Filter[];
      filters.forEach((filter) => {
        // Add filters to query parameters based on filter pattern, encode only for URL
        switch (filter.pattern) {
          case 'tags':
            updatedQueryParams.append('tag', filter.name);
            break;
          case 'components':
            updatedQueryParams.append('component', filter.name);
            break;
          case 'categories':
            updatedQueryParams.append('category', filter.name);
            break;
          case 'flowActions':
            updatedQueryParams.append('flow', filter.name);
            break;
          case 'marketing':
            updatedQueryParams.append('marketing', filter.name);
            break;
        }
      });
    }

    // Construct the final URL with updated path and query parameters
    const newUrl = `${updatedPath}?${updatedQueryParams.toString()}`;

    // Replace the current URL with the new one
    router.replace(newUrl);
  };

  return updateUrlPart;
};
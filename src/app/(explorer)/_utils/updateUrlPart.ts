// createUpdateUrlPart.ts

import type { Filter } from '@/types/navigation-types';
import { pluralToSingular, getPatternHandle } from '../_utils/queryUtils'; // Import utility functions

type UpdateUrlPartType = (
  part: 'platform' | 'pattern' | 'filters' | 'apps' | ('platform' | 'pattern' | 'filters' | 'apps')[],
  value: any
) => string;

export const createUpdateUrlPart = (
  router: any,
  pathname: string,
  searchParams: URLSearchParams
): UpdateUrlPartType => (part, value) => {
  const updatedSearchParams = new URLSearchParams(searchParams.toString());
  console.log(value)

  // Utility functions
  const deleteAllFilters = () => {
    ['tag', 'component', 'category', 'flow', 'marketing'].forEach((param) => updatedSearchParams.delete(param));
  };

  const appendFilterWithoutDuplication = (key: string, filterValue: string) => {
    const existingValues = updatedSearchParams.getAll(key);
    if (!existingValues.includes(filterValue)) {
      updatedSearchParams.append(key, filterValue);
    }
  };

  // Split the current pathname into segments
  let pathSegments = pathname.split('/').filter(Boolean);

  // Handle multiple parts update
  const parts = Array.isArray(part) ? part : [part];

  // If value is the full query object
  const query = value;

  parts.forEach((partKey) => {
    switch (partKey) {
      case 'platform':
        // Update platform in pathSegments[0]
        if (query.platform) {
          pathSegments[0] = (query.platform as string).toLowerCase();
        }
        break;
      case 'pattern':
        // Update pattern in pathSegments[1]
        if (query.pattern) {
          pathSegments[1] = (query.pattern as string).toLowerCase();
        }
        break;
      case 'apps':
        // Handle apps in query
        console.log(value)
        updatedSearchParams.delete('app');
        if (query.apps && Array.isArray(query.apps) && query.apps.length > 0) {
          query.apps.forEach((app: any) => {
            const appSlug = app.slug;
            console.log(appSlug)
            appendFilterWithoutDuplication('app', appSlug);
          });
        } else {
          // No apps: Clear apps from URL
          pathSegments = pathSegments.slice(0, 2);
        }
        break;
      case 'filters':
        deleteAllFilters();

        // Handle single filter with getPatternHandle
        if (query.filters && query.filters.length === 1) {
          const singleFilter = query.filters[0];
          const paramName = getPatternHandle(singleFilter.pattern); // Convert pattern based on custom logic (e.g., categories -> apps)
          // Slice the pathSegments to keep platform and pattern (0, 1)
          pathSegments = pathSegments.slice(0, 1);

          // Update the path with the new pattern and entity (e.g., /ios/apps/Business)
          pathSegments = [...pathSegments, `${paramName}`, `${encodeURIComponent(singleFilter.name)}`];
        } else if (query.filters && query.filters.length > 1) {
          // Multiple filters should be query parameters
          pathSegments = pathSegments.slice(0, 2); // Keep platform and pattern
          query.filters.forEach((filter: Filter) => {
            const patternName = pluralToSingular(filter.pattern); // Convert plural to singular using the utility function
            const paramName = getPatternHandle(patternName);
            appendFilterWithoutDuplication(paramName, filter.name);
          });
        } else {
          // No filters: Clear filters from URL
          pathSegments = pathSegments.slice(0, 2); // Keep platform and pattern
        }
        break;
      default:
        break;
    }
  });

  // Add the change parameter if it exists
  if (query.change) {
    updatedSearchParams.set('change', query.change);
  }

  const updatedPath = `/${pathSegments.join('/')}`;
  const newUrl = `${updatedPath}?${updatedSearchParams.toString()}`;
  router.push(newUrl, undefined, { shallow: true });
  return pathSegments[1] || ''; // Return pattern
};

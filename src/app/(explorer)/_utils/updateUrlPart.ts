// createUpdateUrlPart.ts

import type { Filter } from '@/types/navigation-types';
import { getPatternHandle } from "./queryUtils";

type UpdateUrlPartType = (
  value: any
) => string;

export const createUpdateUrlPart = (
  router: any,
): UpdateUrlPartType => (value) => {
  // Initialize updatedSearchParams
  const updatedSearchParams = new URLSearchParams();

  // Utility functions
  const appendFilterWithoutDuplication = (key: string, filterValue: string) => {
    const existingValues = updatedSearchParams.getAll(key);
    if (!existingValues.includes(filterValue)) {
      updatedSearchParams.append(key, filterValue);
    }
  };

  // Initialize pathSegments
  let pathSegments: string[] = [];

  const query = value;
  // Start building pathSegments
  if (query.platform) {
    pathSegments.push(query.platform.toLowerCase());
  }

  if (query.pattern) {
    pathSegments.push(query.pattern.toLowerCase());
  }

  // Remove existing filters from updatedSearchParams
  ['tags', 'components', 'categories', 'flows', 'marketing', 'screens', 'tags'].forEach((param) => updatedSearchParams.delete(param));

  // Handle filters
  if (query.filters && query.filters.length > 0) {
    if (query.filters.length === 1) {
      const singleFilter = query.filters[0];
      const filterPattern = singleFilter.pattern.toLowerCase();
      const patternHandle = getPatternHandle(filterPattern);

      // Check if filter pattern matches query.pattern
      if (filterPattern === query?.pattern?.toLowerCase()) {
        // Pattern matches, include filter name in path
        pathSegments.push(encodeURIComponent(singleFilter.name));
      } else {
        // Pattern differs, add filter as query parameter
        appendFilterWithoutDuplication(patternHandle, singleFilter.name);
      }
    } else {
      // Multiple filters, add them as query parameters
      query.filters.forEach((filter: Filter) => {
        const patternName = filter.pattern;
        const paramName = getPatternHandle(patternName).toLowerCase();
        appendFilterWithoutDuplication(paramName, filter.name);
      });
    }
  } else {
    // No filters: Ensure pathSegments only contain platform and pattern
    pathSegments = pathSegments.slice(0, 2);
  }

  // Remove existing apps from updatedSearchParams
  updatedSearchParams.delete('app');

  // Handle apps
  if (query.apps && query.apps.length > 0) {
    query.apps.forEach((app: any) => {
      const appSlug = app.slug || app;
      appendFilterWithoutDuplication('app', appSlug);
    });
  }

  // Handle other query parameters
  if (query.change) {
    updatedSearchParams.set('change', query.change);
  } else {
    updatedSearchParams.delete('change');
  }

  // Build the new URL
  const updatedPath = `/${pathSegments.join('/')}`;
  const searchParamsString = updatedSearchParams.toString();
  const newUrl = searchParamsString
    ? `${updatedPath}?${searchParamsString}`
    : updatedPath;

  // Mark this as an internal navigation to prevent race condition with URL sync
  // The Navigator component will check this flag before syncing from URL
  if (typeof window !== 'undefined' && (window as any).__dipzinMarkInternalNavigation) {
    (window as any).__dipzinMarkInternalNavigation();
  }

  // Update the router
  router.push(newUrl, undefined, { shallow: true });

  return pathSegments[1] || ''; // Return pattern or empty string
};

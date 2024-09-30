// updateStateAndUrl.ts

import type { Filter } from '@/types/navigation-types';
import { getPatternHandle } from './queryUtils';

interface UpdateStateAndUrlParams {
  newPlatform?: string;
  newPattern?: string;
  newFilters?: Filter[] | undefined;
  newApps?: string[];
  setPlatform: (platform: string) => void;
  setPattern: (pattern: string) => void;
  setFilters: (updateFn: (currentFilters: Filter[]) => Filter[]) => void;
  setApps: (updateFn: (currentApps: any[]) => any[]) => void;
  updateUrlPart: (
    part: 'platform' | 'pattern' | 'filters' | 'apps',
    value: string | Filter[] | string[]
  ) => string;
}

export const updateStateAndUrl = ({
  newPlatform,
  newPattern,
  newFilters,
  newApps,
  setPlatform,
  setPattern,
  setFilters,
  setApps,
  updateUrlPart,
}: UpdateStateAndUrlParams) => {
  // Handle platform update
  if (newPlatform) {
    setPlatform(newPlatform);
    updateUrlPart('platform', newPlatform);
  }

  // Handle pattern update
  if (newPattern) {
    setPattern(newPattern);
    updateUrlPart('pattern', newPattern);
  }

  // Handle filters update
  if (newFilters) {
    setFilters((currentFilters) => {
      // Check for filters to remove: these are the ones present in currentFilters but not in newFilters
      const updatedFilters = currentFilters.filter((currentFilter) => newFilters.some((newFilter) => newFilter.pattern === currentFilter.pattern && newFilter.name === currentFilter.name));

      // Check for filters to add: these are the ones in newFilters but not in currentFilters
      const filtersToAdd = newFilters.filter((newFilter) => !updatedFilters.some((currentFilter) => currentFilter.pattern === newFilter.pattern && currentFilter.name === newFilter.name));

      // Combine filters: we keep only updated ones (those that should remain) + new ones
      const finalFilters = [...updatedFilters, ...filtersToAdd];

      // Update URL based on final filter count
      if (finalFilters.length === 1) {
        const singleFilter = finalFilters[0];
        if (singleFilter) {
          const patternHandle = getPatternHandle(singleFilter.pattern);
          setPattern(patternHandle);
          updateUrlPart('filters', `${singleFilter.pattern}/${decodeURIComponent(singleFilter.name)}`);
        }
      } else if (finalFilters.length > 1) {
        const pattern = updateUrlPart('filters', finalFilters);
        setPattern(pattern)
      } else {
        // No filters: Clear filters from URL
        updateUrlPart('filters', []);
      }
      // Return the final filters, ensuring both additions and deletions are handled
      return finalFilters;
    });
  }

  // Handle apps update
  if (newApps) {
    setApps(() => newApps);
    // Update URL based on app count
    if (newApps.length === 1) {
      const singleApp = newApps[0];
      if (singleApp) {
        updateUrlPart('apps', singleApp);
      }
    } else if (newApps.length > 1) {
      updateUrlPart('apps', newApps);
    } else {
      // No apps: Clear apps from URL
      updateUrlPart('apps', []);
    }
  }
};

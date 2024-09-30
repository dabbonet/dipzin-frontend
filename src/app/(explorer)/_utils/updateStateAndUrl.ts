// updateStateAndUrl.ts

import { Filter } from '@/types/navigation-types';

interface UpdateStateAndUrlParams {
  newPlatform?: string;
  newPattern?: string;
  newFilters?: Filter[];
  newApps?: string[];
  setPlatform: (platform: string) => void;
  setPattern: (pattern: string) => void;
  setFilters: (updateFn: (currentFilters: Filter[]) => Filter[]) => void;
  setApps: (apps: string[]) => void;
  updateUrlPart: (
    part: 'platform' | 'pattern' | 'filters' | 'apps',
    value: string | Filter[] | string[]
  ) => void;
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
      const updatedFilters = currentFilters.filter((currentFilter) => newFilters.some( (newFilter) => newFilter.pattern === currentFilter.pattern && newFilter.name === currentFilter.name ));

      // Check for filters to add: these are the ones in newFilters but not in currentFilters
      const filtersToAdd = newFilters.filter((newFilter) => !updatedFilters.some( (currentFilter) => currentFilter.pattern === newFilter.pattern && currentFilter.name === newFilter.name));

      // Combine filters: we keep only updated ones (those that should remain) + new ones
      const finalFilters = [...updatedFilters, ...filtersToAdd];

      // Update URL based on final filter count
      if (finalFilters.length === 1) {
        const singleFilter = finalFilters[0];
        if (singleFilter) {
          updateUrlPart('filters', `${singleFilter.pattern}/${singleFilter.name}`);
        }
      } else if (finalFilters.length > 1) {
        updateUrlPart('filters', finalFilters);
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
    setApps(newApps);

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

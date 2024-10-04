// updateStateAndUrl.ts

import type { Filter } from '@/types/navigation-types';

interface UpdateStateAndUrlParams {
  newPlatform?: string;
  newPattern?: string;
  newFilters?: Filter[] | undefined;
  newApps?: any;
  setPlatform: (platform: string) => void;
  setPattern: (pattern: string) => void;
  setFilters: (updateFn: (currentFilters: Filter[]) => Filter[]) => void;
  setApps: (updateFn: (currentApps: any[]) => any[]) => void;
  updateUrlPart: (
    part: 'platform' | 'pattern' | 'filters' | 'apps' | ('platform' | 'pattern' | 'filters' | 'apps')[],
    value: any
  ) => string;
  query: any;
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
  query
}: UpdateStateAndUrlParams) => {
  // Handle platform and pattern update
  if (newPlatform || newPattern) {
    newPlatform !== undefined && setPlatform(newPlatform);
    newPattern !== undefined && setPattern(newPattern);
    updateUrlPart(['platform', 'pattern'], { platform: newPlatform, pattern: newPattern, change: query.change });
  }

  // Handle filters update
  if (newFilters !== undefined) {
    setFilters(() => newFilters as Filter[]);
    updateUrlPart('filters', { filters: newFilters, change:query.change });
  }

  // Handle apps update
  if (newApps !== undefined) {
    setApps(() => newApps);
    updateUrlPart('apps', { apps: newApps, change: query.change });
  }
};

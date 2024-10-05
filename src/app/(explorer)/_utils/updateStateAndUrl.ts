// updateStateAndUrl.ts

import type { Filter } from '@/types/navigation-types';

interface UpdateStateAndUrlParams {
  newPlatform?: string;
  newPattern?: string;
  newFilters?: Filter[] | ((currentFilters: Filter[]) => Filter[]);
  newApps?: any[] | ((currentApps: any[]) => any[]);
  setPlatform: (platform: string) => void;
  setPattern: (pattern: string) => void;
  setFilters: (
    filters: Filter[] | ((currentFilters: Filter[]) => Filter[])
  ) => void;
  setApps: (apps: any[] | ((currentApps: any[]) => any[])) => void;
  updateUrlPart: (
    part:
    | 'platform'
    | 'pattern'
    | 'filters'
    | 'apps'
    | ('platform' | 'pattern' | 'filters' | 'apps')[],
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
  if (newPlatform !== undefined || newPattern !== undefined) {
    if (newPlatform !== undefined) {
      setPlatform(newPlatform);
    }
    if (newPattern !== undefined) {
      setPattern(newPattern);
    }
    updateUrlPart(['platform', 'pattern'], {
      platform: newPlatform || query.platform,
      pattern: newPattern || query.pattern,
      change: query.change,
    });
  }

  // Handle filters update
  if (newFilters !== undefined) {
    setFilters(newFilters);
    updateUrlPart('filters', {
      filters:
        typeof newFilters === 'function'
          ? newFilters(query.filters)
          : newFilters,
      change: query.change,
    });
  }

  // Handle apps update
  if (newApps !== undefined) {
    setApps(newApps);
    updateUrlPart('apps', {
      apps: typeof newApps === 'function' ? newApps(query.apps) : newApps,
      change: query.change,
    });
  }
};

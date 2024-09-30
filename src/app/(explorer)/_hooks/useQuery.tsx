import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useMemo } from 'react';
import type { Filter, UrlQuery, DataQuery } from '@/types/navigation-types';

interface QueryStoreState {
  filters: Filter[]; // Parent state for all filters
  urlQuery: UrlQuery;
  dataQuery: DataQuery | null;
  setUrlQuery: (query: UrlQuery) => void;
  setDataQuery: (data: DataQuery) => void;
  setFilters: (updateFn: (currentFilters: Filter[]) => Filter[]) => void; 
  setPlatform: (platform: string) => void;
  setPattern: (pattern: string) => void;
  setApps: (apps: string[]) => void; // New function to set apps
}

// Create the Zustand store with devtools middleware
const useQueryStore = create<QueryStoreState>()(
  devtools((set) => ({
    filters: [], 
    urlQuery: {
      apps: [],
      pattern: '',
      platform: '',
      tags: [],
      components: [],
      categories: [],
      flows: [],
      marketing: [],
    },
    dataQuery: null,
    setUrlQuery: (query: UrlQuery) => set({ urlQuery: query }),
    setDataQuery: (query: DataQuery) => set({ dataQuery: query }),
    setFilters: (updateFn: (currentFilters: Filter[]) => Filter[]) => {
      // Apply the update function to the current filters state
      set((state) => ({ filters: updateFn(state.filters) }));
    },
    setPlatform: (platform: string) => {
      set((state) => ({
        urlQuery: { ...state.urlQuery, platform },
      }));
    },
    setPattern: (pattern: string) => {
      set((state) => ({
        urlQuery: { ...state.urlQuery, pattern },
      }));
    },
    setApps: (apps: string[]) => {
      set((state) => ({
        urlQuery: { ...state.urlQuery, apps },
      }));
    },
  }))
);

// Custom hook to use the Zustand store
const useQuery = () => {
  const {
    filters,
    urlQuery,
    dataQuery,
    setUrlQuery,
    setDataQuery,
    setFilters,
    setPlatform,
    setPattern,
    setApps, // Add setApps to the hook return value
  } = useQueryStore();

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(
    () => ({
      filters,
      urlQuery,
      dataQuery,
      setUrlQuery,
      setDataQuery,
      setFilters,
      setPlatform,
      setPattern,
      setApps, // Add setApps here
    }),
    [filters, urlQuery, dataQuery]
  );
};

// Export the hook and provider together
export { useQuery };

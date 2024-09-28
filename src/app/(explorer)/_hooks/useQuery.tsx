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
}

// Create the Zustand store with devtools middleware
const useQueryStore = create<QueryStoreState>()(
  devtools((set) => ({
    filters: [], // Initialize an empty filters array
    urlQuery: {
      apps: [],
      pattern: '',
      platform: '',
      tags: [],
      components: [],
      flows: [],
      marketing: [],
    },
    dataQuery: null, // Initialize dataQuery as null
    setUrlQuery: (query: UrlQuery) => set({ urlQuery: query }),
    setDataQuery: (data: DataQuery) => set({ dataQuery: data }),
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
    }),
    [filters, urlQuery, dataQuery]
  );
};

// Export the hook and provider together
export { useQuery };

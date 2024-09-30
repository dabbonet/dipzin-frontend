import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useMemo } from 'react';
import type { Filter, Query, DataQuery } from '@/types/navigation-types';

interface QueryStoreState {
  filters: Filter[]; // Parent state for all filters
  change: string;
  query: Query;
  data: any;
  dataQuery: DataQuery | null;
  setQuery: (query: Query) => void;
  setDataQuery: (response: any) => void;
  setFilters: (updateFn: (currentFilters: Filter[]) => Filter[]) => void;
  setPlatform: (platform: string) => void;
  setPattern: (pattern: string) => void;
  setApps: (updateFn: (currentApps: Filter[]) => Filter[]) => void; // New function to set apps
}

// Create the Zustand store with devtools middleware
const useQueryStore = create<QueryStoreState>()(
  devtools((set) => ({
    filters: [],
    change: "",
    query: {
      apps: [],
      pattern: '',
      platform: '',
      tags: [],
      components: [],
      categories: [],
      flows: [],
      marketing: [],
    },
    data: null,
    dataQuery: null,
    setQuery: (query: Query) => set({ query }),
    setDataQuery: (response: any) => set({ data: response.data, dataQuery: response.query }),
    setFilters: (updateFn: (currentFilters: Filter[]) => Filter[]) => {
      // Apply the update function to the current filters state
      set((state) => ({ filters: updateFn(state.filters), change: 'filters' }));
    },
    setPlatform: (platform: string) => {
      set((state) => ({
        query: { ...state.query, platform, change: 'platform' },
      }));
    },
    setPattern: (pattern: string) => {
      set((state) => ({
        query: { ...state.query, pattern, change: 'pattern' },
      }));
    },
    setApps: (updateFn: (currentApps: any[]) => any[]) => {
      set((state) => ({
        query: { ...state.query, apps: updateFn(state.query.apps || []) },
        change: 'filters',
      }));
    },
  }))
);

// Custom hook to use the Zustand store
const useQuery = () => {
  const {
    filters,
    change,
    query,
    data,
    dataQuery,
    setQuery,
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
      change,
      query,
      data,
      dataQuery,
      setQuery,
      setDataQuery,
      setFilters,
      setPlatform,
      setPattern,
      setApps, // Add setApps here
    }),
    [filters, query, dataQuery]
  );
};

// Export the hook and provider together
export { useQuery };

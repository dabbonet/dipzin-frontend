// useQuery.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useMemo } from 'react';
import type { Filter, Query } from '@/types/navigation-types';

// useQuery.ts

interface QueryStoreState {
  query: Query;
  data: any;
  setQuery: (query: Query) => void;
  setData: (data: any) => void;
  setPlatform: (platform: string) => void;
  setPattern: (pattern: string) => void;
  setFilters: (updateFn: (currentFilters: Filter[]) => Filter[]) => void;
  setApps: (updateFn: (currentApps: any[]) => any[]) => void;
}

const useQueryStore = create<QueryStoreState>()(
  devtools((set) => ({
    // Initial state of the query
    query: {
      apps: [],
      pattern: '',
      platform: '',
      change: '',
      filters: [],
      offset: 0,
      limit: 20,
      totalPages: 0,
      totalRecords: 0,
      initialized: undefined,
    },
    data: null,
    // Function to set the entire query object
    setQuery: (query: Query) => set({ query }),
    // Function to set the data
    setData: (data: any) => set({ data }),
    setPlatform: (platform: string) => {
      console.log(platform)
      set((state) => ({
        query: { ...state.query, platform, change: 'platform' }
      }))
    },
    setPattern: (pattern: string) => {
      set((state) => ({
        query: { ...state.query, pattern, change: 'pattern' }
      }))
    },
    setFilters: (updateFn: (currentFilters: Filter[]) => Filter[]) => set((state) => ({
      query: { ...state.query, filters: updateFn(state.query.filters), change: 'filters' }
    })),
    setApps: (updateFn: (currentApps: any[]) => any[]) => set((state) => ({
      query: { ...state.query, apps: updateFn(state.query.apps || []), change: 'apps' }
    })),
  }))
);

const useQuery = () => {
  const { query, data, setQuery, setData, setPlatform, setPattern, setFilters, setApps } = useQueryStore();

  return useMemo(() => ({
    query,
    data,
    setQuery,
    setData,
    setPlatform,
    setPattern,
    setFilters,
    setApps,
  }), [query, data]);
};

export { useQuery };

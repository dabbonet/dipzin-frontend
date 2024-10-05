// useQuery.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useMemo } from 'react';
import type { Filter, Query } from '@/types/navigation-types';

interface QueryStoreState {
  query: Query;
  data: any;
  setQuery: (query: Query) => void;
  setData: (data: any) => void;
  setPlatform: (platform: string) => void;
  setPattern: (pattern: string) => void;
  setFilters: (
    filters: Filter[] | ((currentFilters: Filter[]) => Filter[])
  ) => void;
  setApps: (apps: any[] | ((currentApps: any[]) => any[])) => void;
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
      initialized: false,
      changed: false
    },
    data: null,
    // Function to set the entire query object
    setQuery: (query: Query) => set({ query }),
    // Function to set the data
    setData: (data: any) => set({ data }),
    setPlatform: (platform: string) => set((state) => ({
      query: {
        ...state.query, platform, change: 'platform', changed: true, offset: 0
      },
    })),
    setPattern: (pattern: string) => set((state) => ({
      query: {
        ...state.query, pattern, change: 'pattern', changed: true, offset: 0
      },

    })),
    setFilters: (
      filters: Filter[] | ((currentFilters: Filter[]) => Filter[])
    ) => set((state) => ({
      query: {
        ...state.query,
        filters:
            typeof filters === 'function'
              ? filters(state.query.filters)
              : filters,
        change: 'filters',
        changed: true,
        offset: 0
      },
    })),
    setApps: (apps: any[] | ((currentApps: any[]) => any[])) => set((state) => ({
      query: {
        ...state.query,
        apps:
            typeof apps === 'function'
              ? apps(state.query.apps || [])
              : apps,
        change: 'apps',
        changed: true,
        offset: 0
      },
    })),
  }))
);

const useQuery = () => {
  const {
    query,
    data,
    setQuery,
    setData,
    setPlatform,
    setPattern,
    setFilters,
    setApps
  } = useQueryStore();

  return useMemo(
    () => ({
      query,
      data,
      setQuery,
      setData,
      setPlatform,
      setPattern,
      setFilters,
      setApps
    }),
    [query, data, setQuery, setData, setPlatform, setPattern, setFilters, setApps]
  );
};

export { useQuery };

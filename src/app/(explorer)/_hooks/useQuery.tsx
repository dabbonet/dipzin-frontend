// useQuery.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useMemo } from 'react';
import type { Filter, Query } from '@/types/navigation-types';

interface QueryStoreState {
  query: Query;
  pagination: {
    offset: number;
    limit: number;
    totalPages: number;
    totalRecords: number;
  };
  data: any;
  setQuery: (query: Query) => void;
  setPagination: (pagination: {
    offset: number;
    limit: number;
    totalPages: number;
    totalRecords: number;
  }) => void;
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
    query: {
      apps: [],
      pattern: '',
      platform: '',
      change: '',
      filters: [],
      initialized: false,
      changed: false,
    },
    pagination: {
      offset: 0,
      limit: 20,
      totalPages: 0,
      totalRecords: 0,
    },
    data: null,
    setQuery: (query: Query) => set({ query }),
    setPagination: (pagination) => set({ pagination }),
    setData: (data: any) => set({ data }),

    // Update the setPlatform function to reset data
    setPlatform: (platform: string) => set((state) => ({
      query: {
        ...state.query,
        platform,
        change: 'platform',
        changed: true,
        offset: 0, // Reset offset
      },
      data: null, // Reset data when platform changes
    })),

    // Update the setPattern function to reset data
    setPattern: (pattern: string) => set((state) => ({
      query: {
        ...state.query,
        pattern,
        change: 'pattern',
        changed: true,
        offset: 0, // Reset offset
      },
      data: null, // Reset data when pattern changes
    })),

    // Update the setFilters function to reset data
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
        offset: 0, // Reset offset
      },
      data: null, // Reset data when filters change
    })),

    // Update the setApps function to reset data
    setApps: (apps: any[] | ((currentApps: any[]) => any[])) => set((state) => ({
      query: {
        ...state.query,
        apps:
            typeof apps === 'function'
              ? apps(state.query.apps || [])
              : apps,
        change: 'apps',
        changed: true,
        offset: 0, // Reset offset
      },
      data: null, // Reset data when apps change
    })),
  }))
);

const useQuery = () => {
  const {
    query,
    pagination,
    data,
    setQuery,
    setPagination,
    setData,
    setPlatform,
    setPattern,
    setFilters,
    setApps,
  } = useQueryStore();

  return useMemo(
    () => ({
      query,
      pagination,
      data,
      setQuery,
      setPagination,
      setData,
      setPlatform,
      setPattern,
      setFilters,
      setApps,
    }),
    [query, pagination, data, setQuery, setPagination, setData, setPlatform, setPattern, setFilters, setApps]
  );
};

export { useQuery };

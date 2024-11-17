// useFetchData.ts

import { useCallback } from 'react';
import { fetchDataAction } from '../_actions/fetchData';
import { useQuery } from './useQuery';

export function useFetchData() {
  const {
    data, setData, pagination, setPagination, setSuggestions
  } = useQuery();

  const fetchData = useCallback(
    async (queryOverride, isPagination = false) => {
      const correctedFilters = (queryOverride.filters || []).map((filter) => {
        if (filter.pattern && filter.pattern.toLowerCase() === 'flows') {
          return { ...filter, pattern: 'flowActions' };
        }
        return filter;
      });

      const dataQuery = {
        apps: (queryOverride.apps || []).map((app) => (typeof app === 'object' && 'slug' in app ? { slug: app.slug } : { slug: app })),
        pattern: queryOverride.pattern,
        platform: queryOverride.platform,
        change: queryOverride.change,
        filters: correctedFilters,
        offset: queryOverride.offset, // Use pagination offset
        limit: pagination.limit, // Use pagination limit
      };
      const response = await fetchDataAction(dataQuery);
      if (response.status === 500) {
        throw new Error('Server error');
      }

      if (response.status === 404) {
        throw new Error('No data found');
      }
      // Update the data in store
      if (isPagination) {
        setData([...data, ...response.data]);
      } else {
        setData(response.data);
      }

      // Update the pagination separately
      setPagination({
        offset: response.pagination.pageSize * (response.pagination.page - 1),
        limit: response.pagination.pageSize,
        totalPages: response.pagination.totalPages,
        totalRecords: response.pagination.totalRecords,
      });

      // Update the suggestions
      setSuggestions(response.suggestions);

      const updatedQuery = {
        ...queryOverride,
        ...response.query,
        offset: response.pagination.pageSize * (response.pagination.page - 1),
        limit: response.pagination.pageSize,
        initialized: false,
        changed: false
      };

      return updatedQuery;
    },
    [pagination, setData, setPagination, setSuggestions]
  );

  return { fetchData };
}

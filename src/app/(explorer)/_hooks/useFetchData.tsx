import { fetchDataAction } from '../_actions/fetchData';
import { useQuery } from './useQuery';
import { singularToPlural } from '../_utils/queryUtils';
import { useCallback } from 'react';

export function useFetchData() {
  const {
    query, data, setData, setQuery
  } = useQuery();
  const correctPattern = (pattern: string) => {
    if (pattern === 'screens') return 'tags';
    return pattern;
  };

  const fetchData = useCallback(
    async (isPagination = false, queryOverride = query) => {
      const correctedFilters = queryOverride.filters.map((filter) => ({
        ...filter,
        pattern: correctPattern(filter.pattern),
      }));
      console.log(queryOverride)
      const dataQuery = {
        apps: (queryOverride.apps || []).map((app: { slug: string } | string) => (typeof app === 'object' && 'slug' in app ? { slug: app.slug } : { slug: app })),
        pattern: queryOverride.pattern,
        platform: queryOverride.platform,
        change: queryOverride.change,
        filters: correctedFilters.map((filter) => ({
          name: filter.name,
          pattern: filter.pattern,
        })),
        offset: queryOverride.offset,
        limit: queryOverride.limit,
      };
      console.log(dataQuery)
      try {
        const response = await fetchDataAction(dataQuery);

        // Check for 500 error status
        if (response.status === 500) {
          return null; // Return null to signal failure and stop any further processing
        }

        if (isPagination) {
          setData([...(data || []), ...response.data]);
        } else {
          setData(response.data);
        }

        const updatedQuery = {
          ...query,
          ...response.query,
          pattern: singularToPlural(response.query.pattern),
          offset: response.pagination.pageSize * (response.pagination.page - 1),
          limit: response.pagination.pageSize,
          totalPages: response.pagination.totalPages,
          totalRecords: response.pagination.totalRecords,
          initialized: false,
          changed: false,
        };

        return updatedQuery;
      } catch (error) {
        return error;
      }
    },
    [query, data, setData, setQuery]
  );

  return { fetchData };
}

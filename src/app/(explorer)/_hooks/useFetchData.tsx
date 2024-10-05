// useFetchData.ts

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
    // if (pattern === 'components') return 'component';
    return pattern;
  };
  // Function to build and fetch data
  const fetchData = useCallback(
    async (isPagination = false, queryOverride = query) => {
      const correctedFilters = queryOverride.filters.map((filter) => ({
        ...filter,
        pattern: correctPattern(filter.pattern),
      }));

      const dataQuery = {
        apps: (queryOverride.apps || []).map((app: { slug: string } | string) => (typeof app === 'object' && 'slug' in app
          ? { slug: app.slug }
          : { slug: app })),
        pattern: queryOverride.pattern,
        platform: queryOverride.platform,
        change: queryOverride.change,
        filters: correctedFilters.map((filter) => ({
          name: filter.name,
          pattern: filter.pattern,
        })),
        offset: queryOverride.offset, // Use query's offset (number of records)
        limit: queryOverride.limit, // Use query's limit (page size)
      };
      try {
        const response = await fetchDataAction(dataQuery);
        if (response.error) return response.error;
        if (isPagination) {
          // Append data during pagination
          setData([...(data || []), ...response.data]); // Append new data to existing data
        } else {
          // Replace data on first load or when query changes
          setData(response.data);
        }
        // Map the pagination values to the query
        const updatedQuery = {
          ...query,
          ...response.query,
          pattern: singularToPlural(response.query.pattern), // Pluralize pattern before setting
          offset:
            response.pagination.pageSize * (response.pagination.page - 1), // Correct offset calculation
          limit: response.pagination.pageSize, // Set limit based on page size
          totalPages: response.pagination.totalPages, // Include total pages
          totalRecords: response.pagination.totalRecords, // Include total records
          initialized: false,
          changed: false
        };
        // Update the query state with the updated pagination info
        return (updatedQuery);
      } catch (error) {
        return error;
      }
    },
    [query, data, setData, setQuery]
  );

  return { fetchData };
}

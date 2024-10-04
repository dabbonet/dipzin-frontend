// useFetchData.ts

import { fetchDataAction } from '../_actions/fetchData';
import { useQuery } from "./useQuery";
import { pluralToSingular, singularToPlural } from '../_utils/queryUtils';

export function useFetchData() {
  const { query, data, setData } = useQuery();

  // Function to build and fetch data
  const fetchData = async (isPagination = false, queryOverride = query) => {
    console.log(queryOverride.platform, queryOverride.pattern, queryOverride.change)
    const correctPattern = (pattern: string) => {
      if (pattern === 'marketing' || pattern === 'screens') return 'tags';
      // if (pattern === 'components') return 'component';
      return pattern;
    };

    const correctedPattern = queryOverride.filters.map(filter => correctPattern(filter.pattern));
    const dataQuery = {
      apps: (queryOverride.apps || []).map(app => typeof app === 'object' && 'slug' in app ? { slug: app.slug } : { slug: app }),
      pattern: pluralToSingular(queryOverride.pattern),
      platform: queryOverride.platform,
      change: queryOverride.change,
      filters: queryOverride.filters.map((filter, index) => ({ name: filter.name, pattern: correctedPattern[index] })),
      offset: queryOverride.offset,  // Use query's offset (number of records)
      limit: queryOverride.limit,    // Use query's limit (page size)
    };
    try {
      console.log('Fetching data:', dataQuery);
      const response = await fetchDataAction(dataQuery);
      console.log(response)
      if (response.error) return console.error('Error fetching data:', response.error);
      if (isPagination) {
        // Append data during pagination
        setData([...data, ...response.data]); // Append new data to existing data
      } else {
        // Replace data on first load
        setData(response.data);
      }
      // Map the pagination values to the query
      const updatedQuery = {
        ...response.query,
        pattern: singularToPlural(response.query.pattern), // Pluralize pattern before setting
        offset: response.pagination.pageSize * (response.pagination.page - 1),  // Correct offset calculation
        limit: response.pagination.pageSize,  // Set limit based on page size
        totalPages: response.pagination.totalPages, // Include total pages
        totalRecords: response.pagination.totalRecords, // Include total records
      };
      return updatedQuery;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return { fetchData };
}

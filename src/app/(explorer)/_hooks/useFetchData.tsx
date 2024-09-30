import type { Filter } from '@/types/navigation-types';
import { fetchDataAction } from '../_actions/fetchData';
import { useQuery } from "./useQuery"; // assuming your Zustand hook is in the hooks folder
import { useState } from 'react';
import { pluralToSingular } from '../_utils/queryUtils';

// FetchData function using Next.js server actions
export function useFetchData() {
  const { query, filters, setDataQuery } = useQuery();
  const [pagination, setPagination] = useState({ offset: 0, limit: 50 }); // default pagination

  // Function to build and fetch data
  const fetchData = async () => {
    // Build the query object
    const dataQuery = {
      apps: (query.apps || []).map((app) => (typeof app === 'object' && 'slug' in app ? { slug: app.slug } : {})),
      pattern: pluralToSingular(query.pattern),
      platform: query.platform,
      change: query.change || "pattern", // Ensure this is defined in query
      filters: filters.map((filter: Filter) => ({
        name: filter.name,
        pattern: filter.pattern,
      })),
      offset: pagination.offset,
      limit: pagination.limit,
    };
    // Fetch data from server action
    try {
      const response = await fetchDataAction(dataQuery);// set the returned data
      setPagination({ offset: response.offset, limit: response.limit }); // update pagination from response
      setDataQuery(response); // set dataQuery to response.query
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return { pagination, fetchData };
}

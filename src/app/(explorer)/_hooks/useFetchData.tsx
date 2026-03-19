// useFetchData.ts

import { useCallback } from "react";
import { fetchDataAction } from "../_actions/fetchData";
import { useQuery } from "./useQuery";

interface RedirectedInfo {
  from: { pattern: string; platform: string };
  to: { pattern: string; platform: string };
  reason: string;
}

interface FetchDataResult {
  query: any;
  redirected?: RedirectedInfo;
}

export function useFetchData() {
  const {
    data, setData, pagination, setPagination, setSuggestions
  } = useQuery();

  const fetchData = useCallback(
    async (queryOverride, isPagination = false): Promise<FetchDataResult> => {
      const correctedFilters = (queryOverride.filters || []).map((filter) => {
        if (filter.pattern && filter.pattern.toLowerCase() === "flows") {
          return { ...filter, pattern: "flowActions" };
        }
        return filter;
      });

      const dataQuery = {
        apps: (queryOverride.apps || []).map((app) => (typeof app === "object" && "slug" in app
          ? { slug: app.slug }
          : { slug: app }),),
        pattern: queryOverride.pattern,
        platform: queryOverride.platform,
        change: queryOverride.change,
        filters: correctedFilters,
        offset: queryOverride.offset, // Use pagination offset
        limit:
          queryOverride.pattern
          && queryOverride.pattern.toLowerCase() === "marketing"
            ? pagination.limit * 2.5
            : pagination.limit, // Adjust pagination limit for marketing pattern to fix the issue with the pagination; the data returns 8 items while the limit is 20 so multiply by 2.5 to make it 20 // this only happens for marketing pattern
      };
      const response = await fetchDataAction(dataQuery);
      if (response.status === 500) {
        throw new Error("Server error");
      }

      if (response.status === 404) {
        throw new Error("No data found");
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

      // IMPORTANT: Prioritize the response query over the override
      // This ensures that backend corrections (e.g., platform auto-switch) are applied
      const updatedQuery = {
        ...response.query, // Start with the corrected query from backend
        offset: response.pagination.pageSize * (response.pagination.page - 1),
        limit: response.pagination.pageSize,
        initialized: false,
        changed: false,
      };

      // Return both query and redirected info (if platform/pattern was auto-switched)
      return {
        query: updatedQuery,
        redirected: response.redirected,
      };
    },
    [pagination, setData, setPagination, setSuggestions],
  );

  return { fetchData };
}

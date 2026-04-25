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
        limit: pagination.limit, // Removed marketing * 2.5 hack — backend dedup in interleaveArrays now handles this correctly (Story 2.8a)
      };
      const response = await fetchDataAction(dataQuery);
      if (response.status === 500) {
        throw new Error("Server error");
      }

      if (response.status === 404) {
        throw new Error("No data found");
      }
      const dedupeById = (items: any[] = []) => {
        const seen = new Set<string | number>();
        return items.filter((item: any) => {
          const id = item?.id ?? item?.documentId;
          if (id === undefined) return true;
          if (seen.has(id)) return false;
          seen.add(id);
          return true;
        });
      };

      // Update the data in store
      if (isPagination) {
        setData(dedupeById([...(data || []), ...(response.data || [])]));
      } else {
        setData(dedupeById(response.data || []));
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
    [data, pagination, setData, setPagination, setSuggestions],
  );

  return { fetchData };
}

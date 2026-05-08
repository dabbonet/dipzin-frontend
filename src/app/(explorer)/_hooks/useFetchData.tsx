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

  // Strip v4 "attributes" wrapper from search results for v5-compatible frontend
  const cleanSearchData = (items: any[]): any[] => {
    if (!items || items.length === 0) return items;
    // Check if items have v4 format (attributes wrapper)
    if (items[0] && items[0].attributes) {
      return items.map((item: any) => ({
        ...item,
        ...item.attributes,
        // Flatten nested relations (v4 wraps in data.attributes)
        ...(item.attributes.app && item.attributes.app.data
          ? { app: { id: item.attributes.app.data.id, ...item.attributes.app.data.attributes } }
          : {}),
        ...(item.attributes.tags && item.attributes.tags.data
          ? { tags: item.attributes.tags.data.map((t: any) => ({ id: t.id, ...t.attributes })) }
          : {}),
        ...(item.attributes.components && item.attributes.components.data
          ? { components: item.attributes.components.data.map((c: any) => ({ id: c.id, ...c.attributes })) }
          : {}),
        ...(item.attributes.collections && item.attributes.collections.data
          ? { collections: item.attributes.collections.data.map((c: any) => ({ id: c.id, ...c.attributes })) }
          : {}),
        // Remove duplicate attributes
        attributes: undefined,
      }));
    }
    return items;
  };

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

      // Update the data in store (search-dipzin returns 'results', not 'data')
      const rawResults = response.results || response.data || [];
      const searchResults = cleanSearchData(rawResults);
      if (isPagination) {
        setData(dedupeById([...(data || []), ...searchResults]));
      } else {
        setData(dedupeById(searchResults));
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

import { useState, useEffect, useCallback } from "react";
import { getToken } from "@/lib/auth"; // Adjust the import path as needed

interface UseSearchDataParams {
  keyword: string;
  filterQuery: string;
  initialPageSize?: number;
}

export const useSearchData = ({
  keyword,
  filterQuery,
  initialPageSize = 10,
}: UseSearchDataParams) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchData = useCallback(
    async (offset: number, limit: number) => {
      setIsLoading(true);
      const response = await fetch("/api/search/get-screens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: getToken(),
          keyword,
          filters: filterQuery,
          offset,
          limit,
        }),
      });
      const result = await response.json();
      if (offset === 0) {
        setData(result.screens);
      } else {
        setData((prevData) => [...prevData, ...result.screens]);
      }
      setIsLoading(false);
      setOffset((prevOffset) => prevOffset + result.screens.length);
    },
    [keyword, filterQuery]
  );

  useEffect(() => {
    fetchData(0, initialPageSize);
  }, [fetchData, initialPageSize]);

  const loadMore = () => {
    fetchData(offset, initialPageSize);
  };

  return { data, isLoading, loadMore };
};

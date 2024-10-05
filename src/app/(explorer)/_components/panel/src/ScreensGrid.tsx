'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { Screen } from '@/components/Explorer/screen';
import { Spinner } from '@/components/UI/spinner';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { useFetchData } from '@/app/(explorer)/_hooks/useFetchData';
import { useUpdateUrlPart } from '@/app/(explorer)/_hooks/useUpdateUrlPart';

/** Move Footer outside of ScreensGrid */
const Footer = ({ context: { loading } }:any) => (
  loading ? <Spinner className="py-8 flex mx-auto" /> : null
);

/** Move itemContent outside of ScreensGrid */
const ItemContent = (_: number, screen: any) => (
  <Screen key={screen.id} screen={screen} />
);

const ScreensGrid = () => {
  const { query, data, setQuery } = useQuery();
  const { fetchData } = useFetchData();
  const [isLoading, setIsLoading] = useState(false);

  // Utility hook for URL update
  const updateUrlPart = useUpdateUrlPart();

  // Function to load data
  const loadData = useCallback(
    async (isPagination = false, updatedQuery = query) => {
      setIsLoading(true);
      try {
        const newQuery = await fetchData(isPagination, updatedQuery);
        if (newQuery.platform) setQuery(newQuery);
        if (!isPagination) {
          // Update the URL with the full query
          updateUrlPart(newQuery);
        }
      } catch (error) {
        // Handle error appropriately
        // Consider using a logging library or error tracking service
      } finally {
        setIsLoading(false);
      }
    },
    [fetchData, query, updateUrlPart, setQuery]
  );

  // Load more data for pagination
  const loadMoreData = useCallback(async () => {
    const newOffset = (query.offset ?? 0) + (query.limit ?? 10);
    const updatedQuery = { ...query, offset: newOffset };
    await loadData(true, updatedQuery);
  }, [query, loadData]);

  useEffect(() => {
    if (query.initialized || query.changed) {
      loadData(false, query);
    }
  }, [query, loadData]);

  if (!data || data.length === 0) return null;

  return (
    <VirtuosoGrid
      data={data}
      endReached={loadMoreData} // Trigger loadMoreData on reaching the end
      overscan={50}
      context={{ loading: isLoading }}
      totalCount={query.totalRecords}
      useWindowScroll
      itemContent={ItemContent}
      listClassName="size-full grid content-center gap-2 md:gap-6 pt-0 grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3"
      style={{ height: 100, width: '100%' }}
      className="mb-24"
      components={{
        Footer,
      }}
    />
  );
};

export default ScreensGrid;

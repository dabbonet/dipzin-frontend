'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { Screen } from '@/components/Explorer/screen';
import { Spinner } from '@/components/UI/spinner';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { useFetchData } from '@/app/(explorer)/_hooks/useFetchData';
import { useUpdateUrlPart } from '@/app/(explorer)/_hooks/useUpdateUrlPart';

/** Move Footer outside of ScreensGrid */
const Footer = ({ context: { loading } }: any) => (
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
  const [hasError, setHasError] = useState(false); // Track error state

  // Utility hook for URL update
  const updateUrlPart = useUpdateUrlPart();

  // Function to load data
  const loadData = useCallback(
    async (isPagination = false, updatedQuery = query) => {
      // Prevent loading if query has no meaningful data
      if (!updatedQuery.platform || !updatedQuery.pattern) {
        return;
      }

      setIsLoading(true);
      setHasError(false); // Reset error state before fetching
      try {
        const newQuery = await fetchData(isPagination, updatedQuery);
        if (!newQuery) {
          setHasError(true); // Trigger error UI if 500 response is received
          return; // Stop further processing
        }

        if (newQuery.platform) setQuery(newQuery);
        if (!isPagination && newQuery.status !== 500) {
          // Update the URL with the full query
          updateUrlPart(newQuery);
        }
      } catch (error) {
        setHasError(true); // Handle other errors
      } finally {
        setIsLoading(false);
      }
    },
    [fetchData, query, updateUrlPart, setQuery]
  );

  // Load more data for pagination
  const loadMoreData = useCallback(async () => {
    if (isLoading || hasError) return; // Prevent pagination if still loading or in error state
    const newOffset = (query.offset ?? 0) + (query.limit ?? 10);
    const updatedQuery = { ...query, offset: newOffset };
    await loadData(true, updatedQuery);
  }, [query, loadData, isLoading, hasError]);

  useEffect(() => {
    if ((query.initialized || query.changed) && !isLoading && !hasError) {
      loadData(false, query);
    }
  }, [query, loadData, isLoading, hasError]);

  // Fallback UI when there is an error
  if (hasError) {
    return <div>No data available</div>;
  }

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
      components={{ Footer }}
    />
  );
};

export default ScreensGrid;

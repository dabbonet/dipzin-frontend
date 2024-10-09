'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { useFetchData } from '@/app/(explorer)/_hooks/useFetchData';
import { useUpdateUrlPart } from '@/app/(explorer)/_hooks/useUpdateUrlPart';
import { cn } from '@/lib/utils';
import ScreensGrid from './ScreensGrid';
import AppsGrid from './AppsGrid';
import FlowsGrid from './FlowsGrid';

/**
 * Panel Component
 * - Handles data fetching, pagination, error handling, and loading state.
 * - Renders ScreensGrid and other UI based on the current query state.
 */
const Panel = () => {
  const {
    query, setQuery, data, pagination, setPagination
  } = useQuery();
  const { fetchData } = useFetchData();
  const updateUrlPart = useUpdateUrlPart();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [noData, setNoData] = useState(false);

  // Function to load data (fetch data and handle errors)
  const loadData = useCallback(
    async (isPagination = false, updatedQuery = query) => {
      if (!updatedQuery.platform || !updatedQuery.pattern) {
        return;
      }

      setIsLoading(true);
      setHasError(false);
      setNoData(false);

      try {
        const newQuery = await fetchData(updatedQuery, isPagination);

        if (newQuery) {
          // Set the new query and clear the 'changed' flag
          setQuery(newQuery);
          if (!isPagination) {
            updateUrlPart(newQuery); // Update URL when not paginating
          }
        }
      } catch (error) {
        const err = error as Error;
        if (err.message === 'No data found') {
          setNoData(true);
        } else {
          setHasError(true);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [fetchData, updateUrlPart, setQuery]
  );

  // Load more data for pagination
  const loadMoreData = useCallback(async () => {
    if (isLoading || hasError || noData) return;

    const newOffset = pagination.offset + pagination.limit;

    // Update pagination only if it has changed
    if (pagination.offset !== newOffset) {
      // Set the updated pagination directly
      setPagination({
        offset: newOffset,
        limit: pagination.limit,
        totalPages: pagination.totalPages,
        totalRecords: pagination.totalRecords,
      });
    }
    const updatedQuery = { ...query, offset: newOffset };

    await loadData(true, updatedQuery);
  }, [pagination, query, loadData, isLoading, hasError, noData, setPagination]);

  useEffect(() => {
    console.log(query)
    if ((query.initialized || query.changed) && !isLoading && !hasError) {
      loadData(false, query);
    }
  }, [query, isLoading, hasError, loadData]);

  // Fallback UI for errors
  if (hasError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  if (noData) {
    return (
      <div>
        No data found for the given query, and no further suggestions are available.
      </div>
    );
  }

  switch (query.pattern) {
    case 'marketing':
    case 'screens':
    case 'components':
      return (
        <div
          className={cn(
            'relative',
            (query?.apps?.length ?? 0) > 0 ? 'top-40' : 'top-28'
          )}
        >
          <ScreensGrid
            data={data}
            isLoading={isLoading}
            loadMoreData={loadMoreData}
          />
        </div>
      );
    case 'flows':
      return (
        <div
          className={cn(
            'relative',
            (query?.apps?.length ?? 0) > 0 ? 'top-32' : 'top-28'
          )}
        >
          <FlowsGrid
            data={data}
            isLoading={isLoading}
            loadMoreData={loadMoreData}
          />
        </div>
      );
    case 'apps':
      return (
        <div
          className={cn(
            'relative',
            (query?.apps?.length ?? 0) > 0 ? 'top-32' : 'top-28'
          )}
        >
          <AppsGrid
            data={data}
            isLoading={isLoading}
            loadMoreData={loadMoreData}
          />
        </div>
      );
    default:
      return null; // Handle invalid view
  }
};

export default Panel;

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { useFetchData } from '@/app/(explorer)/_hooks/useFetchData';
import { useUpdateUrlPart } from '@/app/(explorer)/_hooks/useUpdateUrlPart';
import { cn } from '@/lib/utils';
import ScreensGrid from './ScreensGrid';
import AppsGrid from './AppsGrid';
import FlowsGrid from './FlowsGrid';
import PanelHeader from './panel-header';

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
  const loadData = useCallback((isPagination = false, updatedQuery = query) => {
    if (!updatedQuery.platform || !updatedQuery.pattern) {
      return Promise.resolve();
    }

    setIsLoading(true);

    return fetchData(updatedQuery, isPagination)
      .then((newQuery) => {
        if (newQuery) {
          // Set the new query and clear the 'changed' flag
          setQuery(newQuery);
          if (!isPagination) {
            updateUrlPart(newQuery); // Update URL when not paginating
          }
        }
        return newQuery;
      })
      .catch((error) => {
        const err = error as Error;
        if (err.message === 'No data found') {
          setNoData(true);
        } else {
          setHasError(true);
        }
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchData, updateUrlPart, setQuery]);

  // Load more data for pagination
  const loadMoreData = useCallback(() => {
    if (isLoading || hasError || noData) return Promise.resolve();

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

    return loadData(true, updatedQuery);
  }, [pagination, query, loadData, isLoading, hasError, noData, setPagination]);

  useEffect(() => {
    if ((query.initialized || query.changed) && !isLoading && !hasError && !noData) {
      setHasError(false);
      setNoData(false);
      loadData(false, query);
    }
  }, [query, isLoading, hasError, loadData, noData]);

  return (
    <div
      className={cn(
        'relative max-w-[1920px] mx-auto',
        (query?.apps?.length ?? 0) > 0 ? 'top-32' : 'top-28'
      )}
    >
      <PanelHeader />
      {(() => {
        switch (query.pattern) {
          case 'marketing':
          case 'screens':
          case 'components':
            return (
              <ScreensGrid
                data={data}
                isLoading={isLoading}
                loadMoreData={loadMoreData}
              />
            );
          case 'flows':
            return (
              <FlowsGrid
                data={data}
                isLoading={isLoading}
                loadMoreData={loadMoreData}
              />
            );
          case 'apps':
            return (
              <AppsGrid
                data={data}
                isLoading={isLoading}
                loadMoreData={loadMoreData}
              />
            );
          default:
            return null; // Handle invalid view
        }
      })()}
      {noData && (
        <p className="text-center text-slate-500 text-lg font-semibold p-16 m-auto">
          No data found for the given query, and no further suggestions are available.
        </p>
      )}
      {hasError && (
        <p className="text-center text-slate-500 text-lg font-semibold p-16 m-auto">
          An error occurred while fetching data. Please try again later.
        </p>
      )}
    </div>
  );
};

export default Panel;

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

const Panel = () => {
  const {
    query, setQuery, data, pagination, setPagination
  } = useQuery();
  const { fetchData } = useFetchData();
  const updateUrlPart = useUpdateUrlPart();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [noData, setNoData] = useState(false);

  const loadData = useCallback(
    async (isPagination = false, updatedQuery = query) => {
      if (!updatedQuery.platform || !updatedQuery.pattern) {
        return Promise.resolve();
      }

      setIsLoading(true);

      try {
        const newQuery = await fetchData(updatedQuery, isPagination);

        if (newQuery) {
          setQuery(newQuery);
          if (!isPagination) {
            updateUrlPart(newQuery);
          }
        }

        setHasError(false);
        setNoData(false);

        return newQuery;
      } catch (error) {
        const err = error as Error;

        if (err.message === 'No data found') {
          setNoData(true);
        } else {
          setHasError(true);
        }

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchData, updateUrlPart, setQuery, query]
  );

  const loadMoreData = useCallback(() => {
    if (isLoading || hasError || noData) return Promise.resolve();

    const newOffset = pagination.offset + pagination.limit;

    if (pagination.offset !== newOffset) {
      setPagination({
        ...pagination,
        offset: newOffset,
      });
    }

    const updatedQuery = { ...query, offset: newOffset };

    return loadData(true, updatedQuery);
  }, [pagination, query, loadData, isLoading, hasError, noData, setPagination]);

  useEffect(() => {
    // If there's an error, do not try to load data unless the query has changed.
    if (hasError) return;

    if ((query.initialized || query.changed) && !isLoading) {
      loadData(false, query).catch(() => {
        // Errors are handled in loadData
      });
    }
  }, [query, isLoading, hasError, loadData]);

  // Reset error state if the query changes.
  useEffect(() => {
    setHasError(false);
  }, [query]);

  const renderContent = () => {
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
        return null;
    }
  };

  return (
    <div
      className={cn(
        'relative max-w-[1920px] mx-auto',
        (query?.apps?.length ?? 0) > 0 ? 'top-32' : 'top-28'
      )}
    >
      <PanelHeader />
      {renderContent()}
      {hasError && (
        <p className="text-center text-slate-500 text-lg font-semibold p-16 m-auto">
          An error occurred while fetching data. Please try again later.
        </p>
      )}
      {noData && (
        <p className="text-center text-slate-500 text-lg font-semibold p-16 m-auto">
          No data found for the given query.
        </p>
      )}
    </div>
  );
};

export default Panel;

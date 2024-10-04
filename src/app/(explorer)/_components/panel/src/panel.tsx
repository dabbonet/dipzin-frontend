'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { Screen } from '@/components/Explorer/screen';
import { Spinner } from '@/components/UI/spinner';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { cn } from '@/lib/utils';
import { useFetchData } from '@/app/(explorer)/_hooks/useFetchData';

const ScreensGrid = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { query, data, setQuery } = useQuery();
  const { fetchData } = useFetchData();

  // Function to load data (screens, apps, or flows)
  const loadData = async (isPagination = false, updatedQuery = query) => {
    setIsLoading(true);

    try {
      const fetchedQuery = await fetchData(isPagination, updatedQuery); // Fetch data based on the updated query
      if (!isPagination && fetchedQuery !== undefined) {
        setQuery(fetchedQuery); // Update query only on the first load
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more data for pagination
  const loadMoreData = useCallback(async () => {
    const newOffset = (query.offset ?? 0) + (query.limit ?? 10); // Ensure offset and limit are defined
    const updatedQuery = { ...query, offset: newOffset }; // Update the query's offset

    setQuery(updatedQuery); // Update the query in state for consistency

    await loadData(true, updatedQuery); // Pass updated query directly to loadData
  }, [query, setQuery, loadData]);

  useEffect(() => {
    // Prevent loading data multiple times on mount
    if (query.initialized) {
      loadData();
    }
  }, [query]);

  if (!data || data.length < 0) return null;

  // Define the Footer component outside of the render method
  const FooterComponent = () => {
    return isLoading ? <Spinner className="py-8 flex mx-auto" /> : null;
  };

  // Define the itemContent function outside of the render method
  const renderItemContent = (_:number, screen:any) => (
    <Screen key={screen.id} screen={screen} />
  );

  return (
    <VirtuosoGrid
      data={data}
      endReached={loadMoreData} // Trigger loadMoreData on reaching the end
      overscan={50}
      totalCount={query.totalRecords}
      useWindowScroll
      itemContent={renderItemContent}
      listClassName="size-full grid content-center gap-2 md:gap-6 pt-0 grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3"
      style={{ height: 100, width: '100%' }}
      className="mb-24"
      components={{
        Footer: FooterComponent,
      }}
    />
  );
};

const Panel = ({ pattern }: any) => {
  const { query } = useQuery();
  const renderScreensGrid = useCallback(() => <ScreensGrid />, []);

  switch (pattern) {
    case 'marketing':
    case 'screens':
    case 'components':
      return (
        <div className={cn('relative', (query?.apps?.length ?? 0) > 0 ? 'top-40' : 'top-28')}>
          {renderScreensGrid()}
        </div>
      );
    case 'flows':
      return <div>{/* UI for flows */}</div>;
    case 'apps':
      return (
        <div className={cn('relative', (query?.apps?.length ?? 0) > 0 ? 'top-32' : 'top-28')}>
          {renderScreensGrid()}
        </div>
      );
    default:
      return null; // Handle invalid view prop value
  }
};

export default Panel;

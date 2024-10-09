'use client';

import React from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { Screen } from '@/components/Shared/screen';
import { Spinner } from '@/components/UI/spinner';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';

const Footer = ({ context }: { context?: { loading: boolean } }) => (context?.loading ? <Spinner className="py-8 flex mx-auto" /> : null);

const ItemContent = (_: number, screen: any) => (
  <Screen key={screen.id} screen={screen} view="global" />
);

/**
 * ScreensGrid Component
 * - This component is responsible for rendering the grid of screens.
 * - It no longer handles data fetching; the data is passed via props.
 */
const ScreensGrid = ({ data, isLoading, loadMoreData }: any) => {
  const { pagination, query } = useQuery(); // Use query from useQuery hook

  if (!data || data.length === 0) return null;

  // Conditionally set listClassName based on query.platform
  const listClassName = query.platform !== 'web'
    ? 'size-full grid content-center gap-2 md:gap-6 pt-0 grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3'
    : 'size-full grid content-center gap-2 md:gap-6 pt-0 grid-cols-1 2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2';

  return (
    <VirtuosoGrid
      data={data}
      endReached={loadMoreData}
      overscan={50}
      context={{ loading: isLoading }}
      totalCount={pagination.totalRecords || 100} // Correctly use totalRecords
      useWindowScroll
      itemContent={ItemContent}
      listClassName={listClassName} // Apply the conditional className
      style={{ height: 100, width: '100%' }}
      className="mb-24"
      components={{ Footer }}
    />
  );
};

export default ScreensGrid;

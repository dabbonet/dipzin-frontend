'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { VirtuosoGrid } from 'react-virtuoso';
import { Spinner } from '@/components/UI/spinner';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import type { ScreenData } from '@/types/screen-types';
import { Screen } from '@/components/Shared/screen';

const Footer = ({ context }: { context?: { loading: boolean } }) => (
  context?.loading ? <Spinner className="pt-8 pb-16 flex mx-auto" /> : null
);

/**
 * Custom Item component for VirtuosoGrid
 * Applies different aspect ratios based on platform:
 * - Web screens: landscape ratio with min-height to fill consistently
 * - Mobile screens: portrait aspect ratio (9:16)
 */
const GridItem = ({ children, ...props }: any) => {
  const { query } = useQuery();
  
  // Web screens: use aspect-[16/10] and ensure consistent card height
  const aspectClass = query.platform === 'web'
    ? 'aspect-[16/10]'
    : 'aspect-[9/16]';
  
  return (
    <div className={`size-full ${aspectClass}`} {...props}>
      {children}
    </div>
  );
};

const ScreensGrid = ({ data, isLoading, loadMoreData }: any) => {
  const { pagination, query } = useQuery();
  const searchParams = useSearchParams();

  // Build href preserving current query params so dialog navigation doesn't lose filters
  const screenHref = (id: number) =>
    `/screen/${id}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  if (!data || data.length === 0) return null;

  const listClassName = query.platform !== 'web'
    ? 'size-full grid content-start gap-2 md:gap-6 pt-0 grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3'
    : 'size-full grid content-start gap-2 md:gap-6 pt-0 grid-cols-1 2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2';

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemContent = (_: number, screen: ScreenData) => (
    <Screen size="medium" screen={screen} href={screenHref(screen.id)} overlay={query.apps.length ? "global" : "default"} />
  );

  // Modified to pass the full data array to ItemContent
  const itemContentWrapper = (index: number, screen: ScreenData) => ItemContent(index, screen);

  return (
    <VirtuosoGrid
      data={data}
      endReached={loadMoreData}
      overscan={50}
      context={{ loading: isLoading }}
      totalCount={pagination.totalRecords || data.length}
      useWindowScroll
      itemContent={itemContentWrapper}
      listClassName={listClassName}
      style={{ height: "100dvh", width: '100%' }}
      components={{ Footer, Item: GridItem }}
    />
  );
};

export default ScreensGrid;

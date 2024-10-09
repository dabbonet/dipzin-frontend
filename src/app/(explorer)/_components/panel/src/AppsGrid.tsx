'use client';

import React from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { App } from '@/components/Shared/app';
import { Spinner } from '@/components/UI/spinner';
import type { AppType } from '@/types/app-types';

/** Footer for AppsGrid */
const Footer = ({ context: { loading } }: any) => (
  loading ? <Spinner className="py-8 flex mx-auto" /> : null
);

/** Item content logic for AppsGrid */
const ItemContent = (_: number, app: AppType) => (
  <App key={app.id} app={app} />
);

/**
 * AppsGrid Component
 * - Displays a grid of apps.
 * - Handles loading more data as the user scrolls.
 */
const AppsGrid = ({ data, isLoading, loadMoreData }: any) => {
  if (!data || data.length === 0) return null;
  console.log(data)
  return (
    <VirtuosoGrid
      data={data}
      endReached={loadMoreData} // Trigger loadMoreData when the end is reached
      overscan={50}
      context={{ loading: isLoading }}
      totalCount={data.length}
      useWindowScroll
      itemContent={ItemContent}
      listClassName="size-full grid content-center gap-2 md:gap-6 pt-0 grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3"
      style={{ height: 100, width: '100%' }}
      className="mb-24"
      components={{ Footer }}
    />
  );
};

export default AppsGrid;

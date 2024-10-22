'use client';

import React from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { Spinner } from '@/components/UI/spinner';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import type { ScreenData } from '@/types/screen-types';
import {
  Dialog, DialogTrigger, DialogContent
} from '@/components/UI/dialog';
import ScreenOverview from '@/components/Shared/screen/src/screen-overview/screen-overview';
import { Screen } from '@/components/Shared/screen';

const Footer = ({ context }: { context?: { loading: boolean } }) => (
  context?.loading ? <Spinner className="py-8 flex mx-auto" /> : null
);

const ItemContent = (_: number, screen: ScreenData, screens: ScreenData[]) => {
  // Find the index of the clicked screen in the array
  const initialIndex = screens.findIndex((s) => s.id === screen.id);

  return (
    <Dialog modal>
      <DialogTrigger>
        <Screen screen={screen} view="global" />
      </DialogTrigger>
      <DialogContent className="max-w-max p-0">
        <ScreenOverview
          key={screen.id}
          screens={screens}
          initialIndex={initialIndex}
        />
      </DialogContent>
    </Dialog>
  );
};
const ScreensGrid = ({ data, isLoading, loadMoreData }: any) => {
  const { pagination, query } = useQuery();

  if (!data || data.length === 0) return null;

  const listClassName = query.platform !== 'web'
    ? 'size-full grid content-center gap-2 md:gap-6 pt-0 grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3'
    : 'size-full grid content-center gap-2 md:gap-6 pt-0 grid-cols-1 2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2';

  // Modified to pass the full data array to ItemContent
  const itemContentWrapper = (index: number, screen: ScreenData) => ItemContent(index, screen, data);

  return (
    <VirtuosoGrid
      data={data}
      endReached={loadMoreData}
      overscan={50}
      context={{ loading: isLoading }}
      totalCount={pagination.totalRecords || 100}
      useWindowScroll
      itemContent={itemContentWrapper}
      listClassName={listClassName}
      style={{ height: 100, width: '100%' }}
      className="mb-24"
      components={{ Footer }}
    />
  );
};

export default ScreensGrid;

'use client';

import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Flow } from '@/components/Shared/flow';
import { Spinner } from '@/components/UI/spinner';
import { Dialog, DialogTrigger, DialogContent } from '@/components/UI/dialog';

/** Footer for FlowsGrid */
const Footer = ({ context: { loading } }: any) => (
  loading ? <Spinner className="py-8 flex mx-auto" /> : null
);

/** Item content logic for FlowsGrid */
const ItemContent = (_: number, flow: any) => (
  <Dialog modal>
    <DialogTrigger>
      <Flow key={flow.id} flow={flow} />
    </DialogTrigger>
    <DialogContent className="max-w-[80vw] p-0">
      <Flow key={flow.id} flow={flow} view="opened" />
    </DialogContent>
  </Dialog>
);

/**
 * FlowsGrid Component
 * - Displays a horizontally scrollable grid of flows.
 * - Handles loading more data as the user scrolls horizontally.
 */
const FlowsGrid = ({ data, isLoading, loadMoreData }: any) => {
  if (!data || data.length === 0) return null;
  return (
    <Virtuoso
      data={data}
      useWindowScroll
      // defaultItemHeight={200}
      endReached={loadMoreData} // Trigger loadMoreData when the end is reached
      // overscan={50}
      context={{ loading: isLoading }}
      itemContent={ItemContent}
      style={{ height: '100%', width: '100%' }}
      className="mb-24 size-full"
      components={{ Footer }}
    />
  );
};

export default FlowsGrid;

'use client';

import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Flow } from '@/components/Shared/flow';
import { Spinner } from '@/components/UI/spinner';

/** Footer for FlowsGrid */
const Footer = ({ context: { loading } }: any) => (
  loading ? <Spinner className="py-8 flex mx-auto" /> : null
);

/** Item content logic for FlowsGrid */
const ItemContent = (_: number, flow: any) => {
  const hasValidScreens = flow.flow_screens.some((screen: any) => screen.screen !== null);
  if (hasValidScreens) {
    return <Flow key={flow.id} flow={flow} view="default" />;
  }
  return null;
};

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
      style={{ height: '100vh', width: '100%' }}
      className="mb-24 size-full"
      components={{ Footer }}
    />
  );
};

export default FlowsGrid;

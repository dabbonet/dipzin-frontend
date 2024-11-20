'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { getInitialQueryWithSearchParams } from '@/app/(explorer)/_utils/initialQuery';
import useIsMobile from '@/hooks/useIsMobile';
import MobileNavigatorView from './mobile-navigator-view';
import DesktopNavigatorView from './desktop-navigator-view';

const Navigator = ({ initialQuery }: { initialQuery: any }) => {
  const isMobile = useIsMobile();
  const {
    query, setQuery, pagination
  } = useQuery();
  const searchParams = useSearchParams();

  const initialQueryWithSearchParams = getInitialQueryWithSearchParams(
    query,
    initialQuery,
    searchParams
  );

  useEffect(() => {
    if (!query.initialized && pagination.totalPages === 0) {
      setQuery({ ...query, ...initialQueryWithSearchParams, initialized: true });
    }
  }, []);

  if (isMobile === null) {
    return null
  }

  return (
    <>
      <MobileNavigatorView />
      <DesktopNavigatorView />
    </>
  )
};

export default Navigator;

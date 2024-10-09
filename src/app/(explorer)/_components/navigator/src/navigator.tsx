'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { getInitialQueryWithSearchParams } from '@/app/(explorer)/_utils/initialQuery';
import useIsMobile from '@/hooks/useIsMobile';
import MobileNavigatorView from './mobile-navigator-view';
import DesktopNavigatorView from './desktop-navigator-view';

const Navigator = ({ initialQuery }: { initialQuery: any }) => {
  const isMobile = useIsMobile();
  const { keyword, setKeyword } = useKeyword();
  const {
    query, setQuery, setPlatform, setPattern, setFilters, setApps
  } = useQuery();
  const { filters } = query || {};
  const searchParams = useSearchParams();

  const initialQueryWithSearchParams = getInitialQueryWithSearchParams(
    query,
    initialQuery,
    searchParams
  );
  const { platform, pattern } = initialQueryWithSearchParams;

  useEffect(() => {
    if (!query.initialized && query.totalPages === 0) {
      setQuery({ ...query, ...initialQueryWithSearchParams, initialized: true });
    }
  }, []);

  return isMobile ? (
    <MobileNavigatorView
      keyword={keyword}
      setKeyword={setKeyword}
      filters={filters}
      setFilters={setFilters}
      pattern={pattern}
      setPattern={setPattern}
      platform={platform}
      setPlatform={setPlatform}
      query={query}
      setApps={setApps}
    />
  ) : (
    <DesktopNavigatorView
      keyword={keyword}
      setKeyword={setKeyword}
      filters={filters}
      setFilters={setFilters}
      pattern={pattern}
      setPattern={setPattern}
      platform={platform}
      setPlatform={setPlatform}
      query={query}
      setApps={setApps}
    />
  )
};

export default Navigator;

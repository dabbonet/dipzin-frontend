'use client';

import React, { useEffect, useRef } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const isInitializedRef = useRef(false);
  const prevUrlRef = useRef<string>('');

  // Sync URL changes to query state
  // This runs when URL changes (e.g., browser back/forward, direct navigation)
  useEffect(() => {
    const currentUrl = pathname + '?' + searchParams.toString();
    
    // Skip if this is the first render (handled by the init effect below)
    if (!isInitializedRef.current) {
      return;
    }
    
    // Only sync if URL has actually changed
    if (prevUrlRef.current !== currentUrl) {
      // URL changed externally (browser navigation), sync query state
      const newQueryFromUrl = getInitialQueryWithSearchParams(
        { ...query, initialized: true },
        initialQuery,
        searchParams
      );
      
      // Check if the URL params differ from current query state
      const platformChanged = newQueryFromUrl.platform !== query.platform;
      const patternChanged = newQueryFromUrl.pattern !== query.pattern;
      const filtersChanged = JSON.stringify(newQueryFromUrl.filters) !== JSON.stringify(query.filters);
      
      if (platformChanged || patternChanged || filtersChanged) {
        // Update query state to match URL
        setQuery({
          ...query,
          platform: newQueryFromUrl.platform,
          pattern: newQueryFromUrl.pattern,
          filters: newQueryFromUrl.filters,
          apps: newQueryFromUrl.apps,
          change: platformChanged ? 'platform' : (patternChanged ? 'pattern' : 'filters'),
          changed: true,
          initialized: true,
        });
      }
      
      prevUrlRef.current = currentUrl;
    }
  }, [pathname, searchParams]);

  // Initial load - set query from URL params
  useEffect(() => {
    if (!isInitializedRef.current && !query.initialized && pagination.totalPages === 0) {
      const initialQueryWithSearchParams = getInitialQueryWithSearchParams(
        query,
        initialQuery,
        searchParams
      );
      setQuery({ ...query, ...initialQueryWithSearchParams, initialized: true });
      isInitializedRef.current = true;
      prevUrlRef.current = pathname + '?' + searchParams.toString();
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
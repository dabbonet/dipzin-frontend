// Navigator.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/Shared/input';
import { Switcher } from '@/components/Shared/switcher';
import { Suggestions } from '@/components/Explorer/suggestions';
import { AppPill } from '@/components/Explorer/selected-apps';
import { motion } from 'framer-motion';
import { NavigatorMenu } from './navigator-menu';
import {
  appData, patternSwitcherData, platformSwitcherData, suggestionsData
} from '@/components/mockdata';
import { useSearchParams } from "next/navigation";
import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { getInitialQueryWithSearchParams } from '@/app/(explorer)/_utils/initialQuery';
import type { Filter, Query } from '@/types/navigation-types';
import { useUpdateUrlPart } from '@/app/(explorer)/_hooks/useUpdateUrlPart';
import { updateStateAndUrl } from '@/app/(explorer)/_utils/updateStateAndUrl';

const Navigator = ({ initialQuery }: { initialQuery: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedApps] = useState([appData, appData]);
  const navigatorRef = useRef<HTMLDivElement>(null); // Ref to track the navigator

  const { keyword, setKeyword } = useKeyword();
  const { query, setQuery, setPlatform, setPattern, setFilters, setApps } = useQuery();
  const { filters } = query || {};
  const searchParams = useSearchParams();

  // Get the initial query with search params
  const initialQueryWithSearchParams = getInitialQueryWithSearchParams(query, initialQuery, searchParams);
  const { platform } = initialQueryWithSearchParams;
  const { pattern } = initialQueryWithSearchParams;

  // Utility hook for URL update
  const updateUrlPart = useUpdateUrlPart();


  // Only set the query once during initial load
  useEffect(() => {
    if (!query.initialized) {
      setQuery({ ...initialQueryWithSearchParams, initialized: true }); // Mark query as initialized
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (navigatorRef.current && !navigatorRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false); // Close the menu if clicking outside of the navigator
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Only run on mount

  // Helper function to update state and URL
  const handleStateAndUrlUpdate = (
    newPlatform?: string,
    newPattern?: string,
    newFilters?: Filter[] | ((currentFilters: Filter[]) => Filter[]),
    newApps?: any,
  ) => {
    updateStateAndUrl({
      newPlatform,
      newPattern,
      newFilters: typeof newFilters === 'function' ? newFilters(filters) : newFilters,
      newApps,
      setPlatform,
      setPattern,
      setFilters,
      setApps,
      updateUrlPart,
      query
    });
  };

  //  // Effect to synchronize URL with query after initialization
  //   useEffect(() => {
  //     if (query.initialized === undefined || query.initialized) {
  //       const newPlatform = query.platform;
  //       const newPattern = query.pattern;
  //       updateUrlPart(['platform', 'pattern'], { platform: newPlatform, pattern: newPattern, change: query.change });
  //     }
  //   }, [query]);


  const switcherState = isMenuOpen || (filters && filters.length > 0) ? "collapsed" : "open";

  return (
    <motion.nav
      ref={navigatorRef}
      key="navigator"
      className="size-full max-w-max lg:max-w-[70vw] bg-gradient-to-b from-slate-900/85 to-slate-900/60 rounded-[1.625rem] p-2.5 flex flex-col gap-4"
      initial={{ height: 'auto' }}
      animate={{ height: isMenuOpen ? 'auto' : 'auto' }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="w-full h-fit flex items-center gap-4">
        <Switcher
          value={pattern}
          onChange={(newPattern) => handleStateAndUrlUpdate(undefined, newPattern)}
          data={patternSwitcherData}
          state={switcherState}
        />
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsMenuOpen(true)}
          className="w-full shadow-none"
          type="search"
          placeholder={filters?.length > 0 ? "Search" : "Try Search"}
          autoComplete="off"
          selectedFilters={filters}
          setSelectedFilters={(updateFn) => handleStateAndUrlUpdate(undefined, undefined, updateFn)}
        />
        <Switcher
          value={platform}
          onChange={(newPlatform) => handleStateAndUrlUpdate(newPlatform)}
          data={platformSwitcherData}
          state={switcherState}
        />
      </div>

      {isMenuOpen && (
        <NavigatorMenu
          isMenuOpen={isMenuOpen}
          handleUpdate={(
            updateFn: (state: any) => any,
            target: keyof Query | any
          ) => {
            if (target === 'filters') {
              handleStateAndUrlUpdate(undefined, undefined, updateFn);
            } else if (target === 'apps') {
              handleStateAndUrlUpdate(undefined, undefined, undefined, updateFn(query.apps));
            }
          }}
        />
      )}

      {!isMenuOpen && query?.apps && query?.apps?.length > 0 && (
        <div className={`size-full flex flex-col lg:flex-row gap-4 ${isMenuOpen ? 'hidden' : 'flex'}`}>
          {query.apps?.map((app: any) => (
            <AppPill key={app?.slug} data={app} isFull={selectedApps.length < 2} />
          ))}
        </div>
      )}

      {!isMenuOpen && (!query?.apps || query?.apps?.length === 0) && (
        <div className={isMenuOpen ? 'hidden' : 'flex'}>
          <Suggestions
            suggestions={suggestionsData}
            selectedFilters={filters}
            setSelectedFilters={(updateFn) => handleStateAndUrlUpdate(undefined, undefined, updateFn(filters))}
          />
        </div>
      )}
    </motion.nav>
  );
};

export default Navigator;

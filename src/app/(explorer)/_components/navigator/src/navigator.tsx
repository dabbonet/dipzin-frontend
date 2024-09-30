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
import type { Filter } from '@/types/navigation-types';
import { combineFilters } from '@/app/(explorer)/_utils/filtersUtils';
import { useUpdateUrlPart } from '@/app/(explorer)/_hooks/useUpdateUrlPart';
import { updateStateAndUrl } from '@/app/(explorer)/_utils/updateStateAndUrl';

const Navigator = ({ initialQuery }: { initialQuery: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedApps] = useState([appData, appData]);
  const navigatorRef = useRef<HTMLDivElement>(null); // Ref to track the navigator

  const { keyword, setKeyword } = useKeyword();
  const { urlQuery, setUrlQuery, setPlatform, setPattern, filters, setFilters, setApps } = useQuery();
  const searchParams = useSearchParams();

  const initialQueryWithSearchParams = getInitialQueryWithSearchParams(urlQuery, initialQuery, searchParams);
  const combinedFilters = combineFilters(searchParams, urlQuery, filters);
  // Handle Platform and Pattern from initialQuery or urlQuery
  const platform = initialQueryWithSearchParams.platform;
  const pattern = initialQueryWithSearchParams.pattern;
  // Utility hook for URL update
  const updateUrlPart = useUpdateUrlPart();

  useEffect(() => {
    setUrlQuery(initialQueryWithSearchParams);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (navigatorRef.current && !navigatorRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false); // Close the menu if clicking outside of the navigator
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helper function to update state and URL
  const handleStateAndUrlUpdate = (
    newPlatform?: string,
    newPattern?: string,
    newFilters?: Filter[]
  ) => {
    updateStateAndUrl({
      newPlatform,
      newPattern,
      newFilters,
      setPlatform,
      setPattern,
      setFilters,
      setApps,
      updateUrlPart
    });
  };
  const switcherState = isMenuOpen || combinedFilters.length > 0 ? "collapsed" : "open";

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
          onChange={(newPattern) => handleStateAndUrlUpdate(undefined, newPattern, undefined)}
          data={patternSwitcherData}
          state={switcherState}
        />
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsMenuOpen(true)}
          className="w-full shadow-none"
          type="search"
          placeholder={filters.length > 0 ? "Search" : "Try Search"}
          autoComplete="off"
          selectedFilters={combinedFilters}
          setSelectedFilters={(updateFn) => handleStateAndUrlUpdate(undefined, undefined, updateFn(filters))}
        />
        <Switcher
          value={platform}
          onChange={(newPlatform) => handleStateAndUrlUpdate(newPlatform, undefined, undefined)}
          data={platformSwitcherData}
          state={switcherState}
        />
      </div>
      {isMenuOpen ? (
        <NavigatorMenu isMenuOpen={isMenuOpen} />
      ) : (
        <>
          {urlQuery.apps && urlQuery.apps.length > 0 ? (
            <div className={`size-full flex flex-col lg:flex-row gap-4 ${isMenuOpen ? 'hidden' : 'flex'}`}>
              {selectedApps.length > 0 &&
                selectedApps.map((app) => (
                  <AppPill key={app.name} data={app} isFull={selectedApps.length < 2} />
                ))}
            </div>
          ) : (
            <div className={isMenuOpen ? 'hidden' : 'flex'}>
              <Suggestions
                suggestions={suggestionsData}
                selectedFilters={combinedFilters}
                setSelectedFilters={(updateFn) => handleStateAndUrlUpdate(undefined, undefined, updateFn(filters))}
                />
            </div>
          )}
        </>
      )}
    </motion.nav>
  );
};

export default Navigator;

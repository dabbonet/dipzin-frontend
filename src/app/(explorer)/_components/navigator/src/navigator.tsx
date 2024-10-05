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
  patternSwitcherData,
  platformSwitcherData,
  suggestionsData,
} from '@/components/mockdata';
import { useSearchParams } from 'next/navigation';
import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { getInitialQueryWithSearchParams } from '@/app/(explorer)/_utils/initialQuery';
import type { Query } from '@/types/navigation-types';

const Navigator = ({ initialQuery }: { initialQuery: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigatorRef = useRef<HTMLDivElement>(null); // Ref to track the navigator

  const { keyword, setKeyword } = useKeyword();
  const {
    query, setQuery, setPlatform, setPattern, setFilters, setApps
  } = useQuery();
  const { filters } = query || {};
  const searchParams = useSearchParams();

  // Get the initial query with search params
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

    // Handle click outside to close menu
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navigatorRef.current
        && !navigatorRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false); // Close the menu if clicking outside of the navigator
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const switcherState = isMenuOpen || (filters && filters.length > 0) ? 'collapsed' : 'open';

  return (
    <motion.nav
      ref={navigatorRef}
      key="navigator"
      className="size-full max-w-max lg:max-w-[70vw] bg-gradient-to-b from-slate-900/85 to-slate-900/60 rounded-[1.625rem] p-2.5 flex flex-col gap-4"
      initial={{ height: 'auto' }}
      animate={{ height: isMenuOpen ? 'auto' : 'auto' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="w-full h-fit flex items-center gap-4">
        <Switcher
          value={pattern}
          onChange={(newPattern) => setPattern(newPattern)} // Update state directly
          data={patternSwitcherData}
          state={switcherState}
        />
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsMenuOpen(true)}
          className="w-full shadow-none"
          type="search"
          placeholder={filters?.length > 0 ? 'Search' : 'Try Search'}
          autoComplete="off"
          selectedFilters={filters}
          setSelectedFilters={setFilters} // Update filters directly
        />
        <Switcher
          value={platform}
          onChange={(newPlatform) => setPlatform(newPlatform)} // Update state directly
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
              setFilters(updateFn);
            } else if (target === 'apps') {
              setApps(updateFn(query.apps));
            }
          }}
        />
      )}

      {!isMenuOpen && query?.apps && query?.apps?.length > 0 && (
        <div
          className={`size-full flex flex-col lg:flex-row gap-4 ${
            isMenuOpen ? 'hidden' : 'flex'
          }`}
        >
          {query.apps?.map((app: any, index: number) => (
            <AppPill
              key={app.id || index}
              data={app}
              isFull={query.apps.length < 2}
            />
          ))}
        </div>
      )}

      {!isMenuOpen && (!query?.apps || query?.apps?.length === 0) && (
        <div className={isMenuOpen ? 'hidden' : 'flex'}>
          <Suggestions
            suggestions={suggestionsData}
            selectedFilters={filters}
            setSelectedFilters={setFilters} // Update filters directly
          />
        </div>
      )}
    </motion.nav>
  );
};

export default Navigator;

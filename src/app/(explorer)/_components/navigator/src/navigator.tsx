'use client';

import React, { useState, useEffect, useRef } from 'react';
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
import { Suggestions } from '@/components/Explorer/suggestions';
import { AppPill } from '@/components/Explorer/selected-apps';
import MobileNavigatorView from './mobile-navigator-view';
import DesktopNavigatorView from './desktop-navigator-view';
import useIsMobile from '@/hooks/useIsMobile';

const Navigator = ({ initialQuery }: { initialQuery: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigatorRef = useRef<HTMLDivElement>(null);
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

    const handleClickOutside = (event: MouseEvent) => {
      if (
        navigatorRef.current
        && !navigatorRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
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
      {isMobile ? (
        <MobileNavigatorView
          keyword={keyword}
          setKeyword={setKeyword}
          filters={filters}
          setFilters={setFilters}
          pattern={pattern}
          setPattern={setPattern}
          platform={platform}
          setPlatform={setPlatform}
          patternData={patternSwitcherData}
          platformData={platformSwitcherData}
          onInputFocus={() => setIsMenuOpen(true)}
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
          patternData={patternSwitcherData}
          platformData={platformSwitcherData}
          onInputFocus={() => setIsMenuOpen(true)}
          switcherState={switcherState}
        />
      )}

      {isMenuOpen && (
        <NavigatorMenu
          isMenuOpen={isMenuOpen}
          handleUpdate={(updateFn, target) => {
            if (target === 'filters') {
              setFilters(updateFn(query.filters));
            } else if (target === 'apps') {
              setApps(updateFn(query.apps));
            }
          }}
        />
      )}

      {!isMenuOpen && query?.apps && query?.apps?.length > 0 && (
        <div
          className={`size-full flex flex-col lg:flex-row gap-4 ${isMenuOpen ? 'hidden' : 'flex'}`}
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

      {!isMobile && !isMenuOpen && (!query?.apps || query?.apps?.length === 0) && (
        <div className={isMenuOpen ? 'hidden' : 'flex'}>
          <Suggestions
            suggestions={suggestionsData}
            selectedFilters={query.filters}
            setSelectedFilters={setFilters}
          />
        </div>
      )}
    </motion.nav>
  );
};

export default Navigator;

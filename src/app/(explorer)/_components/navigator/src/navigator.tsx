'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Suggestions } from '../suggestions';
import { AppPill } from '@/app/(explorer)/_components/navigator/selected-apps';
import MobileNavigatorView from './mobile-navigator-view';
import DesktopNavigatorView from './desktop-navigator-view';
import useIsMobile from '@/hooks/useIsMobile';

const Navigator = ({ initialQuery }: { initialQuery: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // New state to track hover
  const navigatorRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { keyword, setKeyword } = useKeyword();
  const {
    query, setQuery, setPlatform, setPattern, setFilters, setApps, pagination
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
    if (!query.initialized && pagination.totalPages === 0) {
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
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false
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

      {/* Show apps if present */}
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

      {/* Animate the Suggestions section */}
      <AnimatePresence>
        {!isMobile && (!isMenuOpen && (isHovered || !query?.apps || query?.apps?.length === 0)) && (
          <motion.div
            className={isMenuOpen ? 'hidden' : 'flex'}
            initial={{ opacity: 0, height: 0, y: -10 }} // Animate opacity and height
            animate={{ opacity: 1, height: 'auto', y: 0 }} // Animate in
            exit={{ opacity: 0, height: 0, y: -10 }} // Animate out
            transition={{ duration: 0.3 }} // Smooth animation
          >
            <Suggestions
              suggestions={suggestionsData}
              selectedFilters={query.filters}
              setSelectedFilters={setFilters}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigator;

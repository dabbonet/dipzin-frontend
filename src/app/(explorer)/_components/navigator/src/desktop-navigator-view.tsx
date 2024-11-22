"use client"

import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from '@/components/Shared/input';
import { Switcher } from '@/components/Shared/switcher';
import { NavigatorMenu } from './navigator-menu';
import { AppPill } from "@/app/(explorer)/_components/navigator/selected-apps";
import { Suggestions } from '@/app/(explorer)/_components/navigator/suggestions';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';
import { getPatternHandleForAPI } from '@/app/(explorer)/_utils/queryUtils';

const patterns = [
  { label: "Apps", value: "apps" },
  { label: "Screens", value: "screens" },
  { label: "Components", value: "components" },
  { label: "Marketing", value: "marketing" },
  { label: "Flows", value: "flows" },
];

const platforms = [
  { label: "IOS", value: "ios" },
  { label: "Android", value: "android" },
  { label: "Web", value: "web" },
];

const DesktopNavigatorView: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigatorRef = useRef<HTMLInputElement | null>(null);

  const { keyword, setKeyword } = useKeyword();
  const {
    query, setFilters, setApps, setPattern, suggestions, setPlatform
  } = useQuery();
  const { filters, platform, pattern } = query || {};

  const handleClickOutside = (event: MouseEvent) => {
    if (navigatorRef.current && !navigatorRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const switcherState = isMenuOpen || (filters && filters.length > 0) ? 'collapsed' : 'open';

  const correctedPattern = getPatternHandleForAPI(pattern);
  const mappedSuggestions = suggestions?.map((name: string) => ({
    name,
    pattern: correctedPattern,
  })) || [];

  return (
    <motion.div
      ref={navigatorRef}
      key="desktop-navigator"
      className="size-full max-w-[70vw] bg-gradient-to-b from-slate-900/85 to-slate-900/60 rounded-[1.625rem] p-2.5 hidden lg:flex flex-col gap-4"
      initial={{ height: 'auto' }}
      animate={{ height: isMenuOpen ? 'auto' : 'auto' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-fit flex items-center gap-4">
        <Switcher
          value={pattern}
          onChange={setPattern}
          data={patterns}
          state={switcherState}
        />
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsMenuOpen(true)}
          type="search"
          placeholder={filters?.length > 0 ? 'Search' : 'Try Search'}
          autoComplete="off"
          selectedFilters={filters}
          setSelectedFilters={(updateFn) => setFilters(updateFn)}
        />
        <Switcher
          value={platform}
          onChange={setPlatform}
          data={platforms}
          state="open"
        />
      </div>
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

      {!isMenuOpen && query?.apps?.length > 0 && (
        <div className="size-full flex gap-4">
          {query.apps.map((app: any, index: number) => (
            <AppPill
              key={app.id || index}
              data={app}
              isFull={query?.apps?.length === 1}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {!isMenuOpen && (isHovered || !query?.apps || query?.apps?.length === 0) && (
          <motion.div
            className={isMenuOpen ? 'hidden' : 'flex'}
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Suggestions
              suggestions={mappedSuggestions}
              selectedFilters={query.filters}
              setSelectedFilters={setFilters}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DesktopNavigatorView;

"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from '@/components/Shared/input';
import { Switcher } from '@/components/Shared/switcher';
import { NavigatorMenu } from './navigator-menu';
import { Suggestions } from '@/app/(explorer)/_components/navigator/suggestions';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';
import { useUpdateUrlPart } from '@/app/(explorer)/_hooks/useUpdateUrlPart';
import { getPatternHandleForAPI } from '@/app/(explorer)/_utils/queryUtils';
import { AppPill } from '../app-pill';
import useAppPill from '../app-pill/_hooks/useAppPill';

const patterns = [
  { label: 'Apps', value: 'apps' },
  { label: 'Screens', value: 'screens' },
  { label: 'Components', value: 'components' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Flows', value: 'flows' },
];

const platforms = [
  { label: 'IOS', value: 'ios' },
  { label: 'Android', value: 'android' },
  { label: 'Web', value: 'web' },
];

const DesktopNavigatorView: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigatorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { keyword, setKeyword } = useKeyword();
  const {
    query, setFilters, setApps, setPattern, suggestions, setPlatform
  } = useQuery();
  const updateUrlPart = useUpdateUrlPart();
  const { filters, platform, pattern } = query || {};

  const {
    allApps, hiddenAppSlugs, handleToggleVisibility, handleRemoveApp
  } = useAppPill({
    query,
    setApps,
    setPlatform,
  });

  // Handle platform change - update both state and URL immediately
  const handlePlatformChange = useCallback((newPlatform: string) => {
    setPlatform(newPlatform);
    // Update URL immediately to reflect the change
    updateUrlPart({
      ...query,
      platform: newPlatform,
      change: 'platform',
    });
  }, [query, setPlatform, updateUrlPart]);

  // Handle pattern change - update both state and URL immediately
  const handlePatternChange = useCallback((newPattern: string) => {
    setPattern(newPattern);
    // Update URL immediately to reflect the change
    updateUrlPart({
      ...query,
      pattern: newPattern,
      change: 'pattern',
    });
  }, [query, setPattern, updateUrlPart]);

  // Keyboard shortcut: Cmd+K / Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
          setIsMenuOpen(true);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
          onChange={handlePatternChange}
          data={patterns}
          state={switcherState}
        />
        <Input
          ref={inputRef}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsMenuOpen(true)}
          type="search"
          placeholder={filters?.length > 0 ? 'Search' : 'Try Search (⌘K)'}
          autoComplete="off"
          selectedFilters={filters}
          setSelectedFilters={(updateFn) => setFilters(updateFn)}
        />
        <Switcher
          value={platform}
          onChange={handlePlatformChange}
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

      {!isMenuOpen && allApps.length > 0 && (
      <div className="size-full flex gap-4">
        {allApps.map((app, index) => (
          app && app.slug ? (
            <AppPill
              key={app.id || index}
              data={app}
              isFull={allApps.length === 1}
              isHidden={hiddenAppSlugs.includes(app.slug)}
              onToggleVisibility={() => handleToggleVisibility(app.slug)}
              onRemove={() => handleRemoveApp(app.slug)}
            />
          ) : null
        ))}
      </div>
      )}

      <AnimatePresence>
        {!isMenuOpen && (isHovered || !allApps.length) && (
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

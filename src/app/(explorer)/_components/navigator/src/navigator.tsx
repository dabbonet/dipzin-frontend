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
import type { FilterType } from '@/types/navigation-types';
import { usePathname } from "next/navigation"
import { KeywordProvider, useKeyword } from '@/app/(explorer)/_hooks/useKeyword';

const NavigatorUI = () => {
  const [pattern, setPattern] = useState<string[]>(["Apps"]);
  const [platform, setPlatform] = useState<string[]>(["iOS"]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedApps] = useState([appData, appData]);
  const navigatorRef = useRef<HTMLDivElement>(null); // Ref to track the navigator
  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>([]);
  const pathName = usePathname();

  const { keyword, setKeyword } = useKeyword();

  useEffect(() => {
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

  const shouldShowNavigator = pathName.includes('/legal');

  // Return null if the condition is true
  if (shouldShowNavigator) {
    return null;
  }

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
        <Switcher value={pattern} onChange={setPattern} data={patternSwitcherData} state={isMenuOpen ? "collapsed" : "open"} />
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsMenuOpen(true)}
          className="w-full shadow-none"
          type="search"
          placeholder="Try Search"
          autoComplete="off"
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <Switcher value={platform} onChange={setPlatform} data={platformSwitcherData} state={isMenuOpen ? "collapsed" : "open"} />
      </div>
      {isMenuOpen
        ? (
          <NavigatorMenu
            isMenuOpen={isMenuOpen}
          />
        )
        : (
          <>
            <div className={`size-full flex flex-col lg:flex-row gap-4 ${isMenuOpen ? 'hidden' : 'flex'}`}>
              {selectedApps.length > 0 && selectedApps.map((app) => <AppPill key={app.name} data={app} isFull={selectedApps.length < 2} />)}
            </div>
            <div className={isMenuOpen ? 'hidden' : 'flex'}>
              <Suggestions suggestions={suggestionsData} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
            </div>
          </>
        )}
    </motion.nav>
  );
};

const Navigator = () => (
  <KeywordProvider>
    <NavigatorUI />
  </KeywordProvider>
)

export default Navigator;

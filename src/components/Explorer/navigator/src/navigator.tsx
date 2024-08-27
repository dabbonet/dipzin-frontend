'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/Shared/input';
import { Switcher } from '@/components/Shared/switcher';
import { Suggestions } from '../../suggestions';
import { AppPill } from '../../selected-apps';
import { motion } from 'framer-motion';
import { NavigatorMenu } from '@/components/Explorer/navigator';
import {
  appData, mockData, patternSwitcherData, platformSwitcherData, suggestionsData
} from './mockdata';

const Navigator = () => {
  const [pattern, setPattern] = useState<string[]>(["Apps"]);
  const [platform, setPlatform] = useState<string[]>(["iOS"]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>(["avatar"]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedApps] = useState([appData, appData]);
  const navigatorRef = useRef<HTMLDivElement>(null); // Ref to track the navigator

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState(mockData);

  // Effect to filter results based on search query
  useEffect(() => {
    if (searchQuery) {
      const filteredResults = mockData.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchResults(filteredResults);
    } else {
      setSearchResults(mockData);
    }
  }, [searchQuery, searchResults]);

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

  return (
    <motion.nav
      ref={navigatorRef}
      key="navigator"
      className="w-[80vw] top-[10%] -translate-x-1/2 absolute bg-[#0F172AA6]/65 rounded-[1.625rem] p-4 flex flex-col gap-4"
      initial={{ height: 'auto' }}
      animate={{ height: isMenuOpen ? 'auto' : 'auto' }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="w-full h-fit flex items-center gap-4">
        <Switcher value={pattern} onChange={setPattern} data={patternSwitcherData} state={isMenuOpen ? "collapsed" : "open"} />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsMenuOpen(true)}
          className="w-full shadow-none"
          type="search"
          placeholder="Try Search"
        />
        <Switcher value={platform} onChange={setPlatform} data={platformSwitcherData} state={isMenuOpen ? "collapsed" : "open"} />
      </div>
      {isMenuOpen
        ? (
          <NavigatorMenu isMenuOpen={isMenuOpen} searchQuery={searchQuery} />
        )
        : (
          <>
            <div className={`size-full flex flex-col lg:flex-row gap-4 ${isMenuOpen ? 'hidden' : 'flex'}`}>
              {selectedApps.length > 0 && selectedApps.map((app) => <AppPill key={app.name} data={app} isFull={selectedApps.length < 2} />)}
            </div>
            <div className={isMenuOpen ? 'hidden' : 'flex'}>
              <Suggestions suggestions={suggestionsData} selected={selectedSuggestions} setSelected={setSelectedSuggestions} />
            </div>
          </>
        )}
    </motion.nav>
  );
};

export default Navigator;

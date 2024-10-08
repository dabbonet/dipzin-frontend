import React from 'react';
import { Input } from '@/components/Shared/input';
import { Switcher } from '@/components/Shared/switcher';

interface DesktopNavigatorViewProps {
  keyword: string;
  setKeyword: (value: string) => void;
  filters: any[];
  setFilters: (filters: any[]) => void;
  pattern: string;
  setPattern: (pattern: string) => void;
  platform: string;
  setPlatform: (platform: string) => void;
  patternData: { label: string; value: string }[];
  platformData: { label: string; value: string }[];
  onInputFocus: () => void;
  switcherState: 'collapsed' | 'open';
}

const DesktopNavigatorView: React.FC<DesktopNavigatorViewProps> = ({
  keyword,
  setKeyword,
  filters,
  setFilters,
  pattern,
  setPattern,
  platform,
  setPlatform,
  patternData,
  platformData,
  onInputFocus,
  switcherState,
}) => (
  <div className="w-full h-fit flex items-center gap-4">
    <Switcher
      value={pattern}
      onChange={setPattern}
      data={patternData}
      state={switcherState}
    />
    <Input
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      onFocus={onInputFocus}
      className="w-full shadow-none"
      type="search"
      placeholder={filters?.length > 0 ? 'Search' : 'Try Search'}
      autoComplete="off"
      selectedFilters={filters}
      setSelectedFilters={setFilters}
    />
    <Switcher
      value={platform}
      onChange={setPlatform}
      data={platformData}
      state={switcherState}
    />
  </div>
);

export default DesktopNavigatorView;

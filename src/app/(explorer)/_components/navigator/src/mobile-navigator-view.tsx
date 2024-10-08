import React from 'react';
import { Input } from '@/components/Shared/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";

interface MobileNavigatorViewProps {
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
}

const MobileNavigatorView: React.FC<MobileNavigatorViewProps> = ({
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
}) => (
  <div className="flex flex-col gap-4 w-full">
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
    <div className="flex gap-4">
      <Select value={pattern} onValueChange={setPattern}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select pattern" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {patternData.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={platform} onValueChange={setPlatform}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {platformData.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default MobileNavigatorView;

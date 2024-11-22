import React from 'react';
import { Pill } from '@/components/Shared/pill';
import type { Filter } from '@/types/navigation-types';
import { Label } from '@/components/UI/label';
import { Skeleton } from '@/components/UI/skeleton';

type SuggestionsProps = {
  suggestions: Filter[];
  selectedFilters: Filter[];
  setSelectedFilters: (updateFn: (currentFilters: Filter[]) => Filter[]) => void;
};

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  selectedFilters,
  setSelectedFilters,
}) => {
  const handleSelection = (name: string) => {
    const selectedSuggestion = suggestions.find((suggestion) => suggestion.name === name);
    if (selectedSuggestion) {
      setSelectedFilters(() => [...selectedFilters, selectedSuggestion]);
    }
  };

  return (
    <div className="w-full h-fit flex flex-col md:flex-row md:items-center gap-3  ">
      <Label className="size-fit  px-4 rounded-full bg-transparent text-sm font-semibold text-white">
        Suggestions
      </Label>
      <ul className="w-full h-fit flex items-center gap-3 px-3 md:px-0 overflow-x-auto scrollbar-hide">
        {!suggestions.length ? (
          Array.from({ length: 10 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} className="w-24 h-7 shrink-0 bg-slate-800 rounded-full" />
          ))
        ) : (
          suggestions.map((suggestion) => (
            <Pill
              state="suggestion"
              className="cursor-pointer"
              onClick={() => handleSelection(suggestion.name)}
              key={suggestion.name}
            >
              {suggestion.name}
            </Pill>
          ))
        )}
      </ul>
    </div>
  );
};

export default Suggestions;

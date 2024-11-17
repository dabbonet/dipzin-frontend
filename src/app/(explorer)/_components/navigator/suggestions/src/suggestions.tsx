import React from 'react';
import { Pill } from '@/components/Shared/pill';
import type { Filter } from '@/types/navigation-types';
import { Label } from '@/components/UI/label';

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
    <div className="w-full h-fit flex flex-col md:flex-row md:items-center gap-3 font-outfit">
      <Label className="size-fit  px-4 rounded-full bg-transparent text-sm font-semibold text-white">
        Suggestions
      </Label>
      <ul className="w-full h-fit flex items-center gap-3 px-3 md:px-0 overflow-x-auto scrollbar-hide">
        {suggestions.map((suggestion) => (
          <Pill
            state="suggestion"
            className="cursor-pointer"
            onClick={() => handleSelection(suggestion.name)}
            key={suggestion.name}
          >
            {suggestion.name}
          </Pill>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;

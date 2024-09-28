import React from 'react';
import { Pill } from '@/components/Shared/pill';
import type { Filter } from '@/types/navigation-types';

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
  const handleSelection = (id: string) => {
    const selectedSuggestion = suggestions.find((suggestion) => suggestion.name === id);
    if (selectedSuggestion) {
      setSelectedFilters(() => [...selectedFilters, selectedSuggestion]);
    }
  };

  return (
    <ul className="w-full h-fit flex items-center gap-3 font-outfit">
      <span className="size-fit  px-4 rounded-full bg-transparent text-sm font-semibold text-white">
        Suggestions
      </span>
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
  );
};

export default Suggestions;

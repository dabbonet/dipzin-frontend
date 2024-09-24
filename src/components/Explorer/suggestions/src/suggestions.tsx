import React from 'react';
import { Pill } from '@/components/Shared/pill';
import type { FilterType } from '@/types/navigation-types';

type Suggestion = {
  name: string;
  id: string;
};

type SuggestionsProps = {
  suggestions: Suggestion[];
  selectedFilters: FilterType[];
  setSelectedFilters: (selected: Suggestion[]) => void;
};

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  selectedFilters,
  setSelectedFilters,
}) => {
  const handleSelection = (id: string) => {
    const selectedSuggestion = suggestions.find((suggestion) => suggestion.id === id);
    if (selectedSuggestion) {
      setSelectedFilters([...selectedFilters, selectedSuggestion]);
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
          onClick={() => handleSelection(suggestion.id)}
          key={suggestion.id}
        >
          {suggestion.name}
        </Pill>
      ))}
    </ul>
  );
};

export default Suggestions;

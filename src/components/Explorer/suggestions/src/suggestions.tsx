import React from 'react';
import { Pill } from '@/components/Shared/pill';

type Suggestion = {
  label: string;
  id: string;
};

type SuggestionsProps = {
  suggestions: Suggestion[];
  selected: Suggestion['id'][];
  setSelected: (selected: Suggestion['id'][]) => void;
};

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  selected,
  setSelected,
}) => {
  const handleSelection = (id: string) => {
    const isSelected = selected.includes(id);
    let updatedSelected;

    if (isSelected) {
      updatedSelected = selected.filter((selectedId) => selectedId !== id);
    } else {
      updatedSelected = [...selected, id];
    }

    setSelected(updatedSelected);
  };

  return (
    <ul className="w-full h-fit flex items-center p-2 gap-3 font-outfit">
      <span className="size-fit py-2 px-4 rounded-full bg-transparent text-sm font-semibold text-white">
        suggestions
      </span>
      {suggestions.map((suggestion) => (
        <Pill
          state="suggestion"
          className="cursor-pointer"
          onClick={() => handleSelection(suggestion.id)}
          key={suggestion.id}
        >
          {suggestion.label}
        </Pill>
      ))}
    </ul>
  );
};

export default Suggestions;

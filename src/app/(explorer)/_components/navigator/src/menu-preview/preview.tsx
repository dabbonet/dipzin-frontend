import React from 'react';
import SearchContent from './search-content';
import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';
import CategoriesContent from './categories-content';
import { NavigatorMenuInitialContent } from './Initial-content';
import type { Filter } from '@/types/navigation-types';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';

type NavigatorMenuPreviewProps = {
  searchResults?: any;
};

export const NavigatorMenuPreview: React.FC<NavigatorMenuPreviewProps> = () => {
  const { selectedResult, suggestedSearch } = useKeyword();
  const {
    setFilters
  } = useQuery();

  // Refactored handleStateAndUrlUpdate function
  const handleStateAndUrlUpdate = (pattern: string, value: string) => {
    const newFilter: Filter = { name: value, pattern };
    setFilters((prevFilters) => [...prevFilters, newFilter]);
  };

  return (
    <div className="w-[70%] max-h-[50vh] rounded-[30px] p-2 bg-[#1A2333]">
      {!selectedResult && (
        <NavigatorMenuInitialContent
          data={suggestedSearch}
          handleUpdate={handleStateAndUrlUpdate}
        />
      )}

      {selectedResult && selectedResult.blockType === 'list' && (
        <CategoriesContent
          selectedResult={selectedResult}
          suggestedSearch={suggestedSearch}
          handleUpdate={handleStateAndUrlUpdate}
        />
      )}

      {selectedResult && selectedResult.blockType !== 'list' && (
        <SearchContent selectedResult={selectedResult} />
      )}
    </div>
  );
};

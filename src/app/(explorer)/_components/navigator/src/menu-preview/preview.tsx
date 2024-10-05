import React from 'react';
import SearchContent from './search-content';
import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';
import CategoriesContent from './categories-content';
import { NavigatorMenuInitialContent } from './Initial-content';
import type { Filter } from '@/types/navigation-types';
import { updateStateAndUrl } from '@/app/(explorer)/_utils/updateStateAndUrl';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { useUpdateUrlPart } from '@/app/(explorer)/_hooks/useUpdateUrlPart';

type NavigatorMenuPreviewProps = {
  searchResults?: any;
};

export const NavigatorMenuPreview: React.FC<NavigatorMenuPreviewProps> = () => {
  const { selectedResult, suggestedSearch } = useKeyword();
  const {
    query, setPlatform, setPattern, setFilters, setApps
  } = useQuery();
  // Utility hook for URL update
  const updateUrlPart = useUpdateUrlPart();
  // Helper function to update state and URL
  const handleStateAndUrlUpdate = (
    newPlatform?: string,
    newPattern?: string,
    newFilters?: Filter[]
  ) => {
    updateStateAndUrl({
      newPlatform,
      newPattern,
      newFilters: query.filters ? [...query.filters, ...(newFilters || [])] : newFilters,
      setPlatform,
      setPattern,
      setFilters,
      setApps,
      updateUrlPart,
      query
    });
  };
  // Log when selectedResult changes

  // if(!selectedResult) return null;
  return (
    <div className="w-[70%] max-h-[50vh] rounded-[30px] p-2 bg-[#1A2333]">
      {!selectedResult
          && <NavigatorMenuInitialContent data={suggestedSearch} handleUpdate={handleStateAndUrlUpdate} />}

      {selectedResult && selectedResult.blockType === "list"
          && <CategoriesContent selectedResult={selectedResult} suggestedSearch={suggestedSearch} handleUpdate={handleStateAndUrlUpdate} />}

      {selectedResult && selectedResult.blockType !== "list"
          && <SearchContent selectedResult={selectedResult} />}
    </div>
  )
}

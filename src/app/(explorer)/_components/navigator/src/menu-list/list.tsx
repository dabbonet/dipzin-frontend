import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';
import { NavigatorMenuItem } from './list-item';
import React from 'react';
import { getItemDescription, getNavigatorListIcon } from '@/app/(explorer)/_utils/keywordUtils';
import type { Category } from '@/types/navigation-types';

const categories: Category[] = [
  { id: "appCategories", name: "App Categories", icon: { imgSrc: "/assets/icons/app-categories.svg", width: 40, height: 40 }, blockType: "list" },
  { id: "tagCategories", name: "Screens", icon: { imgSrc: "/assets/icons/screens.svg", width: 40, height: 40 }, blockType: "list" },
  { id: "marketingCategories", name: "Marketing Pages", icon: { imgSrc: "/assets/icons/marketing-pages.svg", width: 40, height: 40 }, blockType: "list" },
  { id: "componentCategories", name: "Components", icon: { imgSrc: "/assets/icons/components.svg", width: 40, height: 40 }, blockType: "list" },
  { id: "flowCategories", name: "Flows", icon: { imgSrc: "/assets/icons/flows.svg", width: 40, height: 40 }, blockType: "list" }
];

export const NavigatorMenuList: React.FC = () => {
  const { results, keyword, selectedResult, setSelectedResult } = useKeyword();
  const searchResults = results?.hits || [];
  const hasKeyword = Boolean(keyword);

  // Early return if no keyword and no categories available
  if (!hasKeyword && categories.length === 0) {
    return <div>No categories available</div>;
  }
  const handleMouseEnter = (item:any) => {
    if (selectedResult?.id !== item.id) {
        setSelectedResult(item);
    }
};
  return (
    <div className="w-[30%] max-h-[50vh] rounded-[30px] p-4 flex flex-col gap-4 bg-[#1A2333] overflow-y-scroll scrollbar-hide">
      {/* Render search results if keyword is present */}
      {hasKeyword ? (
        searchResults.length > 0 ? (
          searchResults.map((result: any) => (
            <NavigatorMenuItem
              key={`search-result-${result._meilisearch_id || result.id}`}
              label={result.name}
              description={getItemDescription(result)}
              avatar={getNavigatorListIcon(result)}
              onMouseEnter={() => handleMouseEnter(result)}
              isSearchResult
            />
          ))
        ) : (
          <div>No results found</div>
        )
      ) : (
        // Render categories when no keyword is provided
        categories.map((category: Category) => {
          
          return (
          <div>
            
            <NavigatorMenuItem
              key={category.id}
              label={category.name}
              icon={category.icon}
              showArrow
              onMouseEnter={() => handleMouseEnter(category)}
            />
            </div>
        )}
      )
        
      )}
    </div>
  );
};


import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';
import { NavigatorMenuItem } from './list-item';
import React from 'react';
import { getItemDescription, getNavigatorListIcon } from '@/app/(explorer)/_utils/keywordUtils';
import type { Category } from '@/types/navigation-types';

const categories: Category[] = [
  { name: "App Categories", icon: { imgSrc: "/assets/icons/app-categories.svg", width: 40, height: 40 }, blockType: "list" },
  { name: "Screens", icon: { imgSrc: "/assets/icons/screens.svg", width: 40, height: 40 }, blockType: "grid" },
  { name: "Marketing Pages", icon: { imgSrc: "/assets/icons/marketing-pages.svg", width: 40, height: 40 }, blockType: "list" },
  { name: "Elements", icon: { imgSrc: "/assets/icons/components.svg", width: 40, height: 40 }, blockType: "grid" },
  { name: "Flows", icon: { imgSrc: "/assets/icons/flows.svg", width: 40, height: 40 }, blockType: "list" },
];

export const NavigatorMenuList: React.FC = () => {
  const { results, keyword, setSelectedResult } = useKeyword();
  const searchResults = results?.hits || [];
  return (
    <div className="w-[30%] max-h-[50vh] rounded-[30px] p-4 flex flex-col gap-4 bg-[#1A2333] overflow-y-scroll scrollbar-hide">
      {keyword && searchResults.length === 0
      ? <div>No results found</div>
      : searchResults && searchResults.length > 0
      ? searchResults.map((result: any) => (
        <NavigatorMenuItem
          key={`search-result-${result._meilisearch_id || result.id}`}
          label={result.name}
          description={getItemDescription(result)}
          avatar={getNavigatorListIcon(result)}
          onMouseEnter={() => setSelectedResult(result)}
          isSearchResult
        />
      ))
      : categories.map(
        (category: {
        name: string;
        icon: { imgSrc: string; width: number; height: number } | undefined;
        }) => (
        <NavigatorMenuItem
          key={`category-${category.name}`}
          label={category.name}
          icon={category.icon}
          showArrow
          onMouseEnter={() => console.log('clicked')}
        />
        )
      )}
    </div>
  )
}

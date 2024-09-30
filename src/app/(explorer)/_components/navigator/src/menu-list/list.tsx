import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';
import { NavigatorMenuItem } from './list-item';
import React from 'react';
import { getItemDescription, getNavigatorListIcon } from '@/app/(explorer)/_utils/keywordUtils';
import type { Category, Query } from '@/types/navigation-types';

const categories: Category[] = [
  {
    id: "appCategories", name: "App Categories", icon: { imgSrc: "/assets/icons/app-categories.svg", width: 40, height: 40 }, blockType: "list"
  },
  {
    id: "tagCategories", name: "Screens", icon: { imgSrc: "/assets/icons/screens.svg", width: 40, height: 40 }, blockType: "list"
  },
  {
    id: "marketingCategories", name: "Marketing Pages", icon: { imgSrc: "/assets/icons/marketing-pages.svg", width: 40, height: 40 }, blockType: "list"
  },
  {
    id: "componentCategories", name: "Components", icon: { imgSrc: "/assets/icons/components.svg", width: 40, height: 40 }, blockType: "list"
  },
  {
    id: "flowCategories", name: "Flows", icon: { imgSrc: "/assets/icons/flows.svg", width: 40, height: 40 }, blockType: "list"
  }
];

type NavigatorMenuListProps = {
  handleUpdate: (updateFn: ((state: any) => any), target: keyof Query | any) => void;
};

export const NavigatorMenuList: React.FC<NavigatorMenuListProps> = ({ handleUpdate }) => {
  const {
    results, keyword, selectedResult, setSelectedResult
  } = useKeyword();
  const searchResults = results?.hits || [];
  const hasKeyword = Boolean(keyword);

  // Early return if no keyword and no categories available
  if (!hasKeyword && categories.length === 0) {
    return <div>No categories available</div>;
  }

  const handleMouseEnter = (item: any) => {
    if (selectedResult?.id !== item.id) {
      setSelectedResult(item);
    }
  };

  const handleMouseClick = (result: any) => {
    if (result.type === 'app') {
      handleUpdate((prev: any) => [...prev, { name: result.name, slug: result.slug }], 'apps');
    } else {
      handleUpdate((prev: any) => [...prev, { name: result.name, pattern: result.type }], 'filters');
    }
  };

  if (hasKeyword) {
    if (searchResults.length > 0) {
      return (
        <div className="w-[30%] max-h-[50vh] rounded-[30px] p-4 flex flex-col gap-4 bg-[#1A2333] overflow-y-scroll scrollbar-hide">
          {searchResults.map((result: any) => {
            const searchKey = result.meilisearchId || result.id; // Avoiding dangling '_'
            return (
              <NavigatorMenuItem
                key={`search-result-${searchKey}`}
                label={result.name}
                description={getItemDescription(result)}
                avatar={getNavigatorListIcon(result)}
                onMouseEnter={() => handleMouseEnter(result)}
                onClick={() => handleMouseClick(result)}
                isSearchResult
              />
            );
          })}
        </div>
      );
    }
    return <div>No results found</div>;
  }
  return (
    <div className="w-[30%] max-h-[50vh] rounded-[30px] p-4 flex flex-col gap-4 bg-[#1A2333] overflow-y-scroll scrollbar-hide">
      {categories.map((category: Category) => (
        <div key={category.id}>
          <NavigatorMenuItem
            label={category.name}
            icon={category.icon}
            showArrow
            onClick={() => handleMouseEnter(category)}
          />
        </div>
      ))}
    </div>
  );
};

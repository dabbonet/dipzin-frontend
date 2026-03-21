import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';
import { NavigatorMenuItem } from './list-item';
import React, { useState, useEffect } from 'react';
import { getItemDescription, getNavigatorListIcon } from '@/app/(explorer)/_utils/keywordUtils';
import type { Category, Query } from '@/types/navigation-types';
import { singularToPlural } from '@/app/(explorer)/_utils/queryUtils';
import ListItemSkeleton from './list-item-skeleton';
import useSearchHistory, { type SearchHistoryItem } from '@/hooks/useSearchHistory';
import { Icon } from '@/components/UI/icon';

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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const {
    results, keyword, selectedResult, setSelectedResult
  } = useKeyword();
  const { searchHistory, addToHistory, removeFromHistory, clearHistory } = useSearchHistory();
  const searchResults = results?.hits || [];
  const hasKeyword = Boolean(keyword);
  const [isClient, setIsClient] = useState(false);

  // Track client-side mount to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

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
    // Add to search history
    addToHistory({ name: result.name, type: result.type });

    if (result.type === 'app') {
      handleUpdate((prev: any) => {
        const isAppSelected = prev.some((selectedApp: any) => selectedApp.name === result.name);
        if (!isAppSelected) {
          return [...prev, { ...result }];
        }
        return prev;
      }, 'apps');
    } else {
      const pattern = singularToPlural(result.type);
      handleUpdate((prev: any) => [...prev, { name: result.name, pattern }], 'filters');
    }
  };

  const handleHistoryClick = (item: SearchHistoryItem) => {
    // Re-search for the history item
    if (item.type === 'app') {
      handleUpdate((prev: any) => {
        const isAppSelected = prev.some((selectedApp: any) => selectedApp.name === item.name);
        if (!isAppSelected) {
          return [...prev, { name: item.name, type: item.type }];
        }
        return prev;
      }, 'apps');
    } else {
      const pattern = singularToPlural(item.type);
      handleUpdate((prev: any) => [...prev, { name: item.name, pattern }], 'filters');
    }
  };

  if (hasKeyword) {
    if (!results) {
      // Show loading skeleton when results are not yet available
      return (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItemSkeleton key={index} />
          ))}
        </>
      );
    } if (searchResults.length > 0) {
      return (
        <>
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
        </>
      );
    }
    // Show "No results found" message when there are no search results
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        <Icon.Search className="size-12 text-slate-600" />
        <p className="text-slate-500 font-semibold text-lg">No results found</p>
        <p className="text-slate-600 text-sm">Try a different search term</p>
      </div>
    );
  }

  // Show search history if available (client-side only to avoid hydration mismatch)
  const showHistory = isClient && searchHistory.length > 0;

  return (
    <>
      {/* Search History Section */}
      {showHistory && (
        <div className="mb-2">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs text-slate-500 font-medium">Recent Searches</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearHistory();
              }}
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              Clear
            </button>
          </div>
          {searchHistory.slice(0, 5).map((item) => (
            <button
              key={`history-${item.name}-${item.type}`}
              type="button"
              className="w-full rounded-2xl flex items-center justify-between transition-colors bg-[#1A2333] md:bg-transparent hover:text-white/80 hover:bg-slate-700/60 p-4 gap-3"
              onClick={() => handleHistoryClick(item)}
            >
              <div className="flex items-center gap-3">
                <Icon.Clock className="size-4 text-slate-500" />
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs text-slate-500 capitalize">{item.type}</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromHistory(item.name, item.type);
                }}
                className="text-slate-600 hover:text-slate-400 transition-colors"
              >
                <Icon.Close className="size-4" />
              </button>
            </button>
          ))}
        </div>
      )}

      {/* Categories */}
      {categories.map((category: Category) => (
        <div key={category.name}>
          <NavigatorMenuItem
            label={category.name}
            icon={category.icon}
            showArrow
            onClick={() => {
              handleMouseEnter(category);
              setSelectedCategory(category);
            }}
            isActive={selectedCategory?.id === category.id}
          />
        </div>
      ))}
    </>
  );
};

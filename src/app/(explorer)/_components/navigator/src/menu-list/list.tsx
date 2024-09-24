import { NavigatorMenuItem } from './list-item';
import React from 'react';

type NavigatorMenuListProps = {
  searchResults?: any;
  categories: any;
};

export const NavigatorMenuList: React.FC<NavigatorMenuListProps> = ({ searchResults, categories }) => {
  console.log(searchResults)
  return (
    <div className="w-[30%] max-h-[50vh] rounded-[30px] p-4 flex flex-col gap-2 bg-[#1A2333] overflow-y-scroll scrollbar-hide">
      {searchResults
        ? searchResults.map((result: { name: string; type: string; avatar: string | undefined; }) => (
          <NavigatorMenuItem
            key={result.name}
            label={result.name}
            description={result.type}
            avatar={result.avatar}
            onClick={() => console.log('clicked')}
            isSelected={false}
            isSearchResult
          />
        ))
        : categories.map((category: { name: string; icon: { imgSrc: string; width: number; height: number; } | undefined; }) => (
          <NavigatorMenuItem
            key={category.name}
            label={category.name}
            icon={category.icon}
            showArrow
            isSelected={false}
            onClick={() => console.log('clicked')}
          />
        ))}
    </div>
  )
}

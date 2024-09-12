'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { initialContentData } from '../../../mockdata';
import type {
  Category, SearchResult, AppDetails
} from '@/types/navigation-types';
import { NavigatorMenuInitialContent } from './navigator-menu-Initial-content';
import { NavigatorMenuItem } from './navigator-menu-item';

const categories: Category[] = [
  { name: "App Categories", icon: { imgSrc: "/assets/icons/app-categories.svg", width: 32, height: 32 }, blockType: "list" },
  { name: "Screens", icon: { imgSrc: "/assets/icons/screens.svg", width: 26, height: 32 }, blockType: "grid" },
  { name: "Marketing Pages", icon: { imgSrc: "/assets/icons/marketing-pages.svg", width: 30, height: 27 }, blockType: "list" },
  { name: "Elements", icon: { imgSrc: "/assets/icons/elements.svg", width: 32, height: 32 }, blockType: "grid" },
  { name: "Flows", icon: { imgSrc: "/assets/icons/flows.svg", width: 32, height: 32 }, blockType: "list" },
];

type NavigatorMenuProps = {
  isMenuOpen: boolean;
  searchQuery: string;
};

export const NavigatorMenu: React.FC<NavigatorMenuProps> = ({ isMenuOpen, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setSelectedResult(null);
  };

  const handleSearchResultClick = (result: SearchResult) => {
    setSelectedResult(result);
    setSelectedCategory(null);
  };

  useEffect(() => {
    if (searchQuery) {
      // Simulated search results
      const results: SearchResult[] = [
        {
          label: "Uber",
          type: "app",
          avatar: "https://github.com/shadcn.png",
          description: "Ride-hailing app",
          content: {
            name: "Uber",
            description: "Ride-hailing app",
            platform: "iOS, Android",
            rating: 4.5,
            category: "Transportation",
            screenshots: Array(4).fill("https://placehold.co/300x650"),
          },
        },
        {
          label: "Uber Eats",
          type: "app",
          avatar: "https://github.com/shadcn.png",
          description: "Food delivery app",
          content: {
            name: "Uber Eats",
            description: "Food delivery app",
            platform: "iOS, Android",
            rating: 4.7,
            category: "Food & Drink",
            screenshots: Array(4).fill("https://placehold.co/300x650"),
          },
        },
        {
          label: "Utilities",
          type: "app-category",
          avatar: "https://github.com/shadcn.png",
          description: "Utility apps category",
          content: {
            title: "Utilities",
            items: [
              { name: "Calculators", count: 15 },
              { name: "Unit Converters", count: 10 },
              { name: "File Managers", count: 8 },
              { name: "Battery Savers", count: 5 },
            ],
          },
        },
      ];
      setSearchResults(results.filter((result) => result.label.toLowerCase().includes(searchQuery.toLowerCase())));
      setSelectedCategory(null);
      setSelectedResult(null);
    } else {
      setSearchResults([]);
      setSelectedResult(null);
    }
  }, [searchQuery]);

  const renderRightPanelContent = () => {
    if (selectedResult) {
      if (selectedResult.type === "app") {
        const appDetails = selectedResult.content as AppDetails;
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{appDetails.name}</h2>
            <p>{appDetails.description}</p>
            <p>
              Platform:
              {appDetails.platform}
            </p>
            <p>
              Rating:
              {appDetails.rating}
            </p>
            <p>
              Category:
              {appDetails.category}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {appDetails?.screenshots?.map((screenshot, index) => (
                <Image
                  key={screenshot}
                  src={screenshot}
                  alt={`${appDetails.name} screenshot ${index + 1}`}
                  width={200}
                  height={430}
                  className="w-full h-auto"
                />
              ))}
            </div>
          </div>
        );
      }
    }

    if (selectedCategory) {
      if (selectedCategory.name === "App Categories") {
        const categoriesData = [
          {
            title: "First Category",
            items: [
              { name: "Business", count: 20 },
              { name: "Collaboration", count: 4 },
              { name: "Communication", count: 12 },
              { name: "CRM", count: 15 },
              { name: "Education", count: 22 },
              { name: "Finance", count: 21 },
              { name: "Food & Drink", count: 26 },
            ],
          },
          {
            title: "Second Category",
            items: [
              { name: "Travel", count: 16 },
              { name: "Business", count: 20 },
              { name: "Collaboration", count: 4 },
              { name: "Communication", count: 12 },
              { name: "CRM", count: 15 },
              { name: "Education", count: 22 },
              { name: "Finance", count: 21 },
              { name: "Food & Drink", count: 26 },
            ],
          },
        ];

        return (
          <>
            {categoriesData.map((category) => (
              <div className="flex flex-col gap-2" key={category.title}>
                <span className="text-base p-2 font-medium text-slate-400">{category.title}</span>
                <ul>
                  {category.items.map((item) => (
                    <li key={item.name} className="py-1 px-2 flex justify-between gap-2">
                      <button type="button" className="w-full h-fit flex items-start text-[20px] text-slate-100 font-medium hover:text-slate-300 active:text-slate-400 transition-colors">
                        {item.name}
                      </button>
                      <span className="text-slate-300 text-base">{item.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        );
      }
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{selectedCategory.name}</h2>
          {selectedCategory.blockType === "list" ? <div>List View</div> : <div>item View</div>}
        </div>
      );
    }

    return <NavigatorMenuInitialContent data={initialContentData} />
  };

  return (
    <motion.div
      key="menu"
      transition={{ duration: 0.3, ease: "easeIn" }}
      className="size-full contain-layout bg-transparent flex gap-4 text-white font-outfit overflow-hidden"
      initial={{ height: 0 }}
      animate={{ height: isMenuOpen ? "fit-content" : 0 }}
      exit={{ height: 0 }}
    >
      <div className="h-full w-[30%] max-h-[50vh] rounded-[30px] p-4 flex flex-col gap-2 bg-[#1A2333] overflow-y-scroll scrollbar-hide">
        {searchQuery
          ? searchResults.map((result) => (
            <NavigatorMenuItem
              key={result.label}
              label={result.label}
              avatar={result.avatar}
              onClick={() => handleSearchResultClick(result)}
              isSelected={selectedResult?.label === result.label}
              isSearchResult
            />
          ))
          : categories.map((category) => (
            <NavigatorMenuItem
              key={category.name}
              label={category.name}
              icon={category.icon}
              showArrow
              isSelected={selectedCategory?.name === category.name}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
      </div>
      <div className="h-full w-[70%] max-h-[50vh] rounded-[30px] p-4 bg-[#1A2333] overflow-y-scroll scrollbar-hide">
        {renderRightPanelContent()}
      </div>
    </motion.div>
  );
};

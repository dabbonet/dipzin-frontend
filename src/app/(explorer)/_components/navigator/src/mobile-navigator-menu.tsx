"use client";

import React, { useState } from "react";
import { Input } from "@/components/Shared/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
} from "@/components/UI/drawer";
import { XMarkIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useKeyword } from "@/app/(explorer)/_hooks/useKeyword";
import { useQuery } from "@/app/(explorer)/_hooks/useQuery";
import { useUpdateUrlPart } from "@/app/(explorer)/_hooks/useUpdateUrlPart";
import { updateStateAndUrl } from "@/app/(explorer)/_utils/updateStateAndUrl";
import type { Filter, Query } from "@/types/navigation-types";
import { NavigatorMenuInitialContent } from "./menu-preview/Initial-content";
import CategoriesContent from "./menu-preview/categories-content";
import SearchContent from "./menu-preview/search-content";
import { Button } from "@/components/Shared/button";
import { Icon } from "@/components/UI/icon";
import { NavigatorMenuItem } from "./menu-list/list-item";
import { motion, AnimatePresence } from "framer-motion";
import { Suggestions } from "../suggestions";

const suggestions = [
  { name: "Avatar", pattern: "components" },
  { name: "Card", pattern: "components" },
  { name: "Button", pattern: "components" },
  { name: "Business", pattern: "categories" },
  { name: "Education", pattern: "categories" },
  { name: "Landing Page", pattern: "marketing" },
  { name: "Onboarding", pattern: "flowActions" },
];

const categories = [
  {
    id: "appCategories",
    name: "App Categories",
    icon: "/assets/icons/app-categories.svg",
  },
  { id: "tagCategories", name: "Screens", icon: "/assets/icons/screens.svg" },
  {
    id: "marketingCategories",
    name: "Marketing Pages",
    icon: "/assets/icons/marketing-pages.svg",
  },
  {
    id: "componentCategories",
    name: "Components",
    icon: "/assets/icons/components.svg",
  },
  { id: "flowCategories", name: "Flows", icon: "/assets/icons/flows.svg" },
];

const MobileNavigatorMenu: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdate: (
    updateFn: (prevState: any) => any,
    target: keyof Query,
  ) => void;
}> = ({ isOpen, setIsOpen, handleUpdate }) => {
  const [navigationState, setNavigationState] = useState("initial");
  const [navigationTitle, setNavigationTitle] = useState("");
  const {
    keyword,
    setKeyword,
    selectedResult,
    setSelectedResult,
    suggestedSearch,
  } = useKeyword();
  const {
    query, setPlatform, setPattern, setFilters, setApps
  } = useQuery();
  const { filters } = query || {};
  const updateUrlPart = useUpdateUrlPart();

  const handleStateAndUrlUpdate = (
    newPlatform?: string,
    newPattern?: string,
    newFilters?: Filter[],
  ) => {
    updateStateAndUrl({
      newPlatform,
      newPattern,
      newFilters: query.filters
        ? [...query.filters, ...(newFilters || [])]
        : newFilters,
      setPlatform,
      setPattern,
      setFilters,
      setApps,
      updateUrlPart,
      query,
    });

    // Call handleUpdate after updating state and URL
    handleUpdate(
      (prevState) => ({
        ...prevState,
        filters: newFilters || [],
        platform: newPlatform,
        pattern: newPattern,
      }),
      "filters",
    );
  };

  // Update the selectedResult when a category is clicked
  const handleCategoryClick = (category: { id: string; name: string }) => {
    setNavigationState("category");
    setNavigationTitle(category.name);

    const selectedCategory = categories.find((cat) => cat.id === category.id);
    if (selectedCategory) {
      setSelectedResult(selectedCategory);
    }
  };

  const handleBackClick = () => {
    if (navigationState === "category") {
      setNavigationState("allFilters");
      setNavigationTitle("All Filters");
      setSelectedResult(null);
    } else if (navigationState === "allFilters") {
      setNavigationState("initial");
      setNavigationTitle("");
    }
  };

  const handleAllFiltersClick = () => {
    setNavigationState("allFilters");
    setNavigationTitle("All Filters");
    setSelectedResult(null);
  };

  return (
    <Drawer
      open={isOpen}
      direction="left"
      dismissible
      onOpenChange={setIsOpen}
      // snapPoints={[0, 1]} // Add snap points for better swipe behavior
      shouldScaleBackground={false}
    >
      <DrawerContent className="fixed inset-0 mt-0 bg-slate-900 rounded-none border-0 overflow-hidden">
        <DrawerHeader className="p-0 px-4">
          <Input
            className="w-full shadow-none"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            autoComplete="off"
            autoFocus
            endContent={(
              <DrawerClose onClick={() => setIsOpen(false)}>
                <XMarkIcon className="text-white size-6" />
              </DrawerClose>
            )}
          />
          <div className="flex items-center gap-2 my-4">
            {navigationState === "initial" && (
            <Button onClick={handleAllFiltersClick} variant="secondary">
              <Icon.Filter className="size-5" />
              All Filters
            </Button>
            )}
            {navigationState !== "initial" && (
            <Button
              id="back"
              type="button"
              aria-label="Back"
              variant="darkGray"
              isIconOnly
              onClick={handleBackClick}
            >
              <ChevronLeftIcon className="text-white size-6" />
            </Button>
            )}
            <span className="text-slate-500">{navigationTitle}</span>
          </div>
        </DrawerHeader>
        <div className="size-full overflow-hidden">
          <AnimatePresence mode="wait">
            {navigationState === "initial" && !selectedResult && (
              <motion.div
                key="initial"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Suggestions
                  suggestions={suggestions}
                  selectedFilters={filters}
                  setSelectedFilters={setFilters}
                />
                <NavigatorMenuInitialContent
                  data={suggestedSearch}
                  handleUpdate={handleStateAndUrlUpdate}
                />
              </motion.div>
            )}
            {navigationState === "allFilters" && (
              <motion.div
                key="allFilters"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-2 p-4 gap-4"
              >
                {categories.map((category) => (
                  <NavigatorMenuItem
                    key={category.id}
                    label={category.name}
                    icon={{ imgSrc: category.icon, width: 48, height: 48 }}
                    onClick={() => handleCategoryClick(category)}
                  />
                ))}
              </motion.div>
            )}
            {navigationState === "category" && selectedResult && (
              <motion.div
                key="category"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <CategoriesContent
                  selectedResult={selectedResult}
                  suggestedSearch={suggestedSearch}
                  handleUpdate={handleStateAndUrlUpdate}
                />
              </motion.div>
            )}
            {selectedResult && selectedResult.blockType !== "list" && (
              <motion.div
                key="searchContent"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <SearchContent selectedResult={selectedResult} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigatorMenu;

/* eslint-disable no-nested-ternary */

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
import type { Filter } from "@/types/navigation-types";
import { NavigatorMenuInitialContent } from "./menu-preview/Initial-content";
import CategoriesContent from "./menu-preview/categories-content";
import { Button } from "@/components/Shared/button";
import { Icon } from "@/components/UI/icon";
import { NavigatorMenuItem } from "./menu-list/list-item";
import { motion, AnimatePresence } from "framer-motion";
import { Suggestions } from "../suggestions";
import { NavigatorMenuList } from "./menu-list/list";

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

type NavigationState = "initial" | "allFilters" | "category";

const MobileNavigatorMenu: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const [navigationState, setNavigationState] = useState<NavigationState>("initial");
  const [navigationTitle, setNavigationTitle] = useState("");
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);
  const {
    keyword,
    setKeyword,
    results,
    selectedResult,
    setSelectedResult,
    suggestedSearch,
  } = useKeyword();
  const {
    query,
    setFilters,
    setApps,
    suggestions,
  } = useQuery();
  const { filters } = query || {};

  const slideVariants = {
    enter: (isBack: boolean) => ({
      x: isBack ? -300 : 300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (isBack: boolean) => ({
      x: isBack ? 300 : -300,
      opacity: 0,
    }),
  };

  const handleStateAndUrlUpdate = (pattern: string, value: string) => {
    const newFilter: Filter = { name: value, pattern };
    setFilters((prevFilters) => [...prevFilters, newFilter]);
    setIsOpen(false);
  };

  const handleCategoryClick = (category: { id: string; name: string }) => {
    setIsNavigatingBack(false);
    setNavigationState("category");
    setNavigationTitle(category.name);

    const selectedCategory = {
      ...category,
      blockType: "list",
    };
    setSelectedResult(selectedCategory);
  };

  const handleBackClick = () => {
    setIsNavigatingBack(true);
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
    setIsNavigatingBack(false);
    setNavigationState("allFilters");
    setNavigationTitle("All Filters");
    setSelectedResult(null);
  };

  const mappedSuggestions = suggestions?.map((name: string) => ({
    name,
    pattern: query.pattern,
  })) || [];

  const renderContent = () => (
    <AnimatePresence mode="wait" custom={isNavigatingBack}>
      {keyword && results?.hits && results?.hits.length > 0 ? (
        <div
          className="grid grid-cols-2 pt-0 p-4 gap-4"
        >
          {/* Render search results here */}
          <NavigatorMenuList
            handleUpdate={(updateFn, target) => {
              if (target === "filters") {
                setFilters(updateFn(query.filters));
                setIsOpen(false);
              } else if (target === "apps") {
                setApps(updateFn(query.apps));
                setIsOpen(false);
              }
            }}
          />
        </div>
      ) : navigationState === "initial" && !selectedResult ? (
        <motion.div
          key="initial"
          custom={isNavigatingBack}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.15 }}
        >
          <Suggestions
            suggestions={mappedSuggestions}
            selectedFilters={filters}
            setSelectedFilters={setFilters}
          />
          <NavigatorMenuInitialContent
            data={suggestedSearch}
            handleUpdate={handleStateAndUrlUpdate}
          />
        </motion.div>
      ) : navigationState === "allFilters" ? (
        <motion.div
          key="allFilters"
          custom={isNavigatingBack}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.15 }}
          className="grid grid-cols-2 pt-0 p-4 gap-4"
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
      ) : navigationState === "category" && selectedResult ? (
        <motion.div
          key="category"
          custom={isNavigatingBack}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.15 }}
          className="size-full overflow-y-auto"
        >
          <CategoriesContent
            selectedResult={selectedResult}
            suggestedSearch={suggestedSearch}
            handleUpdate={handleStateAndUrlUpdate}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <Drawer
      open={isOpen}
      direction="left"
      dismissible={false}
      onOpenChange={setIsOpen}
      shouldScaleBackground={false}
    >
      <DrawerContent className="fixed inset-0 mt-0 bg-slate-900 rounded-none border-0 overflow-hidden">
        <DrawerHeader className="p-4">
          <Input
            className="w-full shadow-none"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            selectedFilters={filters}
            setSelectedFilters={(updateFn) => setFilters(updateFn)}
            autoComplete="off"
            autoFocus
            endContent={(
              <DrawerClose onClick={() => setIsOpen(false)}>
                <XMarkIcon className="text-white size-6" />
              </DrawerClose>
            )}
          />
          <div className="flex items-center gap-2 mt-4">
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
        <div className="size-full overflow-y-scroll">{renderContent()}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigatorMenu;

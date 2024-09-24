'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type {
  Category
} from '@/types/navigation-types';
import { NavigatorMenuList } from './menu-list/list';
import { NavigatorMenuPreview } from './menu-preview/preview';
import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';

const categories: Category[] = [
  { name: "App Categories", icon: { imgSrc: "/assets/icons/app-categories.svg", width: 28, height: 28 }, blockType: "list" },
  { name: "Screens", icon: { imgSrc: "/assets/icons/screens.svg", width: 28, height: 28 }, blockType: "grid" },
  { name: "Marketing Pages", icon: { imgSrc: "/assets/icons/marketing-pages.svg", width: 28, height: 28 }, blockType: "list" },
  { name: "Elements", icon: { imgSrc: "/assets/icons/elements.svg", width: 28, height: 28 }, blockType: "grid" },
  { name: "Flows", icon: { imgSrc: "/assets/icons/flows.svg", width: 28, height: 28 }, blockType: "list" },
];

type NavigatorMenuProps = {
  isMenuOpen: boolean;
};

export const NavigatorMenu: React.FC<NavigatorMenuProps> = ({ isMenuOpen }) => {
  const { results } = useKeyword();
  const searchResults = results?.hits
  return (
    <motion.div
      key="menu"
      transition={{ duration: 0.3, ease: "easeIn" }}
      className="size-full contain-layout bg-transparent flex gap-4 text-white font-outfit overflow-hidden "
      initial={{ height: 0 }}
      animate={{ height: isMenuOpen ? "fit-content" : 0 }}
      exit={{ height: 0 }}
    >
      <NavigatorMenuList categories={categories} searchResults={searchResults} />
      <NavigatorMenuPreview />
    </motion.div>
  );
};

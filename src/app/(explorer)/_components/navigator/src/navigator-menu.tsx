'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type {
  Category
} from '@/types/navigation-types';
import { NavigatorMenuList } from './menu-list/list';
import { NavigatorMenuPreview } from './menu-preview/preview';
import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';


type NavigatorMenuProps = {
  isMenuOpen: boolean;
};

export const NavigatorMenu: React.FC<NavigatorMenuProps> = ({ isMenuOpen }) => {

  return (
    <motion.div
      key="menu"
      transition={{ duration: 0.3, ease: "easeIn" }}
      className="size-full contain-layout bg-transparent flex gap-4 text-white font-outfit overflow-hidden "
      initial={{ height: 0 }}
      animate={{ height: isMenuOpen ? "fit-content" : 0 }}
      exit={{ height: 0 }}
    >
      <NavigatorMenuList />
      <NavigatorMenuPreview />
    </motion.div>
  );
};

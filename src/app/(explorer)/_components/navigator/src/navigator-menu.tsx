'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { NavigatorMenuList } from './menu-list/list';
import { NavigatorMenuPreview } from './menu-preview/preview';
import type { Query } from '@/types/navigation-types';

type NavigatorMenuProps = {
  isMenuOpen: boolean;
  handleUpdate: (updateFn: ((state: any) => any), target: keyof Query) => void;
};

export const NavigatorMenu: React.FC<NavigatorMenuProps> = ({ isMenuOpen, handleUpdate }) => (
  <motion.div
    key="menu"
    transition={{ duration: 0.3, ease: "easeIn" }}
    className="size-full contain-layout bg-transparent flex gap-4 text-white font-outfit overflow-hidden "
    initial={{ height: 0 }}
    animate={{ height: isMenuOpen ? "fit-content" : 0 }}
    exit={{ height: 0 }}
  >
    <NavigatorMenuList handleUpdate={handleUpdate} />
    <NavigatorMenuPreview />
  </motion.div>
);

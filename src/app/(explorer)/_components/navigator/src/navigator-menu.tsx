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
    className="size-full contain-layout bg-transparent flex gap-4 text-white   overflow-hidden "
    initial={{ height: 0 }}
    animate={{ height: isMenuOpen ? "fit-content" : 0 }}
    exit={{ height: 0 }}
  >
    <div className="w-[30%] max-h-[50vh] rounded-[30px] p-4 flex flex-col gap-4 bg-[#1A2333] overflow-y-scroll scrollbar-hide">
      <NavigatorMenuList handleUpdate={handleUpdate} />
    </div>
    <NavigatorMenuPreview />
  </motion.div>
);

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
    className="size-full contain-layout bg-transparent flex gap-4 text-white max-h-[50vh] overflow-hidden"
    initial={{ height: 0 }}
    animate={{ height: isMenuOpen ? "fit-content" : 0 }}
    exit={{ height: 0 }}
  >
    <div className="w-2/5 2xl:w-[30%] rounded-2xl xl:rounded-[30px] p-1 xl:p-2 flex flex-col gap-4 bg-[#1A2333] overflow-y-scroll scrollbar-hide">
      <NavigatorMenuList handleUpdate={handleUpdate} />
    </div>
    <div className="w-3/5 2xl:w-[70%] rounded-2xl xl:rounded-[30px] p-0 xl:p-2 bg-[#1A2333]">
      <NavigatorMenuPreview />
    </div>
  </motion.div>
);

"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill } from '@/components/Shared/pill';
import { extractInitials } from '@/utils/StringUtils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Shared/avatar';
import { Icon } from '@/components/UI/icon';
import { TabsList, TabsTrigger } from '@/components/UI/tabs';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Shared/button';
import { Dropdown } from '@/components/Shared/dropdown';
import type { ScreenData } from '@/types/screen-types';
import { DialogClose } from '@/components/UI/dialog';
import { storage } from '@/utils/storage';

type TagProps = {
  name: string;
  onClick: () => void;
};

const Tag = ({ name, onClick }: TagProps) => (
  <Pill className="cursor-pointer" state="suggestion" onClick={onClick}>
    {name}
  </Pill>
);

type ColorSquareProps = {
  color: string;
  type: 'mobile' | 'web';
};

const ColorSquare = ({ color, type }: ColorSquareProps) => (
  <span
    className={cn(
      type === 'web' ? 'w-6 h-6' : 'w-4 h-4',
      'rounded-full border-2 border-white hover:border-aqua-400'
    )}
    style={{ backgroundColor: color }}
  />
);

type ScreenDetailsProps = {
  screen: ScreenData;
  type?: 'wide' | 'default';
};

const ScreenDetails = ({ screen, type }: ScreenDetailsProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  return (
    <motion.div
      className={cn(
        type === 'wide' ? 'w-[1000px]' : 'w-[700px]',
        'bg-[#1F2937CC]/80 backdrop-blur-md px-6 py-4 flex flex-col gap-4 rounded-2xl overflow-hidden'
      )}
      initial={{ opacity: 0, height: 'auto' }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-3">
            <Avatar className="size-12">
              <AvatarImage
                src={storage((screen.app.icon.hash ?? '') + (screen.app.icon.ext ?? ''))}
                alt={screen.app.name}
              />
              <AvatarFallback>{extractInitials(screen.app.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-medium leading-8 text-white font-outfit">
                {screen.app.name}
              </h3>
              {type === 'wide' && (
                <p className="text-[#8F94A1] font-poppins">{screen.app.tag_line}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            className="bg-gray-600 p-2 rounded-full"
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          >
            {isDetailsOpen ? <Icon.Collapse3 /> : <Icon.Expand3 />}
            <p className="sr-only">{isDetailsOpen ? 'collapse' : 'expand'}</p>
          </button>
        </div>

        {screen.app.platform === "web" && (
          <TabsList>
            <TabsTrigger value="section" className="py-2 px-2.5 text-white rounded-[10px]">
              Section
            </TabsTrigger>
            <TabsTrigger value="fullPage" className="py-2 px-2.5 text-white rounded-[10px]">
              Full Page
            </TabsTrigger>
          </TabsList>
        )}

        <div className="flex items-center justify-end gap-4 font-medium whitespace-nowrap font-poppins">
          <Button
            size="md"
            className={cn(
              type === 'wide' ? 'px-4 py-2' : 'p-2',
              'rounded-full text-base font-medium bg-gray-600'
            )}
            variant="darkGray"
            isIconOnly={type !== 'wide'}
          >
            <Icon.Copy2 className="size-6" />
            {type === 'wide' && 'Copy'}
          </Button>
          <Button
            size="md"
            className={cn(
              type === 'wide' ? 'px-4 py-2' : 'p-2',
              'rounded-full text-base font-medium bg-gray-600'
            )}
            variant="darkGray"
            isIconOnly={type !== 'wide'}
          >
            <Icon.Download className="size-6" />
            {type === 'wide' && 'Download'}
          </Button>
          <Dropdown
            trigger={(
              <Button
                size="md"
                className="rounded-full p-2 bg-gray-600"
                variant="darkGray"
                isIconOnly
              >
                <Icon.EllipsisHorizontal className="size-6 text-white" />
              </Button>
            )}
            content="content"
            placement="end"
          />
          <DialogClose asChild>
            <Button
              size="md"
              className="rounded-full p-2 bg-gray-600"
              variant="darkGray"
              isIconOnly
            >
              <Icon.Close className="size-6" />
            </Button>
          </DialogClose>
        </div>
      </div>

      <AnimatePresence>
        {isDetailsOpen && (
          <motion.div
            className="flex flex-wrap gap-y-6 gap-x-16"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {screen.tags.length > 0 && (
              <div>
                <p className="text-slate-500 text-sm mb-2">Tags</p>
                <div className="flex gap-2 flex-wrap">
                  {screen.tags.map((tag) => (
                    <Tag key={tag.id} name={tag.name} onClick={() => { }} />
                  ))}
                </div>
              </div>
            )}
            {screen.components.length > 0 && (
              <div>
                <p className="text-slate-500 text-sm mb-2">Components</p>
                <div className="flex gap-2 flex-wrap">
                  {screen.components.map((component) => (
                    <Tag
                      key={component.id}
                      name={component.name}
                      onClick={() => { }}
                    />
                  ))}
                </div>
              </div>
            )}
            {screen.colors && (
              <div>
                <p className="text-slate-500 text-sm mb-2">Colors</p>
                <div className="flex gap-2 flex-wrap">
                  {screen.colors.split(',').map((color) => (
                    <ColorSquare key={color} color={color} type="web" />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScreenDetails;

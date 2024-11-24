"use client"

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Shared/avatar';
import { Icon } from '@/components/UI/icon';
import { Button } from '@/components/Shared/button';
import { extractInitials } from '@/utils/StringUtils';
import { storage } from '@/utils/storage';
import { cn } from '@/lib/utils';
import useIsMobile from '@/hooks/useIsMobile';

interface AppData {
  slug: string;
  id: number;
  name: string;
  tag_line?: string;
  platform: string | string[];
  icon: string;
  categories: string | string[];
  neglected?: boolean;
}

interface AppPillProps {
  data: AppData;
  isFull?: boolean;
  isHidden: boolean;
  onToggleVisibility: () => void;
  onRemove: () => void;
}

const AppPill: React.FC<AppPillProps> = ({
  isFull = false,
  data,
  isHidden,
  onToggleVisibility,
  onRemove,
}) => {
  const isMobile = useIsMobile();

  if (!data) {
    return null;
  }

  console.log('data: ', JSON.stringify(data, null, 2));

  return (
    <div
      className={cn(
        isHidden ? 'opacity-50' : 'opacity-100',
        data.neglected ? 'opacity-50' : 'opacity-100',
        `max-w-full w-full h-fit bg-[#1A2333] p-1.5 rounded-[2rem] grid
        ${isFull ? 'grid-cols-4 sm:grid-cols-7 md:grid-cols-12' : 'grid-cols-4'}
        gap-4 items-center`,
      )}
    >
      <div
        className={cn(
          'size-fit flex items-center gap-2 sm:gap-3 text-white',
          isFull ? 'col-span-3 sm:col-span-3 md:col-span-4' : 'col-span-3'
        )}
      >
        <Avatar className="size-8 sm:size-10">
          <AvatarImage src={storage(data.icon)} alt={data.name} />
          <AvatarFallback>{extractInitials(data.name)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-0 lg:gap-4 w-full">
          <h3 className="text-sm sm:text-xl md:text-2xl font-medium whitespace-nowrap text-white">
            {data.name}
          </h3>
          {isFull && data.tag_line && (
            <p className="text-xs sm:text-sm md:text-xs text-slate-400 w-fit">{data.tag_line}</p>
          )}
        </div>
      </div>

      {isFull && (
        <>
          <div className="col-span-2 flex flex-col text-white font-medium whitespace-nowrap">
            <small className="text-slate-500 text-xs">Platform</small>
            <span className="text-sm sm:text-base">
              {Array.isArray(data.platform) ? data.platform.join(', ') : data.platform}
            </span>
          </div>
          <div className="col-span-2 flex flex-col text-white font-medium whitespace-nowrap">
            <small className="text-slate-500 text-xs">Category</small>
            <span className="text-sm sm:text-base truncate">
              {Array.isArray(data.categories) ? data.categories.join(', ') : data.categories}
            </span>
          </div>
        </>
      )}

      <div
        className={`${
          isFull ? 'col-span-4' : 'col-span-1'
        } flex items-end justify-end gap-2 sm:gap-4 font-medium whitespace-nowrap`}
      >
        <Button
          size={isMobile ? 'sm' : 'md'}
          className="size-fit rounded-full p-1 sm:p-2"
          variant="darkGray"
          isIconOnly
          onClick={onToggleVisibility}
        >
          {isHidden ? (
            <Icon.EyeSlash
              className="size-5 sm:size-6 stroke-white
              fill-transparent"
            />
          ) : (
            <Icon.Eye
              className="size-5 sm:size-6 stroke-white
              fill-transparent"
            />
          )}
        </Button>
        <Button
          size={isMobile ? 'sm' : 'md'}
          className="hidden sm:flex size-fit rounded-full p-1 sm:p-2"
          variant="darkGray"
          isIconOnly
          onClick={onRemove}
        >
          <Icon.Close className="size-5 sm:size-6 fill-white stroke-white" />
        </Button>
      </div>
    </div>
  );
};

export default AppPill;

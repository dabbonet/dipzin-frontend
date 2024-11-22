/* eslint-disable no-nested-ternary */

"use client"

import React from "react";
import { Pill } from "@/components/Shared/pill";
import { extractInitials, mergeIconFromObject } from "@/utils/StringUtils";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/Shared/avatar";
import { Icon } from "@/components/UI/icon";
import { Button } from "@/components/Shared/button";
import { Dropdown } from "@/components/Shared/dropdown";
import { DialogClose } from "@/components/UI/dialog";
import { storage } from "@/utils/storage";
import type { ScreenData as ScreenType } from "@/types/screen-types";
import { Separator } from "@/components/UI/separator";
import useIsMobile from "@/hooks/useIsMobile";
import { CopyButton } from "@/components/Shared/button/CopyButton";
import { DownloadButton } from "@/components/Shared/button/DownloadButton";
import { DropdownMenuItem } from "@/components/UI/dropdown-menu";
import { useQuery } from "@/app/(explorer)/_hooks/useQuery";
import {
  TooltipProvider, Tooltip, TooltipTrigger, TooltipContent
} from "@/components/UI/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import type { AppType } from "@/types/app-types";
import { Checkbox } from "@/components/UI/checkbox";
import useIsTablet from "@/hooks/useIsTablet";

export const ScreenAppDetails = ({ app }: { app: ScreenType["app"] }) => {
  const { setApps } = useQuery();
  const handleAppClick = () => {
    setApps((prevApps) => {
      const isAppSelected = prevApps.some((selectedApp: AppType) => selectedApp.id === app.id);
      if (!isAppSelected) {
        return [...prevApps, app];
      }
      return prevApps;
    });
  };

  return (
    <>
      <DialogClose className="w-full sm:w-fit h-fit flex items-center gap-3 sm:gap-4 text-start" onClick={handleAppClick} aria-label="select app">
        <Avatar className="size-10 xl:size-12">
          <AvatarImage
            src={storage(mergeIconFromObject(app.icon))}
            alt={app.name}
          />
          <AvatarFallback>{extractInitials(app.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-base xl:text-2xl font-medium leading-6 text-white   sm:text-xl">
            {app.name}
          </h3>
          <p className="text-xs xl:text-sm text-gray-400 sm:truncate sm:whitespace-nowrap sm:max-w-[50vw]">
            {app.tag_line}
          </p>
        </div>
      </DialogClose>
      <DialogClose className="block sm:hidden ml-auto p-3">
        <Icon.Close className="size-7" />
      </DialogClose>
    </>
  )
};

export const WebScreenTabs = ({
  toggleFullScreen,
  isFullScreen
}: {
  toggleFullScreen: () => void;
  isFullScreen: boolean;
}) => (
  <div className="hidden sm:block z-50 sm:absolute top-0 left-1/2 -translate-x-1/2">
    <div className="inline-flex h-fit items-center justify-center rounded-full bg-slate-800 text-white">
      <button
        type="button"
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-full py-3.5 px-4 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${!isFullScreen ? 'bg-slate-700 shadow' : ''}`}
        onClick={toggleFullScreen}
      >
        Section
      </button>
      <button
        type="button"
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-full py-3.5 px-4 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isFullScreen ? 'bg-slate-700 shadow' : ''}`}
        onClick={toggleFullScreen}
      >
        Full Page
      </button>
    </div>
  </div>
);

export const ActionButtons = ({ screen }: { screen: ScreenType }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet()
  const screenUrl = storage(screen.screen.hash + screen.screen.ext);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/screen/${screen.id}`;
    navigator.clipboard.writeText(link);
  }

  return (
    <div className="w-full sm:w-fit flex items-center justify-end gap-2 sm:gap-4 font-medium whitespace-nowrap ">
      <CopyButton
        url={screenUrl}
        then={
          (
            <>
              <Checkbox checked className="size-6" />
              <p className="hidden sm:block">Copied</p>
            </>
          )
        }
        size={isMobile ? "md" : isTablet ? "sm" : "lg"}
        variant="liteGray"
        className="flex-1 hidden md:flex"
      >
        <Icon.Copy className="size-6" />
        <p className="hidden sm:block">Copy</p>
      </CopyButton>

      <DownloadButton
        url={screenUrl}
        then={
          (
            <>
              <Checkbox checked className="size-6" />
              <p className="hidden sm:block">Downloaded</p>
            </>
          )
        }
        size={isMobile ? "sm" : isTablet ? "sm" : "lg"}
        variant="darkGray"
        className="flex-none mx-auto sm:flex-1"
      >
        <Icon.Download className="size-5 sm:size-6" />
        <p>Download</p>
      </DownloadButton>

      <Dropdown
        classNames={{
          trigger: "hidden sm:flex",
        }}
        trigger={(
          <Button size={isTablet ? "sm" : "lg"} variant="darkGray" isIconOnly>
            <Icon.Dots className="size-6" />
          </Button>
        )}
        content={(
          <DropdownMenuItem onClick={handleCopyLink}>
            <Icon.Link className="size-6" />
            Copy Link
          </DropdownMenuItem>
        )}
        placement="end"
      />
      {/* <Button
        isIconOnly
        size={isMobile ? "md" : "xl"}
        variant="darkGray"
        className="flex sm:hidden"
      >
        <Icon.Save className="size-6" />
      </Button> */}

      <Separator orientation="vertical" className="hidden sm:flex h-8" />
      <DialogClose className="hidden sm:flex" asChild>
        <Button
          className="rounded-full"
          size={isTablet ? "sm" : "lg"}
          variant="darkGray"
          isIconOnly
        >
          <Icon.Close className="size-6" />
        </Button>
      </DialogClose>
    </div>
  );
};

export const ScreenData = ({
  tags,
  components,
  colors,
}: {
  tags: ScreenType["tags"];
  components: ScreenType["components"];
  colors: ScreenType["colors"];
}) => {
  const { setFilters } = useQuery();

  const handleStateAndUrlUpdate = (pattern: string, value: string) => {
    const newFilter = { name: value, pattern };
    setFilters((prevFilters) => [...prevFilters, newFilter]);
  };

  const handleTagClick = (itemName: string) => {
    handleStateAndUrlUpdate('screens', itemName);
  };

  const handleComponentClick = (itemName: string) => {
    handleStateAndUrlUpdate('components', itemName);
  };

  const renderPills = (
    items: { id: string; name: string }[],
    handleClick: (itemName: string) => void
  ) => {
    const displayItems = items.slice(0, 3);
    const remainingItems = items.length - 3;

    return (
      <div className="flex gap-2 flex-nowrap">
        {displayItems.map((item) => (
          <DialogClose key={item.id}>
            <Pill
              className="cursor-pointer transition-all"
              state="suggestion"
              onClick={() => handleClick(item.name)}
            >
              {item.name}
            </Pill>
          </DialogClose>
        ))}
        {remainingItems > 0 && (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <Pill
                  className="cursor-pointer relative group"
                  state="suggestion"
                >
                  +
                  {remainingItems}
                </Pill>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-800 flex flex-col items-start gap-2 p-2 size-full">
                {items.slice(3).map((item) => (
                  <DialogClose key={item.id}>
                    <Pill
                      className="cursor-pointer transition-all"
                      state="suggestion"
                      onClick={() => handleClick(item.name)}
                    >
                      {item.name}
                    </Pill>
                  </DialogClose>
                ))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  };

  const handleColorClick = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className="w-full h-fit grid grid-cols-6 justify-between flex-wrap gap-y-6">
      {tags.length > 0 && (
        <div className="w-full h-fit col-span-2">
          <p className="text-xs 2xl:text-xl font-semibold">Tags</p>
          {renderPills(tags, handleTagClick)}
        </div>
      )}
      {components.length > 0 && (
        <div className="w-full h-fit col-span-2">
          <p className="text-xs 2xl:text-xl font-semibold">Components</p>
          {renderPills(components, handleComponentClick)}
        </div>
      )}
      {colors && (
        <div className="w-full h-fit col-span-2">
          <p className="text-xs 2xl:text-xl font-semibold">Colors</p>
          <div className="flex gap-2 flex-wrap">
            {colors.split(",").map((color) => (
              <TooltipProvider key={color}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleColorClick(color)}
                      type="button"
                      aria-label="Copy Color"
                      className="w-6 aspect-square shrink-0 rounded-full border-2 border-white hover:border-aqua-400"
                      style={{ backgroundColor: color }}
                    />
                  </TooltipTrigger>
                  <TooltipContent style={{ background: color }}>
                    {color}
                    <TooltipArrow style={{ fill: color }} width={14} height={8} />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

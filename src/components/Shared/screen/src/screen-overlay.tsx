"use client";

import React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/Shared/avatar";
import { Button } from "@/components/Shared/button";
import { Icon } from "@/components/UI/icon";
import { extractInitials, mergeIconFromObject } from "@/utils/StringUtils";
import { Dropdown } from "@/components/Shared/dropdown";
import { Checkbox } from "@/components/UI/checkbox";
import { storage } from "@/utils/storage";
import type { AppType } from "@/types/app-types";
import type { ScreenData } from "@/types/screen-types";
import { useBulkActionStore } from "@/stores/useBulkActionStore";
import { CopyButton } from "../../button/CopyButton";
import { DropdownMenuItem } from "@/components/UI/dropdown-menu";
import { useQuery } from "@/app/(explorer)/_hooks/useQuery";

// App Info Component
const AppInfo = ({ app }: { app: AppType }) => {
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
    <button onClick={handleAppClick} className="flex items-center text-start gap-2 md:gap-4 cursor-pointer" type="button" aria-label="App">
      <Avatar>
        <AvatarImage
          width={80}
          height={80}
          src={storage(mergeIconFromObject(app?.icon))}
          alt={app?.name}
        />
        <AvatarFallback>{extractInitials(app?.name || "")}</AvatarFallback>
      </Avatar>
      <div className="">
        <h3 className="text-white text-lg font-semibold">{app?.name}</h3>
        <p className="text-white text-sm">{app?.tag_line}</p>
      </div>
    </button>
  );
}

// Global Top Overlay
const GlobalTopOverlay = ({ screen, isSelected }: { screen: ScreenData, isSelected: boolean }) => {
  const { selectScreen, deselectScreen } = useBulkActionStore();
  const selected = isSelected;

  const handleCheckboxChange = () => {
    if (selected) {
      deselectScreen(screen.id.toString());
    } else {
      selectScreen(screen);
    }
  };

  const screenUrl = storage(screen.screen.hash + screen.screen.ext);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/screen/${screen.id}`;
    navigator.clipboard.writeText(link);
  }

  return (
    <div className="w-full h-fit flex items-center justify-between px-5">
      <Checkbox
        className="size-[28px] bg-transparent rounded-[0.4rem] border-[2.5px]"
        checked={selected}
        onCheckedChange={handleCheckboxChange}
      />
      <div className="size-fit flex items-center gap-2">
        <CopyButton
          url={screenUrl}
          then={
            (
              <>
                <Icon.Check className="size-6" />
                <p className="hidden sm:block">Copied!</p>
              </>
            )
          }
          variant="darkGray"
          className="flex-1 hidden md:flex"
        >
          <Icon.Copy className="size-6 text-white" />
          <p className="hidden sm:block">Copy</p>
        </CopyButton>

        <Dropdown
          trigger={(
            <Button
              size="md"
              className="rounded-full p-2 bg-slate-800"
              variant="darkGray"
              isIconOnly
            >
              <Icon.Dots className="size-6 text-white" />
            </Button>
          )}
          content={(
            <DropdownMenuItem onClick={handleCopyLink}>
              <Icon.Link className="size-6" />
              Copy Link
            </DropdownMenuItem>
          )}
          classNames={{
            content: "w-fit",
          }}
          placement="end"
        />
      </div>
    </div>
  );
};

// Top Overlay Component
const TopOverlay = ({ screen, isSelected }: { screen: ScreenData, isSelected: boolean }) => (
  <div
    className={`absolute z-20 top-0 inset-x-0 flex ${screen.app?.platform === "web" ? "pt-2 pb-[5px] sm:pt-2 sm:pb-[20px] md:pt-2 md:pb-[25px] lg:pt-3 lg:pb-[30px] xl:pt-4 xl:pb-[35px]" : "pt-4 pb-[10px] sm:pt-3 sm:pb-[30px] md:pt-4 md:pb-[35px] lg:pt-5 lg:pb-[40px] xl:pt-6 xl:pb-[45px]"} items-center justify-center gap-4 bg-screen-hover-gradient-to-bottom opacity-0 group-hover:opacity-100 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 ease-in-out`}
  >
    <GlobalTopOverlay screen={screen} isSelected={isSelected} />
  </div>
);

// Bottom Overlay Component
const BottomOverlay = ({ app, isSelected }: { app: AppType, isSelected: boolean }) => (
  <div
    className={`absolute z-20 bottom-0 inset-x-0 flex px-3 sm:px-4 md:px-4 lg:px-5 xl:px-6 ${app?.platform === "web" ? "pt-[5px] pb-[10px] sm:pb-[12px] sm:pt-[22px] md:pb-[10px] md:pt-[21px] lg:pb-[15px] lg:pt-[30px] xl:pb-[20px] xl:pt-[40px]" : "pb-[14px] pt-[15px] sm:pb-[15px] sm:pt-[27px] md:pb-[16px] md:pt-[33px] lg:pb-[21px] lg:pt-[45px] xl:pb-[26px] xl:pt-[55px]"} items-center justify-between bg-screen-hover-gradient-to-top opacity-0 group-hover:opacity-100 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 ease-in-out`}
  >
    <AppInfo app={app} />
  </div>
);

// Screen Overlay component that triggers hover animation
export const ScreenOverlay = ({ screen }: { screen: ScreenData }) => {
  const { isSelected } = useBulkActionStore();
  const selected = isSelected(screen.id.toString());

  return (
    <>
      <TopOverlay screen={screen} isSelected={selected} />
      <BottomOverlay app={screen.app} isSelected={selected} />
    </>
  );
};

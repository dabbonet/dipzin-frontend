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

// App Info Component
const AppInfo = ({ app }: { app: AppType }) => (
  <div className="flex items-center gap-2 md:gap-4">
    <Avatar>
      <AvatarImage
        width={80}
        height={80}
        src={storage(mergeIconFromObject(app?.icon))}
        alt={app?.name}
      />
      <AvatarFallback>{extractInitials(app?.name || "")}</AvatarFallback>
    </Avatar>
    <div className="font-poppins">
      <h3 className="text-white text-lg font-semibold">{app?.name}</h3>
      <p className="text-white text-sm">{app?.tag_line}</p>
    </div>
  </div>
);

// Global Top Overlay
const GlobalTopOverlay = () => (
  <div className="w-full h-fit flex items-center justify-between px-5">
    <Checkbox className="size-[28px] rounded-[0.4rem] border-[2.5px]" />
    <div className="size-fit flex items-center gap-2">
      <Button
        variant="darkGray"
        className="bg-slate-800 p-2 md:px-3.5 md:py-2.5 rounded-full"
      >
        <Icon.Copy className="size-6 text-white" />
        <p className="hidden md:flex">Copy</p>
      </Button>
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
        content="content"
        classNames={{
          content: "w-fit",
        }}
        placement="end"
      />
    </div>
  </div>
);

// Top Overlay Component
const TopOverlay = ({ app }: { app: AppType }) => (
  <div
    className={`absolute z-20 top-0 inset-x-0 flex ${app?.platform === "web" ? "pt-2 pb-[5px] sm:pt-2 sm:pb-[20px] md:pt-2 md:pb-[25px] lg:pt-3 lg:pb-[30px] xl:pt-4 xl:pb-[35px]" : "pt-4 pb-[10px] sm:pt-3 sm:pb-[30px] md:pt-4 md:pb-[35px] lg:pt-5 lg:pb-[40px] xl:pt-6 xl:pb-[45px]"} items-center justify-center gap-4 bg-screen-hover-gradient-to-bottom opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}
  >
    <GlobalTopOverlay />
  </div>
);

// Bottom Overlay Component
const BottomOverlay = ({ app }: { app: AppType }) => (
  <div
    className={`absolute z-20 bottom-0 inset-x-0 flex px-3 sm:px-4 md:px-4 lg:px-5 xl:px-6 ${app?.platform === "web" ? "pt-[5px] pb-[10px] sm:pb-[12px] sm:pt-[22px] md:pb-[10px] md:pt-[21px] lg:pb-[15px] lg:pt-[30px] xl:pb-[20px] xl:pt-[40px]" : "pb-[14px] pt-[15px] sm:pb-[15px] sm:pt-[27px] md:pb-[16px] md:pt-[33px] lg:pb-[21px] lg:pt-[45px] xl:pb-[26px] xl:pt-[55px]"} items-center justify-between bg-screen-hover-gradient-to-top opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}
  >
    <AppInfo app={app} />
  </div>
);

// Screen Overlay component that triggers hover animation
export const ScreenOverlay = ({ app }: { app: AppType }) => (
  <>
    <TopOverlay app={app} />
    <BottomOverlay app={app} />
  </>
);

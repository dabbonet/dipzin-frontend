"use client";

import React from "react";

import { Button } from "@/components/Shared/button";
import { Icon } from "@/components/UI/icon";
import { Dropdown } from "@/components/Shared/dropdown";
import { storage } from "@/utils/storage";
import type { ScreenData } from "@/types/screen-types";
import { DropdownMenuItem } from "@/components/UI/dropdown-menu";
import { CopyButton } from "../../button/CopyButton";
import { DownloadButton } from "../../button/DownloadButton";
import { Checkbox } from "@/components/UI/checkbox";

// Global Top Overlay
const GlobalTopOverlay = ({ screen }: { screen: ScreenData }) => {
  const handleCopyLink = () => {
    const link = `${window.location.origin}/screen/${screen.id}`;
    navigator.clipboard.writeText(link);
  }

  const screenUrl = screen.screen ? storage(screen.screen.hash + screen.screen.ext) : '';

  return (
    <div className="w-full h-fit flex justify-end px-5">
      <Dropdown
        trigger={(
          <Button
            size="md"
            className="rounded-full p-2 bg-slate-900/20"
            variant="darkGray"
            isIconOnly
          >
            <Icon.Dots className="size-6 text-white" />
          </Button>
          )}
        content={(
          <>
            <DropdownMenuItem onClick={handleCopyLink}>
              <Icon.Link className="size-6" />
              Copy Link
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild> */}
            <DownloadButton
              fullWidth
              variant="ghost"
              role="menuitem"
              className="px-2 py-1.5 h-full font-normal justify-start gap-2 hover:bg-slate-700 rounded-md"
              url={screenUrl}
              then={(
                <>
                  <Checkbox checked className="size-4 shrink-0" />
                  <p className="hidden sm:block">Downloaded</p>
                </>
          )}
            >
              <Icon.Download className="size-4 shrink-0" />
              <p className="hidden sm:block">Download</p>
            </DownloadButton>
            {/* </DropdownMenuItem> */}
          </>
          )}
        classNames={{
          content: "w-fit",
        }}
        placement="end"
      />
    </div>
  );
};

// Top Overlay Component
const TopOverlay = ({ screen }: { screen: ScreenData }) => (
  <div
    className={`absolute z-20 top-0 inset-x-0 flex ${screen.app?.platform === "web" ? "pt-2 pb-[5px] sm:pt-2 sm:pb-[20px] md:pt-2 md:pb-[25px] lg:pt-3 lg:pb-[30px] xl:pt-4 xl:pb-[35px]" : "pt-4 pb-[10px] sm:pt-3 sm:pb-[30px] md:pt-4 md:pb-[35px] lg:pt-5 lg:pb-[40px] xl:pt-6 xl:pb-[45px]"} items-center justify-center gap-4 bg-screen-hover-gradient-to-bottom opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out hidden sm:flex`}
  >
    <GlobalTopOverlay screen={screen} />
  </div>
);

// Bottom Overlay Component
const BottomOverlay = ({ screen }: { screen: ScreenData }) => {
  const screenUrl = screen.screen ? storage(screen.screen.hash + screen.screen.ext) : '';

  return (
    <div
      className={`absolute z-20 bottom-0 inset-x-0 flex px-3 sm:px-4 md:px-4 lg:px-5 xl:px-6 ${screen.app?.platform === "web" ? "pt-[5px] pb-[10px] sm:pb-[12px] sm:pt-[22px] md:pb-[10px] md:pt-[21px] lg:pb-[15px] lg:pt-[30px] xl:pb-[20px] xl:pt-[40px]" : "pb-[14px] pt-[15px] sm:pb-[15px] sm:pt-[27px] md:pb-[16px] md:pt-[33px] lg:pb-[21px] lg:pt-[45px] xl:pb-[26px] xl:pt-[55px]"} items-center justify-between bg-screen-hover-gradient-to-top opacity-0 group-hover:opacity-100  transition-opacity duration-300 ease-in-out hidden sm:flex`}
    >
      <CopyButton
        url={screenUrl}
        then={
            (
              <>
                <Checkbox checked className="size-6" />
                Copied
              </>
            )
          }
        variant="darkGray"
        className="flex-1 hidden md:flex"
        fullWidth
      >
        <Icon.Copy className="size-6 text-white" />
        Copy
      </CopyButton>
    </div>
  );
}

// Screen Overlay component that triggers hover animation
export const GlobalScreenOverlay = ({ screen }: { screen: ScreenData }) => (
  <>
    <TopOverlay screen={screen} />
    <BottomOverlay screen={screen} />
  </>
);

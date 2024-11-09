"use client";

import useIsMobile from "@/hooks/useIsMobile";
import React from "react";
import useScreensOverview from "./_hooks/useScreensOverview";
import { Button } from "@/components/Shared/button";
import { Icon } from "@/components/UI/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import {
  ActionButtons,
  ScreenAppDetails,
  ScreenData,
  WebScreenTabs,
} from "./screen-details";
import FullScreen from "./_components/FullScreen";
import { Screen } from "@/components/Shared/screen";

interface ScreenOverviewProps {
  screenId: number;
}

const ScreenOverview = ({ screenId }: ScreenOverviewProps) => {
  const {
    currentScreen,
    toggleFullScreen,
    showFullScreen,
    goToNextScreen,
    goToPrevScreen,
    hasNextScreen,
    hasPrevScreen,
    loading,
    hasFullPage
  } = useScreensOverview(screenId);
  const isMobile = useIsMobile();

  if (!currentScreen) return null;

  return (
    <div
      key={currentScreen.id}
      className="flex flex-col gap-8 size-full items-start justify-center sm:justify-between transition-opacity duration-500 opacity-100 overflow-hidden"
    >
      <div className="relative w-full h-fit flex items-center justify-between">
        <ScreenAppDetails app={currentScreen.app} />
        {currentScreen.app.platform === "web" && (
          <WebScreenTabs
            toggleFullScreen={toggleFullScreen}
            isFullScreen={showFullScreen}
          />
        )}
        {!isMobile && <ActionButtons screen={currentScreen} />}
      </div>

      <div className="size-full max-w-[55vw] overflow-hidden mx-auto flex items-center justify-between gap-2">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                className="hidden md:flex size-16 bg-slate-300 text-slate-900 rounded-full p-4 shrink-0"
                variant="liteGray"
                isIconOnly
                disabled={!hasPrevScreen}
                onClick={goToPrevScreen}
              >
                <Icon.ArrowLeft className="size-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="flex items-center justify-center gap-1">
              Previous
              <Icon.ArrowCircleLeft className="size-6" />
              <TooltipArrow style={{ fill: "#007160" }} width={14} height={8} />
            </TooltipContent>
          </Tooltip>
          <div className="flex-1 flex justify-center items-center">
            {showFullScreen && loading && (
            <div className="text-slate-500">Loading full page view...</div>
            )}
            {showFullScreen && !hasFullPage && !loading && (
            <div className="text-slate-500">Screen Does Not Have A Full Page</div>
            )}
            {showFullScreen && hasFullPage && (
            <FullScreen currentScreen={currentScreen} />
            )}
            {!showFullScreen && (
            <Screen screen={currentScreen} overlay={false} />
            )}
          </div>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                className="hidden sm:flex size-16 bg-slate-300 text-slate-900 rounded-full p-4 shrink-0"
                variant="liteGray"
                isIconOnly
                disabled={!hasNextScreen}
                onClick={goToNextScreen}
              >
                <Icon.ArrowRight className="size-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="flex items-center justify-center gap-1">
              Next
              <Icon.ArrowCircleRight className="size-6" />
              <TooltipArrow style={{ fill: "#007160" }} width={14} height={8} />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {!isMobile && (
        <ScreenData
          tags={currentScreen.tags}
          components={currentScreen.components}
          colors={currentScreen.colors}
        />
      )}

      {isMobile && <ActionButtons screen={currentScreen} />}
    </div>
  );
};

export default ScreenOverview;

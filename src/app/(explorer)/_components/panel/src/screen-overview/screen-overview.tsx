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
import { Screen } from "@/components/Shared/screen";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/UI/dialog";

interface ScreenOverviewProps {
  screenId: number;
}

const ScreenContent = ({
  currentScreen,
  showFullScreen,
  hasFullPage,
  loading,
  isMobile,
}) => {
  if (showFullScreen) {
    if (loading) {
      return <p className="text-slate-500">Loading full page view...</p>;
    }

    if (!hasFullPage) {
      return <p className="text-slate-500">Screen Does Not Have A Full Page</p>;
    }

    return (
      <div className="size-full relative">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="darkGray"
              className="absolute p-2 rounded-full top-4 right-4 z-10 opacity-75 text-white"
            >
              <Icon.Expand className="size-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="size-full fixed sm:max-h-[90vh] sm:max-w-[95vw]">
            <DialogClose asChild>
              <Button
                variant="darkGray"
                className="absolute p-2 rounded-full top-4 right-4 z-10 opacity-75 text-white"
              >
                <Icon.Collapse className="size-6" />
              </Button>
            </DialogClose>
            <div className="size-full overflow-y-auto">
              <Screen
                className="h-auto sm:rounded-none"
                borderless
                overlay={false}
                screen={currentScreen}
              />
            </div>
          </DialogContent>
        </Dialog>
        <div className="size-full overflow-y-auto">
          <Screen
            className="h-auto sm:rounded-none"
            borderless
            overlay={false}
            screen={currentScreen}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col items-center justify-center">
      <Screen
        className={cn(
          "w-fit h-auto",
          currentScreen.app.platform === "web" && "h-fit w-fit",
          // aspectRatio
        )}
        screen={currentScreen}
        overlay={false}
        borderless
      />
      {isMobile && (
        <div className="w-full h-fit flex mt-4">
          <ActionButtons screen={currentScreen} />
        </div>
      )}
    </div>
  );
};

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
    hasFullPage,
    error,
  } = useScreensOverview(screenId);
  const isMobile = useIsMobile();

  // Handle error state - show error message instead of crashing
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center size-full p-8 text-center">
        <Icon.ImageOff className="size-16 text-slate-500 mb-4" />
        <h2 className="text-xl font-semibold text-slate-300 mb-2">Screen Not Found</h2>
        <p className="text-slate-500">{error}</p>
      </div>
    );
  }

  if (!currentScreen) return null;

  return (
    <div
      key={currentScreen.id}
      className="flex flex-col gap-2 size-full items-start justify-center sm:justify-between transition-opacity duration-500 opacity-100 p-4 xl:p-6"
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

      <div className="size-full max-w-full sm:max-w-[80vw] xl:max-w-[65vw] max-h-[75vh] sm:max-h-[65vh] 2xl:max-h-[69vh] mx-auto flex items-center justify-between gap-2">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                className="hidden md:flex size-10 xl:size-16 bg-slate-300 text-slate-900 rounded-full p-4 shrink-0"
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
          <ScreenContent
            currentScreen={currentScreen}
            showFullScreen={showFullScreen}
            hasFullPage={hasFullPage}
            loading={loading}
            isMobile={isMobile}
          />
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                className="hidden sm:flex size-10 xl:size-16 bg-slate-300 text-slate-900 rounded-full p-4 shrink-0"
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
    </div>
  );
};

export default ScreenOverview;

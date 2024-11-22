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

interface ScreenOverviewProps {
  screenId: number;
}

const ScreenContent = ({
  currentScreen,
  showFullScreen,
  hasFullPage,
  loading,
  isMobile
}) => {
  if (showFullScreen) {
    if (loading) {
      return <p className="text-slate-500">Loading full page view...</p>;
    }

    if (!hasFullPage) {
      return <p className="text-slate-500">Screen Does Not Have A Full Page</p>;
    }

    return (
      <Screen className="fixed inset-0 z-40 left-1/2 -translate-x-1/2 translate-y-[-5vh] w-screen h-screen max-h-none overflow-y-auto rounded-none sm:rounded-none" borderless overlay={false} screen={currentScreen} />
    );
  }

  return (
    <div className="size-full flex flex-col items-center justify-center">
      <Screen
        className={currentScreen.app.platform === "web" ? "h-fit w-full" : "w-fit h-full"}
        screen={currentScreen}
        overlay={false}
        borderless={!isMobile}
      />
      {isMobile && (
        <div className="w-full h-fit flex mt-4 mx-[20%]">
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
    hasFullPage
  } = useScreensOverview(screenId);
  const isMobile = useIsMobile();

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

      <div className="size-full max-w-full sm:max-w-[80vw] xl:max-w-[65vw] mx-auto flex items-center justify-between gap-2">
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

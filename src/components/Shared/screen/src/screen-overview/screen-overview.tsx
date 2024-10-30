"use client"

import { Tabs } from "@/components/UI/tabs";
import useIsMobile from "@/hooks/useIsMobile";
import React from 'react';
import { MobileActions } from './components/MobileActions';
import { MobileHeader } from './components/MobileHeader';
import { NavigationButtons } from './components/NavigationButtons';
import { ScreenDetails } from './screen-details';
// import { PaginationDots } from './components/PaginationDots';
import { Screen } from "@/components/Shared/screen";
import { cn } from '@/lib/utils';
import useScreensOverview from './_hooks/useScreensOverview';

interface ScreenOverviewProps {
  screenId: number;
}

const ScreenOverview = ({ screenId }: ScreenOverviewProps) => {
  const {
    currentScreen,
    goToNextScreen,
    goToPrevScreen,
    hasNextScreen,
    hasPrevScreen,
  } = useScreensOverview(screenId);
  const isMobile = useIsMobile();

  if (!currentScreen) return null;

  return (
    <Tabs key={currentScreen.id} className="flex flex-col size-full items-start md:items-center justify-center transition-opacity duration-500 opacity-100">
      {isMobile && <MobileHeader screen={currentScreen} />}

      {!isMobile && (
        <div className="fixed top-0 z-20 flex items-center justify-center">
          <ScreenDetails
            screen={currentScreen}
            type={currentScreen?.app?.platform === "web" ? "wide" : "default"}
          />
        </div>
      )}

      <div className="size-fit flex flex-col items-center justify-center relative md:pt-[10vh]">
        <div className={cn(`w-full mx-auto pr-[5vw] pl-0 md:pr-0 max-w-[75vw] ${currentScreen.app.platform === "web" ? 'md:max-w-[60vw]' : 'md:max-w-[calc(18vw+2rem)]'}`)}>
          <Screen screen={currentScreen} overlay={false} />

          <NavigationButtons
            onPrevClick={goToPrevScreen}
            onNextClick={goToNextScreen}
            prevDisabled={!hasPrevScreen}
            nextDisabled={!hasNextScreen}
          />

          {isMobile && (
            <>
              <MobileActions />
              {/* <PaginationDots
                totalSlides={pagination.totalPages}
                currentIndex={pagination.offset}
              /> */}
            </>
          )}
        </div>
      </div>
    </Tabs>
  );
};

export default ScreenOverview;

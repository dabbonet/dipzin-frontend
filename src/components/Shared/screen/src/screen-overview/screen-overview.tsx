"use client";

import React from 'react';
import { Screen } from "@/components/Shared/screen";
import { Tabs } from "@/components/UI/tabs";
import useIsMobile from "@/hooks/useIsMobile";
import type { ScreenData } from '@/types/screen-types';
import useKeyboardNavigation from '@/hooks/useKeyboardNavigation';
import { useCarousel } from './_hooks/useCarousel';
import { MobileHeader } from './components/MobileHeader';
import { ScreenDetails } from './screen-details';
import { NavigationButtons } from './components/NavigationButtons';
import { MobileActions } from './components/MobileActions';
import { PaginationDots } from './components/PaginationDots';

interface ScreenOverviewProps {
  screens: ScreenData[];
  initialIndex: number;
}

const ScreenOverview = ({ screens, initialIndex }: ScreenOverviewProps) => {
  const {
    emblaRef,
    currentIndex,
    prevBtnDisabled,
    nextBtnDisabled,
    scrollPrev,
    scrollNext
  } = useCarousel(initialIndex);

  // Get the current screen based on currentIndex
  const currentScreen = screens[currentIndex];
  const isWeb = currentScreen?.app.platform === "web";
  const isMobile = useIsMobile();

  useKeyboardNavigation({
    onNext: scrollNext,
    onPrev: scrollPrev,
    isFirstItem: prevBtnDisabled,
    isLastItem: nextBtnDisabled
  });

  return (
    <Tabs className="flex flex-col size-full items-center justify-center">
      {isMobile && currentScreen && <MobileHeader screen={currentScreen} />}

      {!isMobile && currentScreen && (
        <div className="fixed top-0 z-20 flex items-center justify-center">
          <ScreenDetails
            key={`${currentScreen.id}-${currentIndex}`} // Add screen.id to the key
            screen={currentScreen}
            type={isWeb ? "wide" : "default"}
          />
        </div>
      )}

      <div className="size-full flex flex-col items-center justify-center relative md:pt-[10vh]">
        <div className="w-full max-w-[90vw] md:max-w-[calc(18vw+2rem)] mx-auto pr-[5vw] pl-0 md:pr-0">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {screens.map((screenItem) => (
                <div
                  key={screenItem.id}
                  className="relative flex-[0_0_100%] min-w-0 flex justify-center items-center px-4"
                >
                  <div className="w-full">
                    <Screen screen={screenItem} borderless={!isMobile} overlay={false} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <NavigationButtons
            onPrevClick={scrollPrev}
            onNextClick={scrollNext}
            prevDisabled={prevBtnDisabled}
            nextDisabled={nextBtnDisabled}
          />

          {isMobile && (
          <>
            <MobileActions />
            <PaginationDots
              totalSlides={screens.length}
              currentIndex={currentIndex}
            />
          </>
          )}
        </div>
      </div>
    </Tabs>
  );
};

export default ScreenOverview;

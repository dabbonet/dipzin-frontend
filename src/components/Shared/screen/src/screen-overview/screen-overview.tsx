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
import { cn } from '@/lib/utils';

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
    <Tabs className="flex flex-col size-full items-start md:items-center justify-center">
      {isMobile && currentScreen && <MobileHeader screen={currentScreen} />}

      {!isMobile && currentScreen && (
        <div className="fixed top-0 z-20 flex items-center justify-center">
          <ScreenDetails
            screen={currentScreen}
            type={isWeb ? "wide" : "default"}
          />
        </div>
      )}

      <div className="size-fit flex flex-col items-center justify-center relative md:pt-[10vh]">
        <div className={cn(`w-full mx-auto pr-[5vw] pl-0 md:pr-0 max-w-[75vw] ${isWeb ? 'md:max-w-[60vw]' : 'md:max-w-[calc(18vw+2rem)]'}`)}>
          <div className="border-[10px] bg-black-950 border-[#0f172aa6] rounded-[2rem] overflow-hidden p-0" ref={emblaRef}>
            <div className="flex">
              {screens.map((screenItem) => (
                <div
                  key={screenItem.id}
                  className="relative flex-[0_0_100%] min-w-0 flex justify-center items-center rounded-3xl overflow-hidden"
                >
                  <Screen screen={screenItem} borderless overlay={false} />
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

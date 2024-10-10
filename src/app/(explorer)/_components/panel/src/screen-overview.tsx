"use client"

import React from 'react';
import { Screen } from "@/components/Shared/screen";
import { ScreenDetails } from "@/components/Shared/screen/src/screen-details";
import { Tabs } from "@/components/UI/tabs";
import useIsMobile from "@/hooks/useIsMobile";
import type { ScreenData } from "@/types/screen-types";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Shared/avatar';
import { Button } from '@/components/Shared/button';
import { Icon } from '@/components/UI/icon';
import { Carousel, CarouselContent, CarouselItem } from "@/components/UI/carousel";
import { extractInitials } from '@/utils/StringUtils';
import { DialogClose } from '@/components/UI/dialog';

type ScreenOverviewProps = {
  screen: ScreenData;
};

const ScreenOverview = ({ screen }: ScreenOverviewProps) => {
  const isWeb = screen.platform === "web";
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src={screen.app.icon.url} alt={screen.app.name} />
              <AvatarFallback>{extractInitials(screen.app.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-medium text-white">{screen.app.name}</h3>
              <p className="text-sm text-gray-400">{screen.app.tag_line}</p>
            </div>
          </div>
          <DialogClose>
            <Icon.Close className="size-5" />
          </DialogClose>
        </div>
        <Carousel className="w-full grow">
          <CarouselContent>
            <CarouselItem className="flex justify-center items-center">
              <div className="flex items-center gap-4">
                <Image
                  width={300}
                  height={650}
                  src={screen.screen.url}
                  alt={`${screen.app.name} screen shot`}
                  className="rounded-2xl"
                />
                <div className="flex flex-col gap-4">
                  <Button className="p-2" size="sm" variant="darkGray" isIconOnly>
                    <Icon.Copy2 className="size-5" />
                  </Button>
                  <Button className="p-2" size="sm" variant="darkGray" isIconOnly>
                    <Icon.Download className="size-5" />
                  </Button>
                  <Button className="p-2" size="sm" variant="darkGray" isIconOnly>
                    <Icon.EllipsisHorizontal className="size-5" />
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center mt-4">
          {/* {screen.screens.map((_, index) => (
            <span
              key={index}
              className={`size-2 rounded-full mx-1 ${
                index === 0 ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))} */}
        </div>
      </div>
    );
  }

  return (
    <Tabs className="flex flex-col items-center justify-center relative pt-[7vh]">
      <div className="fixed top-0">
        <ScreenDetails data={screen} type={isWeb ? "wide" : "default"} />
      </div>
      <Screen />
      <Image
        width={isWeb ? 1000 : 300}
        height={isWeb ? 600 : 650}
        src={screen.screen.url}
        alt={`${screen.app.name} screen shot`}
        className="rounded-2xl"
      />
    </Tabs>
  );
};

export default ScreenOverview;

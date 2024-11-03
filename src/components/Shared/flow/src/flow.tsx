"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { storage } from '@/utils/storage';
import type { FlowType } from '@/types/app-types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Shared/avatar";
import { extractInitials, mergeIconFromObject } from '@/utils/StringUtils';
import { Screen } from '@/components/Shared/screen';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { Button } from '../../button';
import { Icon } from '@/components/UI/icon';
import {
  Carousel, CarouselContent, CarouselItem
} from "@/components/UI/carousel";
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import useIsMobile from '@/hooks/useIsMobile';

const Flow = ({ flow, view }: { flow: FlowType, view?: "default" | "opened" }) => {
  const { query } = useQuery();
  const isMobile = useIsMobile()

  if (!flow) return null;
  const icon = mergeIconFromObject(flow?.app?.icon as any || "");
  const widthClass = query.platform !== 'web' ? 'w-[calc(100%/6)]' : 'w-[calc(100%/2.5)]';

  return (
    <motion.div
      className="relative size-full rounded-2xl flex items-center justify-center pb-10"
      initial="initial"
      whileHover="hover"
      animate="initial"
      transition={{ duration: 0.3 }}
    >
      <div className="bg-transparent md:bg-slate-900 size-full rounded-2xl">
        <div className="flex justify-between w-full py-4 px-8">
          <div className="flex gap-4 items-center">
            <h3 className="text-white text-xl font-semibold whitespace-nowrap">
              {flow.name}
            </h3>
            <p className="text-slate-400 whitespace-nowrap">
              (
              {' '}
              {flow && flow?.flow_screens?.length}
              {' '}
              Screens )
            </p>
            <div className="flex items-center gap-4 bg-transparent md:bg-slate-800/60 py-2 ps-2 pe-6 rounded-full">
              <Avatar>
                <AvatarImage src={storage(icon)} alt={flow.app?.name} />
                <AvatarFallback>
                  {flow.app && extractInitials(flow.app.name)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-medium text-white">{flow.app?.name}</h3>
              <p className="hidden md:flex text-xs text-slate-400 whitespace-nowrap">
                {flow.app?.tag_line}
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button variant="darkGray" className="bg-slate-800">
              <Icon.Download className="size-6 fill-white stroke-white" />
              Download
            </Button>
            <Button className="rounded-full p-2 bg-slate-800" variant="darkGray">
              <Icon.Dots className="size-6 fill-white stroke-white" />
            </Button>
          </div>
        </div>
        <div>
          {view === "opened" && isMobile ? (
            <Carousel className="flex flex-col items-center justify-center gap-4 size-full px-4">
              <CarouselContent>
                {flow && flow?.flow_screens?.map((screen) => (
                  <CarouselItem key={screen.id} className="max-w-[80vw]">
                    <Screen screen={screen.screen} overlay={false} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-4 flex gap-2">
                <Button variant="darkGray">Download</Button>
                <Button variant="darkGray">Copy</Button>
                <Button isIconOnly className="p-2" variant="darkGray"><FolderPlusIcon /></Button>
              </div>
            </Carousel>
          ) : (
            <div className="flex overflow-x-auto">
              {flow && flow?.flow_screens?.map((screen) => (
                <div
                  key={screen.id}
                  className={`shrink-0 ${widthClass} h-auto flex justify-center items-center mb-6`}
                >
                  <Screen key={screen.id} screen={screen.screen || {}} overlay={false} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Flow;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

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
  DropdownMenuItem,
} from "@/components/UI/dropdown-menu"
import { Dropdown } from '../../dropdown';
import { cn } from '@/lib/utils';
import { DownloadButton } from '../../button/DownloadButton';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/UI/checkbox';

const Flow = ({ flow }: { flow: FlowType }) => {
  const { query, setApps } = useQuery();
  const router = useRouter()

  if (!flow) return null;

  const screensUrls = flow?.flow_screens?.map(
    (screen) => {
      const hash = screen.screen?.screen?.hash || '';
      const ext = screen.screen?.screen?.ext || '';
      return storage(hash + ext);
    }
  ) || [];

  const handleCopyLink = () => {
    const link = `${window.location.origin}/flow/${flow.id}`;
    navigator.clipboard.writeText(link);
  }

  const handleRedirect = () => {
    router.push(`/flow/${flow.id}`, { scroll: false });
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleAppClick = (e: React.MouseEvent) => {
    setApps((prevApps) => {
      const isAppSelected = prevApps.some((selectedApp) => selectedApp.id === flow.app.id);
      if (!isAppSelected) {
        return [...prevApps, flow.app];
      }
      return prevApps;
    });
    stopPropagation(e)
  };

  const icon = mergeIconFromObject(flow?.app?.icon as any || "");
  const widthClass = query.platform !== 'web' ? 'w-[calc(100%/3)] sm:w-[calc(100%/6)]' : 'w-[calc(100%/1.5)] sm:w-[calc(100%/2.5)]';

  return (
    <motion.div
      className={cn(`relative size-full rounded-2xl flex items-center justify-center cursor-pointer pb-10`)}
      initial="initial"
      whileHover="hover"
      animate="initial"
      transition={{ duration: 0.3 }}
      onClick={handleRedirect}
    >
      <div className={cn(`bg-slate-900 size-full rounded-2xl z-5`)}>
        <div className={cn(`flex justify-between w-full p-4 sm:px-8`)}>
          <div className="flex gap-1.5 sm:gap-4 items-center">
            <div className="flex flex-wrap gap-1.5 sm:gap-4 items-center">
              {flow.name}
              <p className="text-slate-400 whitespace-nowrap">
                (
                {flow?.flow_screens?.length}
                {" "}
                Screens)
              </p>
            </div>
            <div onClick={handleAppClick} className={cn(`bg-slate-800/60 flex items-center gap-1.5 sm:gap-4 py-2 ps-2 pe-6 rounded-full`)}>
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
          <div className="hidden md:flex items-center gap-4 z-10" onClick={stopPropagation}>
            <DownloadButton
              variant="darkGray"
              url={screensUrls as unknown as string[]}
              then={(
                <>
                  <Checkbox checked className="size-6" />
                  <p className="hidden sm:block">Downloaded</p>
                </>
              )}
            >
              <Icon.Download className="size-6 fill-white stroke-white" />
              <p className="hidden sm:block">Download</p>
            </DownloadButton>

            <Dropdown
              trigger={(
                <Button className="rounded-full aspect-square shrink-0 p-2 bg-slate-800" variant="darkGray">
                  <Icon.Dots className="size-6 fill-white stroke-white" />
                </Button>
              )}
              content={(
                <DropdownMenuItem onClick={handleCopyLink}>
                  <Icon.Link className="size-6" />
                  Copy Link
                </DropdownMenuItem>
              )}
              placement="end"
            />
          </div>
        </div>
        <div className="size-full flex overflow-x-auto mb-6 px-4 gap-1">
          {flow?.flow_screens?.map((screen) => (
            <div
              key={screen.id}
              className={`shrink-0 ${widthClass} h-fit flex justify-center items-center`}
            >
              <Screen onClick={stopPropagation} size="medium" key={screen.id} screen={{ ...screen.screen, app: flow.app }} overlay="global" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Flow;

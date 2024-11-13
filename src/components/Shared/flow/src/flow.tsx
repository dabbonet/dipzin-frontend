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
import useIsMobile from '@/hooks/useIsMobile';
import Link from 'next/link';
import { useDownloadScreen } from '@/hooks/useDownloadScreen';
import {
  DropdownMenuItem,
} from "@/components/UI/dropdown-menu"
import { Dropdown } from '../../dropdown';
import { cn } from '@/lib/utils';
import { DialogClose } from '@/components/UI/dialog';
import { useCopyScreen } from '@/hooks/useCopyScreen';
import { DownloadButton } from '../../button/DownloadButton';

const Flow = ({ flow, view }: { flow: FlowType, view?: "default" | "opened" }) => {
  const { query, setFilters } = useQuery();
  const isMobile = useIsMobile()
  const { copyImageToClipboard, loading: copying } = useCopyScreen();
  const { downloadScreen, loading: downloading } = useDownloadScreen();

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

  const handleAppClick = () => {
    const handleStateAndUrlUpdate = (pattern: string, value: string) => {
      const newFilter = { name: value, pattern };
      setFilters((prevFilters) => [...prevFilters, newFilter]);
    };
    handleStateAndUrlUpdate('apps', flow.app.name);
  }

  const icon = mergeIconFromObject(flow?.app?.icon as any || "");
  const widthClass = query.platform !== 'web' ? 'w-[calc(100%/3)] sm:w-[calc(100%/6)]' : 'w-[calc(100%/1.5)] sm:w-[calc(100%/2.5)]';

  return (
    <motion.div
      className={cn(`relative size-full rounded-2xl flex items-center justify-center ${view === "opened" ? "pb-0" : "pb-10"}`)}
      initial="initial"
      whileHover="hover"
      animate="initial"
      transition={{ duration: 0.3 }}
    >
      <div className={cn(`${view === "opened" ? "bg-transparent" : "bg-slate-900"} size-full rounded-2xl`)}>
        <div className={cn(`flex justify-between w-full ${view === "opened" ? "p-0" : "p-4"} sm:px-8`)}>
          <div className="flex gap-1.5 sm:gap-4 items-center">
            <div className="flex flex-wrap gap-1.5 sm:gap-4 items-center">
              <Link className="text-white text-xl font-semibold whitespace-normal sm:whitespace-nowrap" href={`/flow/${flow.id}`} scroll={false}>
                {flow.name}
              </Link>
              <p className="text-slate-400 whitespace-nowrap">
                (
                {' '}
                {flow && flow?.flow_screens?.length}
                {' '}
                Screens )
              </p>
            </div>
            <button type="button" onClick={handleAppClick} className={cn(`${view === "opened" ? "bg-transparent" : "bg-slate-800/60"} flex items-center gap-1.5 sm:gap-4 py-2 ps-2 pe-6 rounded-full`)}>
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
            </button>
            {view === "opened" && isMobile && (
            <DialogClose>
              <Icon.Close className="size-6" />
            </DialogClose>
            )}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <DownloadButton
              variant="darkGray"
              url={screensUrls as unknown as string[]}
              then={(
                <>
                  <Icon.Check className="size-6" />
                  <p className="hidden sm:block">Downloaded!</p>
                </>
          )}
            >
              <Icon.Download className="size-6 fill-white stroke-white" />
              <p className="hidden sm:block">Download</p>
            </DownloadButton>

            <Dropdown
              trigger={(
                <Button className="rounded-full p-2 bg-slate-800" variant="darkGray">
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
        {view === "opened" && isMobile ? (
          <Carousel>
            <CarouselContent>
              {flow && flow?.flow_screens?.map((screen) => (
                <CarouselItem className="flex flex-col items-center justify-center gap-2 size-full pr-8" key={screen.id}>
                  <Screen screen={screen.screen} overlay={false} />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyImageToClipboard(storage(screen.screen.screen.hash + screen.screen.screen.ext))}
                      disabled={copying}
                      size="md"
                      variant="liteGray"
                      className="flex-1"
                    >
                      <Icon.Copy className="size-6" />
                      {copying ? "Copying..." : "Copy"}
                    </Button>

                    <Button
                      onClick={() => downloadScreen(storage(screen.screen.screen.hash + screen.screen.screen.ext))}
                      disabled={downloading}
                      size="md"
                      variant="darkGray"
                      className="flex-1"
                    >
                      <Icon.Download className="size-6" />
                      {downloading ? "Downloading..." : "Download"}
                    </Button>
                    <Button
                      isIconOnly
                      size="md"
                      variant="darkGray"
                    >
                      <Icon.Save className="size-6" />
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="size-full flex overflow-x-auto">
            {flow && flow?.flow_screens?.map((screen) => (
              <div
                key={screen.id}
                className={`shrink-0 ${widthClass} h-auto flex justify-center items-center mb-6`}
              >
                <Screen size="medium" key={screen.id} screen={screen.screen || {}} overlay={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Flow;

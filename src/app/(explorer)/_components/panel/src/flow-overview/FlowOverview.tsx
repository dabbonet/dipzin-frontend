"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Shared/avatar";
import { extractInitials, mergeIconFromObject } from '@/utils/StringUtils';
import { Screen } from '@/components/Shared/screen';
import { Icon } from '@/components/UI/icon';
import useIsMobile from '@/hooks/useIsMobile';
import { DropdownMenuItem } from "@/components/UI/dropdown-menu";
import { cn } from '@/lib/utils';
import { DialogClose } from '@/components/UI/dialog';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/UI/checkbox';
import { Button } from "@/components/Shared/button";
import { DownloadButton } from "@/components/Shared/button/DownloadButton";
import { Dropdown } from "@/components/Shared/dropdown";
import { storage } from "@/utils/storage";
import { motion } from "framer-motion";
import useFlowOverview from "./_hooks/useFlowOverview";
import { useQuery } from "@/app/(explorer)/_hooks/useQuery";
import { Separator } from "@/components/UI/separator";

interface FlowOverviewProps {
  flowId: number;
}

const FlowOverview = ({ flowId }: FlowOverviewProps) => {
  const {
    currentFlow,
    currentScreen,
    emblaRef,
  } = useFlowOverview(flowId);

  const { setApps } = useQuery();
  const isMobile = useIsMobile();
  const router = useRouter();

  const icon = mergeIconFromObject(currentFlow?.app?.icon as any || "");

  if (!currentFlow) return null;

  const isWeb = currentFlow?.app.platform === 'web';

  const handleCopyLink = () => {
    const url = `${window.location.origin}/flow/${currentFlow.id}`;
    navigator.clipboard.writeText(url);
  }

  const screensUrls = currentFlow?.flow_screens?.map(
    (screen) => {
      const hash = screen.screen?.screen?.hash || '';
      const ext = screen.screen?.screen?.ext || '';
      return storage(hash + ext);
    }
  ) || [];

  const handleRedirect = () => {
    router.push(`/flow/${currentFlow.id}`, { scroll: false });
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleAppClick = (e: React.MouseEvent) => {
    setApps((prevApps) => {
      const isAppSelected = prevApps.some((selectedApp) => selectedApp.id === currentFlow.app.id);
      if (!isAppSelected) {
        return [...prevApps, currentFlow.app];
      }
      return prevApps;
    });
    stopPropagation(e)
  };

  return (
    <motion.div
      className={cn(`relative size-full rounded-2xl flex flex-col items-center justify-center cursor-pointer`)}
      initial="initial"
      whileHover="hover"
      animate="initial"
      transition={{ duration: 0.3 }}
      onClick={handleRedirect}
    >
      <div className={cn(`flex self-start justify-between w-full p-5`)}>
        <div className="flex gap-1.5 sm:gap-4 items-center">
          <div className="flex flex-wrap gap-1.5 sm:gap-4 items-center">
            {currentFlow.name}
            <p className="text-slate-400 whitespace-nowrap">
              (
              {' '}
              {currentFlow?.flow_screens?.length}
              {' '}
              Screens )
            </p>
          </div>
          <DialogClose
            onClick={handleAppClick}
            className={cn(`bg-transparent outline-none flex items-center gap-1.5 sm:gap-4 py-2 ps-2 pe-6 rounded-full`)}
          >
            <Avatar>
              <AvatarImage src={storage(icon)} alt={currentFlow.app?.name} />
              <AvatarFallback>
                {currentFlow.app && extractInitials(currentFlow.app.name)}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-medium text-white line-clamp-1 truncate">{currentFlow.app?.name}</h3>
            <p className="hidden md:flex text-xs text-slate-400 whitespace-nowrap">
              {currentFlow.app?.tag_line}
            </p>
          </DialogClose>
          <DialogClose className="flex sm:hidden">
            <Icon.Close className="size-6" />
          </DialogClose>
        </div>
        <div
          className="hidden md:flex items-center gap-4 z-10"
          onClick={stopPropagation}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              stopPropagation(e as any);
            }
          }}
        >
          <DownloadButton
            size="lg"
            variant="darkGray"
            url={screensUrls}
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
              <Button
                size="lg"
                className="rounded-full aspect-square shrink-0 p-2 bg-slate-800"
                variant="darkGray"
              >
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
          <Separator orientation="vertical" className="hidden sm:flex h-8" />
          <DialogClose className="hidden sm:flex" asChild>
            <Button
              className="rounded-full"
              size="lg"
              variant="darkGray"
              isIconOnly
            >
              <Icon.Close className="size-6" />
            </Button>
          </DialogClose>
        </div>
      </div>
      {isMobile ? (
        <div className={`${isWeb ? "w-full h-fit" : "size-full"} flex flex-col items-center self-center place-self-center my-auto`}>
          <div className={`relative flex ${isWeb ? "w-full h-fit" : "size-full"} overflow-hidden`}>
            <div ref={emblaRef} className={`${isWeb ? "w-full h-fit" : "size-full"} overflow-hidden`}>
              <div className="flex size-full">
                {currentFlow?.flow_screens?.map((screen) => (
                  <div key={screen.id} className={`size-full mx-1 ${isWeb ? "flex-[0_0_90%]" : "flex-[0_0_70%]"}`}>
                    <Screen className={`w-fit flex m-auto ${isWeb ? "w-full h-fit" : "h-full max-h-[70vh]"}`} borderless screen={{ ...screen.screen, app: { ...currentFlow.app } }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 p-5">
            <DownloadButton
              variant="darkGray"
              url={currentFlow?.flow_screens?.[currentScreen]?.screen?.screen
                ? storage(currentFlow.flow_screens[currentScreen].screen?.screen?.hash + currentFlow.flow_screens[currentScreen].screen?.screen?.ext)
                : ''}
              then={(
                <>
                  <Checkbox checked className="size-6" />
                  <p>Downloaded</p>
                </>
              )}
            >
              <Icon.Download className="size-6" />
              Download
            </DownloadButton>
          </div>
        </div>
      ) : (
        <div className="size-full flex overflow-x-auto px-5 p-2">
          {currentFlow?.flow_screens?.map((screen) => (
            <Screen
              key={screen.id}
              className="shrink-0 w-fit max-h-[75vh]"
              onClick={stopPropagation}
              screen={{ ...screen.screen, app: currentFlow.app }}
              overlay="global"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FlowOverview;

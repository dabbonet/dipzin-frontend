import React, { useState } from "react";
import { Pill } from "@/components/Shared/pill";
import { extractInitials, mergeIconFromObject } from "@/utils/StringUtils";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/Shared/avatar";
import { Icon } from "@/components/UI/icon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Shared/button";
import { Dropdown } from "@/components/Shared/dropdown";
import { DialogClose } from "@/components/UI/dialog";
import { storage } from "@/utils/storage";
import type { ScreenData as ScreenType } from "@/types/screen-types";
import { Separator } from "@/components/UI/separator";
import { useCopyScreen } from "@/hooks/useCopyScreen";
import { useDownloadScreen } from "@/hooks/useDownloadScreen";
import useIsMobile from "@/hooks/useIsMobile";

type ColorSquareProps = {
  color: string;
  type: "mobile" | "web";
};

const ColorSquare = ({ color, type }: ColorSquareProps) => (
  <span
    className={cn(
      type === "web" ? "w-6 h-6" : "w-4 h-4",
      "rounded-full border-2 border-white hover:border-aqua-400",
    )}
    style={{ backgroundColor: color }}
  />
);

export const ScreenAppDetails = ({ app }: { app: ScreenType["app"] }) => (
  <div className="w-full sm:w-fit h-fit flex items-center gap-3 sm:gap-4">
    <Avatar size="medium">
      <AvatarImage
        src={storage(mergeIconFromObject(app.icon))}
        alt={app.name}
      />
      <AvatarFallback>{extractInitials(app.name)}</AvatarFallback>
    </Avatar>
    <div className="space-y-0 sm:space-y-1 flex flex-col">
      <h3 className="text-2xl font-medium leading-6 text-white font-outfit sm:text-xl">
        {app.name}
      </h3>
      <p className="text-gray-200 font-poppins sm:text-sm sm:text-gray-400 sm:truncate sm:whitespace-nowrap sm:max-w-[50vw]">
        {app.tag_line}
      </p>
    </div>
    <DialogClose className="block sm:hidden ml-auto p-3">
      <Icon.Close className="size-7" />
    </DialogClose>
  </div>
);

export const WebScreenTabs = ({
  toggleFullScreen,
  isFullScreen
}: {
  toggleFullScreen: () => void;
  isFullScreen: boolean;
}) => (
  <div className="hidden sm:absolute top-0 left-1/2 -translate-x-1/2">
    <div className="inline-flex h-fit items-center justify-center rounded-full bg-slate-800 text-white">
      <button
        type="button"
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-full py-3.5 px-4 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${!isFullScreen ? 'bg-slate-700 shadow' : ''}`}
        onClick={toggleFullScreen}
      >
        Section
      </button>
      <button
        type="button"
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-full py-3.5 px-4 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isFullScreen ? 'bg-slate-700 shadow' : ''}`}
        onClick={toggleFullScreen}
      >
        Full Page
      </button>
    </div>
  </div>
);

export const ActionButtons = ({ screen }: { screen: ScreenType }) => {
  const { copyImageToClipboard, loading: copying } = useCopyScreen();
  const { downloadScreen, loading: downloading } = useDownloadScreen();
  const isMobile = useIsMobile()

  return (
    <div className="w-full sm:w-fit flex items-center justify-end gap-2 sm:gap-4 font-medium whitespace-nowrap font-poppins">
      <Button
        onClick={() => copyImageToClipboard(storage(screen.screen.hash + screen.screen.ext))}
        disabled={copying}
        size={isMobile ? "md" : "xl"}
        variant="liteGray"
        className="flex-1"
      >
        <Icon.Copy className="size-6" />
        {copying ? "Copying..." : "Copy"}
      </Button>

      <Button
        onClick={() => downloadScreen(storage(screen.screen.hash + screen.screen.ext))}
        disabled={downloading}
        size={isMobile ? "md" : "xl"}
        variant="darkGray"
        className="flex-1"
      >
        <Icon.Download className="size-6" />
        {downloading ? "Downloading..." : "Download"}
      </Button>
      <Dropdown
        classNames={{
          trigger: "hidden sm:flex",
        }}
        trigger={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Button size="xl" variant="darkGray" isIconOnly>
            <Icon.Dots className="size-6" />
          </Button>
        }
        content="content"
        placement="end"
      />
      <Button
        isIconOnly
        size={isMobile ? "md" : "xl"}
        variant="darkGray"
        className="flex sm:hidden"
      >
        <Icon.Save className="size-6" />
      </Button>

      <Separator orientation="vertical" className="hidden sm:flex h-8" />
      <DialogClose className="hidden sm:flex" asChild>
        <Button
          className="rounded-full"
          size="xl"
          variant="darkGray"
          isIconOnly
        >
          <Icon.Close className="size-6" />
        </Button>
      </DialogClose>
    </div>
  );
};

export const ScreenData = ({
  tags,
  components,
  colors,
}: {
  tags: ScreenType["tags"];
  components: ScreenType["components"];
  colors: ScreenType["colors"];
}) => {
  const [showAll, setShowAll] = useState(false);

  const renderPills = (items: { id: string; name: string }[]) => {
    const displayItems = showAll ? items : items.slice(0, 3);
    const remainingItems = items.length - 3;

    return (
      <div
        className="flex gap-2 flex-wrap"
        onMouseLeave={() => setShowAll(false)}
      >
        {displayItems.map((item) => (
          <Pill
            key={item.id}
            className="cursor-pointer transition-all"
            state="suggestion"
          >
            {item.name}
          </Pill>
        ))}
        {!showAll && remainingItems > 0 && (
          <Pill
            className="cursor-pointer relative group"
            state="suggestion"
            onMouseEnter={() => setShowAll(true)}
          >
            +
            {remainingItems}
          </Pill>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-fit flex items-center gap-4 md:gap-36 flex-wrap gap-y-6">
      {tags.length > 0 && (
        <div className=" transition-all">
          <p className="mb-2 text-2xl font-semibold font-outfit">Tags</p>
          {renderPills(tags)}
        </div>
      )}
      {components.length > 0 && (
        <div>
          <p className="mb-2 text-2xl font-semibold font-outfit">Components</p>
          {renderPills(components)}
        </div>
      )}
      {colors && (
        <div>
          <p className="mb-2 text-2xl font-semibold font-outfit">Colors</p>
          <div className="flex gap-2 flex-wrap">
            {colors.split(",").map((color) => (
              <ColorSquare key={color} color={color} type="web" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

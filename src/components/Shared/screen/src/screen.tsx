"use client";

import React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/UI/skeleton";
import { storage } from "@/utils/storage";
import { ScreenOverlay } from "./screen-overlay";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ScreenData } from "@/types/screen-types";
import { GlobalScreenOverlay } from "./global-screen-overlay";

// ScreenType
export type ScreenProps = {
  screen: ScreenData;
  overlay?: false | "global" | "default";
  borderless?: boolean;
  href?: string;
  size?: "medium" | "large" | null;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>; // Extend with div props

const Screen = ({
  screen,
  overlay = "default",
  borderless,
  href,
  size,
  className,
  ...props
}: ScreenProps) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const border = borderless
    ? "ring-0 border-0"
    : "ring-[3px] md:ring-[6px] ring-[#0f172aa6] hover:[#64748b26] transition-colors border-[2px] md:border-[4px] border-[#0f172aa6] hover:border-slate-500/50";

  const aspectRatio = screen.app?.platform === "web" ? "aspect-[100/62]" : "aspect-[10/21.25]";

  return (
    <div
      className={cn(
        "relative group size-full overflow-hidden flex items-center justify-center rounded-2xl sm:rounded-3xl bg-black-950",
        border,
        aspectRatio,
        className
      )}
      {...props}
    >
      {/* Skeleton while loading */}
      {!imageLoaded && !imageError && (
        <Skeleton className="absolute inset-0 size-full" />
      )}

      {/* Error state */}
      {imageError ? (
        <div className="absolute inset-0 size-full flex items-center justify-center">
          404 not found
        </div>
      ) : (
        <Image
          className="absolute inset-0 object-contain
           size-full"
          src={storage(
            (screen.screen?.hash ?? "") + (screen.screen?.ext ?? ""),
            size
          )}
          alt={`${screen?.app?.name} - screen`}
          width={screen.screen?.width ?? 0}
          height={screen.screen?.height ?? 0}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          unoptimized
        />
      )}

      {/* Overlays */}
      {imageLoaded && !imageError && overlay === "global" && (
        <GlobalScreenOverlay screen={screen} />
      )}
      {imageLoaded && !imageError && overlay === "default" && screen.app && (
        <ScreenOverlay screen={screen} />
      )}
      {imageLoaded && !imageError && href && (
        <Link
          className="absolute inset-0 size-full"
          href={href}
          scroll={false}
        >
          <p className="sr-only">Open Screen Overview</p>
        </Link>
      )}
    </div>
  );
};

export default Screen;

"use client";

import React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/UI/skeleton";
import { storage } from "@/utils/storage";
import { ScreenOverlay } from "./screen-overlay";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ScreenData } from "@/types/screen-types";

// ScreenType
export type ScreenProps = {
  screen: ScreenData;
  overlay?: boolean;
  borderless?: boolean;
  href?: string;
  size?: "medium" | "large" | null;
} & React.HTMLAttributes<HTMLDivElement>; // Extend with div props

const Screen = ({
  screen, overlay = true, borderless, href, size, ...props // Destructure additional props
}: ScreenProps) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  if (!screen) return null;

  const outerBorder = borderless
    ? "border-0"
    : "border-[3px] md:border-[6px] border-[#0f172aa6] hover:border-[#64748b26] transition-colors overflow-hidden";

  const innerBorder2 = borderless
    ? "border-0"
    : "border-[2px] md:border-[4px] border-[#0f172aa6] group-hover:border-slate-500 transition-colors overflow-hidden";

  return (
    <div className={cn("relative size-full rounded-2xl sm:rounded-[2rem] group", outerBorder)} {...props}>
      {!imageLoaded && !imageError && (
      <Skeleton className="size-full absolute inset-0" />
      )}
      {imageError ? (
        <div className="size-full absolute inset-0 bg-slate-950 flex items-center justify-center">
          404 not found
        </div>
      ) : (
        <Image
          className={cn("w-full h-auto rounded-xl sm:rounded-3xl z-10", innerBorder2)}
          src={storage(
            (screen.screen?.hash ?? "") + (screen.screen?.ext ?? ""),
            size,
          )}
          alt={`${screen?.app?.name} - screen`}
          width={screen.screen?.width ?? 0}
          height={screen.screen?.height ?? 0}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          unoptimized
        />
      )}
      {imageLoaded && !imageError && overlay && screen.app && (
      <ScreenOverlay screen={screen} />
      )}
      {imageLoaded && !imageError && href && (
      <Link
        className="size-full absolute inset-0"
        href={href}
        scroll={false}
      >
        <p className="sr-only"> Open Screen Overview </p>
      </Link>
      )}
    </div>
  );
};

export default Screen;

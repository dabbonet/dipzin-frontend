'use client';

import React from 'react'
import Image from 'next/image'
import { Skeleton } from "@/components/UI/skeleton"
import type { ScreenType } from '@/types/app-types';
import { storage } from '@/utils/storage';
import { ScreenOverlay } from './screen-overlay';
import { cn } from '@/lib/utils';
import { DialogTrigger } from '@/components/UI/dialog';

const Screen = ({ screen, overlay = true, borderless }: ScreenType | any) => {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)

  if (!screen) return null;

  const outerBorder = borderless ? 'border-0' : 'border-[3px] md:border-[6px] border-[#0f172aa6] hover:border-[#64748b26] transition-colors overflow-hidden'

  const innerBorder2 = borderless ? 'border-0' : 'border-[2px] md:border-[4px] border-[#0f172aa6] group-hover:border-slate-500 transition-colors overflow-hidden'

  return (
    <div className={cn("relative size-full rounded-[2rem] group", outerBorder)}>
      <div className={cn("size-full rounded-3xl", innerBorder2)}>
        {!imageLoaded && !imageError && (
        <Skeleton className="size-full absolute inset-0" />
        )}
        {imageError ? (
          <div className="size-full absolute inset-0 flex items-center justify-center bg-slate-600">
            404 not found
          </div>
        ) : (
          <DialogTrigger asChild>
            <Image
              className="object-contain z-20"
              src={storage((screen.screen?.hash ?? '') + (screen.screen?.ext ?? ''))}
              alt={screen?.screen?.alternativeText ?? "Screen Shot"}
              width={screen.screen?.width ?? 0}
              height={screen.screen?.height ?? 0}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              unoptimized
            />
          </DialogTrigger>
        )}
        {imageLoaded && !imageError && overlay && <ScreenOverlay app={screen.app} />}
      </div>
    </div>
  )
}

export default Screen;

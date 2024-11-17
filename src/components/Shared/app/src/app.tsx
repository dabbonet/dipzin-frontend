'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Skeleton } from "@/components/UI/skeleton";
import { storage } from '@/utils/storage';
import { mergeIconFromObject } from '@/utils/StringUtils';
import type { AppType } from '../../../../types/app-types';
import { AppOverlay } from './app-overlay';
import { cn } from '@/lib/utils';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';

const App = ({ app }: { app: AppType }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { setApps } = useQuery();

  const screens = app.screens ? app.screens.map(({ screen }) => ({
    width: screen.width,
    height: screen.height,
    imageSrc: storage(mergeIconFromObject(screen))
  })) : [];

  const stopImageRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startImageRotation = () => {
    stopImageRotation();
    intervalRef.current = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % screens.length);
    }, 700);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', startImageRotation);
      container.addEventListener('mouseleave', stopImageRotation);
    }

    return () => {
      stopImageRotation();
      if (container) {
        container.removeEventListener('mouseenter', startImageRotation);
        container.removeEventListener('mouseleave', stopImageRotation);
      }
    };
  }, [screens.length]);

  if (!app || !app?.screens || screens.length === 0) return null;

  const handleAppClick = () => {
    setApps((prevApps) => {
      const isAppSelected = prevApps.some((selectedApp: AppType) => selectedApp.id === app.id);
      if (!isAppSelected) {
        return [...prevApps, app];
      }
      return prevApps;
    });
  };

  const outerBorder = 'border-[3px] md:border-[6px] border-[#0f172aa6] hover:border-[#64748b26] transition-colors overflow-hidden';

  const innerBorder2 = 'border-[2px] md:border-[4px] border-[#0f172aa6] group-hover:border-slate-500 transition-colors overflow-hidden';

  return (
    <div className={cn("relative size-full rounded-[2rem] group", outerBorder)} ref={containerRef}>
      <div className={cn("size-full rounded-3xl", innerBorder2)}>
        {!imageLoaded && !imageError && (
          <Skeleton className="size-full absolute inset-0" />
        )}
        {imageError ? (
          <div className="size-full absolute inset-0 flex items-center justify-center bg-slate-600">
            404 not found
          </div>
        ) : (
          <Image
            src={screens[imageIndex]?.imageSrc || ''}
            alt={app.name}
            width={screens[imageIndex]?.width ?? 0}
            height={screens[imageIndex]?.height ?? 0}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            onClick={handleAppClick}
            className="cursor-pointer"
            unoptimized
          />
        )}
        {imageLoaded && !imageError && <AppOverlay app={app} />}
      </div>
    </div>
  );
};

export default App;

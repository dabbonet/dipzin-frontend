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

  const border = "ring-[3px] md:ring-[6px] ring-[#0f172aa6] hover:[#64748b26] transition-colors border-[2px] md:border-[4px] border-[#0f172aa6] hover:border-slate-500/50";

  return (
    <div className={cn("relative size-full rounded-xl sm:rounded-[2rem] group overflow-hidden", border)} ref={containerRef}>
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
  );
};

export default App;

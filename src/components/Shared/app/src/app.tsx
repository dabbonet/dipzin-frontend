'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Skeleton } from "@/components/UI/skeleton";
import { storage } from '@/utils/storage';
import { mergeIconFromObject } from '@/utils/StringUtils';
import type { AppType } from '../../../../types/app-types';
import { AppOverlay } from './app-overlay';
import { cn } from '@/lib/utils';

const App = ({ app }: { app: AppType }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to hold the interval
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref for app-container

  // Extract the screens from app.screens and map them to objects with width, height, and url
  const screens = app.screens ? app.screens.map(({ screen }) => ({
    width: screen.width,
    height: screen.height,
    imageSrc: storage(mergeIconFromObject(screen))
  })) : [];

  // Function to stop image rotation
  const stopImageRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  // Function to start image rotation
  const startImageRotation = () => {
    stopImageRotation(); // Clear any existing intervals before starting a new one
    intervalRef.current = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % screens.length); // Loop through screens continuously
    }, 700);
  };

  // Event listener setup and cleanup
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', startImageRotation);
      container.addEventListener('mouseleave', stopImageRotation);
    }

    // Cleanup on component unmount or when container changes
    return () => {
      stopImageRotation(); // Ensure interval is cleared
      if (container) {
        container.removeEventListener('mouseenter', startImageRotation);
        container.removeEventListener('mouseleave', stopImageRotation);
      }
    };
  }, [screens.length]); // Only run effect when the number of screens changes

  if (!app || !app?.screens || screens.length === 0) return null;

  const outerBorder = 'border-[3px] md:border-[6px] border-[#0f172aa6] hover:border-[#64748b26] transition-colors overflow-hidden'

  const innerBorder2 = 'border-[2px] md:border-[4px] border-[#0f172aa6] group-hover:border-slate-500 transition-colors overflow-hidden'

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
            src={screens[imageIndex]?.imageSrc || ''} // Dynamically switch images based on imageIndex
            alt={app.name}
            width={screens[imageIndex]?.width ?? 0}
            height={screens[imageIndex]?.height ?? 0}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            unoptimized
          />
        )}
        {imageLoaded && !imageError && <AppOverlay app={app} />}
      </div>
    </div>
  );
};

export default App;

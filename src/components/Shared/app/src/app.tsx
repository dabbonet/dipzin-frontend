'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Skeleton } from "@/components/UI/skeleton";
import { storage } from '@/utils/storage';
import { mergeIconFromObject } from '@/utils/StringUtils';
import type { AppType } from '../../../../types/app-types';
import { AppOverlay } from './app-overlay';

const NotFoundView = () => (
  <div className="size-full flex items-center justify-center p-4">
    404 not found
  </div>
);

const App = ({ app }: { app: AppType }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to hold the interval
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref for app-container

  // Extract the screens from app.screens and map them to their URLs
  const screens = app.screens ? app.screens.map(({ screen }) => mergeIconFromObject(screen)).map(storage) : [];

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

  const borderVariants = {
    initial: {
      borderWidth: '10px',
      borderColor: 'rgba(15, 23, 42, 0.65)',
    },
    hover: {
      borderWidth: '6px',
      borderColor: 'rgba(100, 116, 139, 0.15)',
    },
  };

  const imageVariants = {
    initial: {
      border: '0px',
    },
    hover: {
      border: '4px solid rgb(100, 116, 139)',
    },
  };

  return (
    <motion.div
      ref={containerRef} // Attach the ref to the container
      className="relative size-full rounded-[2rem] flex items-center justify-center overflow-hidden group hover:cursor-pointer"
      initial="initial"
      whileHover="hover"
      animate="initial"
      variants={borderVariants}
      transition={{ duration: 0.3 }}
    >
      {!imageLoaded && !imageError && <Skeleton className="size-full absolute top-0" />}
      <motion.div className="size-full rounded-3xl overflow-hidden" variants={imageVariants}>
        <div className="relative size-full">
          {imageError ? (
            <NotFoundView />
          ) : (
            <Image
              src={screens[imageIndex] || ''} // Dynamically switch images based on imageIndex
              alt={app.name}
              width={1125} // Assuming fixed width
              height={2436} // Assuming fixed height
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              unoptimized
            />
          )}
          {imageLoaded && !imageError && <AppOverlay app={app} />}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default App;

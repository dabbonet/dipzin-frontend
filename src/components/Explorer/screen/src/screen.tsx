'use client';

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScreenOverlay } from '@/components/Explorer/screen'
import { Skeleton } from "@/components/UI/skeleton"
import type { ScreenType } from '@/types/screen-types';

const NotFoundView = () => (
  <div className="size-full flex items-center justify-center p-4">
    404 not found
  </div>
)

const Screen = ({ screen, view = 'default' }: ScreenType) => {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)

  const borderVariants = {
    initial: {
      borderWidth: '10px',
      borderColor: 'rgba(15, 23, 42, 0.65)',
    },
    hover: {
      borderWidth: '6px',
      borderColor: 'rgba(100, 116, 139, 0.15)',
    },
  }

  const imageVariants = {
    initial: {
      border: '0px',
    },
    hover: {
      border: '4px solid rgb(100, 116, 139)',
    },
  }

  return (
    <motion.div
      className="relative size-full rounded-[2rem] flex items-center justify-center overflow-hidden group"
      initial="initial"
      whileHover="hover"
      animate="initial"
      variants={borderVariants}
      transition={{ duration: 0.3 }}
    >
      {!imageLoaded && !imageError && (
        <Skeleton className="size-full absolute top-0" />
      )}
      <motion.div className="size-full rounded-3xl overflow-hidden" variants={imageVariants}>
        <div className="relative size-full">
          {imageError ? (
            <NotFoundView />
          ) : (
            <Image
              src={screen.imgSrc}
              alt={screen.alt ?? "Screen Shot"}
              width={screen.width}
              height={screen.height}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
          {imageLoaded && !imageError && <ScreenOverlay view={view} app={screen.app} />}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Screen

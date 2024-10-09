import React from 'react'
import { motion } from 'framer-motion'
import {
  Avatar, AvatarImage, AvatarFallback
} from '@/components/Shared/avatar'
import { Button } from '@/components/Shared/button'
import { Icon } from '@/components/UI/icon'
import { extractInitials, mergeIconFromObject } from '@/utils/StringUtils'
import { Dropdown } from '@/components/Shared/dropdown'
import { Checkbox } from '@/components/UI/checkbox'
import { storage } from '@/utils/storage'
import type { ScreenType } from '@/types/app-types'

const AppInfo = ({ app }: { app: ScreenType['screen']['app'] }) => (
  <div className="flex items-center gap-4">
    <Avatar>
      <AvatarImage width={80} height={80} src={storage(mergeIconFromObject(app?.icon))} alt={app?.name} />
      <AvatarFallback>{extractInitials(app?.name || '')}</AvatarFallback>
    </Avatar>
    <div className="font-poppins">
      <h3 className="text-white text-lg font-semibold">{app?.name}</h3>
      <p className="text-white text-sm">{app?.tagLine}</p>
    </div>
  </div>
)

const GlobalTopOverlay = () => (
  <div className="w-full h-fit flex items-center justify-between px-5">
    <Checkbox className="size-[28px] rounded-[0.4rem] border-[2.5px]" />
    <div className="size-fit flex items-center gap-2">
      <Button variant="darkGray" className="bg-slate-800">
        <Icon.Copy className="size-6 text-white" />
        Copy
      </Button>
      <Dropdown
        trigger={(
          <Button size="md" className="rounded-full p-2 bg-slate-800" variant="darkGray" isIconOnly>
            <Icon.EllipsisHorizontal className="size-6 text-white" />
          </Button>
    )}
        content="content"
        classNames={{
          content: 'w-fit',
        }}
        placement="end"
      />
      {' '}

    </div>
  </div>
)

const TopOverlay = () => {
  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
  }

  return (
    <motion.div
      className="absolute top-0 inset-x-0 flex pt-6 pb-[93px] items-center justify-center gap-4 bg-screen-hover-gradient-to-bottom"
      variants={overlayVariants}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <GlobalTopOverlay />
    </motion.div>
  )
}

const BottomOverlay = ({ app }: { app: ScreenType['screen']['app'] }) => {
  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
  }

  return (
    <motion.div
      className="absolute bottom-0 inset-x-0 flex px-4 pb-[26px] pt-[48px] items-center justify-between bg-screen-hover-gradient-to-top"
      variants={overlayVariants}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <AppInfo app={app} />
    </motion.div>
  )
}

export const ScreenOverlay = ({ app }: { app: ScreenType['screen']['app'] }) => (
  <>
    <TopOverlay />
    <BottomOverlay app={app} />
  </>
)

import React from 'react'
import { motion } from 'framer-motion'
import {
  Avatar, AvatarImage, AvatarFallback
} from '@/components/Shared/avatar'
import { Button } from '@/components/Shared/button'
import { Icon } from '@/components/UI/icon'
import { extractInitials, mergeIconFromObject } from '@/utils/StringUtils'
import { storage } from '@/utils/storage'
import type { AppType } from '../../../../types/app-types'

const AppInfo = ({ app }: { app: AppType }) => (
  <div className="flex items-center gap-4">
    <Avatar>
      <AvatarImage width={80} height={80} src={storage(mergeIconFromObject(app.icon as any))} alt={app.name} />
      <AvatarFallback>{extractInitials(app.name)}</AvatarFallback>
    </Avatar>
    <div className="font-poppins">
      <h3 className="text-white text-lg font-semibold">{app.name}</h3>
      <p className="text-white text-sm">{app.tag_line}</p>
    </div>
  </div>
)
const OverlayButton = ({ icon }: { icon: React.ReactNode }) => (
  <Button size="md" className="rounded-full p-2 bg-slate-800 border border-slate-700/60" variant="darkGray" isIconOnly>
    {icon}
  </Button>
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
      <div className="flex justify-center gap-4 w-full">
        <OverlayButton icon={<Icon.DownloadPhoto className="size-[18px] stroke-white fill-transparent" />} />
        <OverlayButton icon={<Icon.Copy className="size-[18px] stroke-white fill-transparent" />} />
        <OverlayButton icon={<Icon.Save className="size-[18px] text-white" />} />
      </div>
    </motion.div>
  )
}

const BottomOverlay = ({ app }: { app: AppType }) => {
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
      <button type="button" title="expand" aria-label="Expand">
        <Icon.Expand className="size-6 text-white" />
      </button>
    </motion.div>
  )
}

export const AppOverlay = ({ app }: { app: AppType }) => (
  <>
    <TopOverlay />
    <BottomOverlay app={app} />
  </>
)

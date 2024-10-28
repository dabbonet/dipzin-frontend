import React from 'react'
import {
  Avatar, AvatarImage, AvatarFallback
} from '@/components/Shared/avatar'
import { Button } from '@/components/Shared/button'
import { Icon } from '@/components/UI/icon'
import { extractInitials, mergeIconFromObject } from '@/utils/StringUtils'
import { storage } from '@/utils/storage'
import type { AppType } from '../../../../types/app-types'

// App Info Component
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

// Overlay Button Component
const OverlayButton = ({ icon }: { icon: React.ReactNode }) => (
  <Button size="md" className="rounded-full p-2 bg-slate-800 border border-slate-700/60" variant="darkGray" isIconOnly>
    {icon}
  </Button>
)

// Top Overlay Component
const TopOverlay = ({ app }: { app: AppType }) => (
  <div className={`absolute top-0 inset-x-0 flex ${app.platform === 'web' ? 'pt-4 pb-[30px]' : 'pt-6 pb-[93px]'} items-center justify-center gap-4 bg-screen-hover-gradient-to-bottom opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}>
    <div className="flex justify-center gap-4 w-full">
      <OverlayButton icon={<Icon.DownloadPhoto className="size-[18px] stroke-white fill-transparent" />} />
      <OverlayButton icon={<Icon.Copy className="size-[18px] stroke-white fill-transparent" />} />
      <OverlayButton icon={<Icon.Save className="size-[18px] text-white" />} />
    </div>
  </div>
)

// Bottom Overlay Component
const BottomOverlay = ({ app }: { app: AppType }) => (
  <div className={`absolute bottom-0 inset-x-0 flex px-4 ${app.platform === 'web' ? 'pb-[14px] pt-[36px]' : 'pb-[26px] pt-[48px]'} items-center justify-between bg-screen-hover-gradient-to-top opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}>
    <AppInfo app={app} />
    <button type="button" title="expand" aria-label="Expand">
      <Icon.Expand className="size-6 text-white" />
    </button>
  </div>
)

// App Overlay Component
export const AppOverlay = ({ app }: { app: AppType }) => (
  <>
    <TopOverlay app={app} />
    <BottomOverlay app={app} />
  </>
)

import React from 'react'
import {
  Avatar, AvatarImage, AvatarFallback
} from '@/components/Shared/avatar'
import { Icon } from '@/components/UI/icon'
import { extractInitials, mergeIconFromObject } from '@/utils/StringUtils'
import { storage } from '@/utils/storage'
import type { AppType } from '../../../../types/app-types'
import { DownloadButton } from '../../button/DownloadButton'
import { Button } from '../../button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/UI/dialog'
import MobileAppOverview from './mobile-app-showcase'

// App Info Component
const AppInfo = ({ app }: { app: AppType }) => (
  <div className="w-full h-fit flex items-center gap-1 sm:gap-4 bg-slate-800/90 sm:bg-background rounded-full p-1 sm:p-0">
    <Avatar className="size-10 sm:size-12 shrink-0 aspect-square">
      <AvatarImage src={storage(mergeIconFromObject(app.icon as any))} alt={app.name} />
      <AvatarFallback>{extractInitials(app.name)}</AvatarFallback>
    </Avatar>
    <div>
      <h3 title={app.name} className="text-white text-sm sm:text-lg line-clamp-1 font-medium sm:font-semibold">{app.name}</h3>
      <p className="text-white hidden sm:flex leading-tight text-sm">{app.tag_line}</p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button scroll={false} variant="ghost" className="flex aspect-square shrink-0 items-center justify-center rounded-full ml-auto sm:hidden bg-aqua-800 hover:bg-aqua-800 p-1">
          <Icon.Group className="size-5 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="backdrop-blur-[45px]">
        <MobileAppOverview app={app} />
      </DialogContent>
    </Dialog>
  </div>
)

// Top Overlay Component
const TopOverlay = ({ app }: { app: AppType }) => {
  const screensUrls = app?.screens?.map(
    (screen) => storage(screen.screen.hash + screen.screen.ext)
  );

  return (
    <div className={`absolute hidden sm:flex top-0 inset-x-0 ${app.platform === 'web' ? 'pt-4 pb-[30px]' : 'pt-6 pb-[93px]'} items-center justify-center gap-4 bg-screen-hover-gradient-to-bottom opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}>
      <div className="flex justify-center gap-4 w-full">
        <DownloadButton
          className="rounded-full"
          variant="darkGray"
          isIconOnly
          url={screensUrls as unknown as string[]}
          then={(
            <Icon.Check className="size-[18px]" />
          )}
        >
          <Icon.DownloadPhoto className="size-[18px] stroke-white fill-transparent" />
        </DownloadButton>

        {/* <Button size="md" className="rounded-full hidden md:flex" variant="darkGray" isIconOnly>
          <Icon.Copy className="size-[18px] stroke-white fill-transparent" />
        </Button> */}
        {/* <Button size="md" className="rounded-full" variant="darkGray" isIconOnly>
        <Icon.Save className="size-[18px] text-white" />
      </Button> */}
      </div>
    </div>
  )
}

// Bottom Overlay Component
const BottomOverlay = ({ app }: { app: AppType }) => (
  <div className={`absolute bottom-0 inset-x-0 flex px-1 sm:px-3 ${app.platform === 'web' ? 'pb-2 sm:pb-[14px] pt-[36px]' : 'pb-2 sm:pb-[26px] pt-[48px]'} bg-transparent sm:bg-screen-hover-gradient-to-top opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}>
    <AppInfo app={app} />
  </div>
)

// App Overlay Component
export const AppOverlay = ({ app }: { app: AppType }) => (
  <>
    <TopOverlay app={app} />
    <BottomOverlay app={app} />
  </>
)

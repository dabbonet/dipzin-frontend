import React from 'react'
import { motion } from 'framer-motion'
import {
  Avatar, AvatarImage, AvatarFallback
} from '@/components/Shared/avatar'
import { Button } from '@/components/Shared/button'
import { Icon } from '@/components/UI/icon'
import { extractInitials } from '@/utils/StringUtils'
import { Dropdown } from '@/components/Shared/dropdown'
import { Checkbox } from '@/components/UI/checkbox'

type ScreenType = {
  screen: {
    app: {
      avatar: {
        imgSrc: string;
      }
      name: string;
      tagLine: string;
    }
  },
  view?: 'default' | 'global' | 'in-app'
}

const AppInfo = ({ app }: { app: ScreenType['screen']['app'] }) => (
  <div className="flex items-center gap-4">
    <Avatar>
      <AvatarImage width={80} height={80} src={app.avatar.imgSrc} alt={app.name} />
      <AvatarFallback>{extractInitials(app.name)}</AvatarFallback>
    </Avatar>
    <div className="font-poppins">
      <h3 className="text-white text-lg font-semibold">{app.name}</h3>
      <p className="text-white text-sm">{app.tagLine}</p>
    </div>
  </div>
)

const OverlayButton = ({ icon }: { icon: React.ReactNode }) => (
  <Button size="md" className="rounded-full p-2 bg-gray-700 border border-slate-700" variant="darkGray" isIconOnly>
    {icon}
  </Button>
)

const DefaultTopOverlay = () => (
  <div className="flex justify-center gap-4 w-full">
    <OverlayButton icon={<Icon.DownloadPhoto className="size-[18px] stroke-white fill-transparent" />} />
    <OverlayButton icon={<Icon.Copy className="size-[18px] stroke-white fill-transparent" />} />
    <OverlayButton icon={<Icon.Save className="size-[18px] text-white" />} />
  </div>
)

const GlobalTopOverlay = () => (
  <div className="w-full h-fit flex items-center justify-between px-5">
    <Checkbox className="size-[28px] rounded-md border-[2.5px]" />
    <div className="size-fit flex items-center gap-2">
      <Button variant="darkGray">
        <Icon.Copy className="size-6 text-white" />
        Copy
      </Button>
      <Dropdown
        trigger={(
          <Button size="md" className="rounded-full p-2 bg-gray-700" variant="darkGray" isIconOnly>
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

const InAppTopOverlay = () => (
  <div className="flex justify-end w-full pr-6">
    <Dropdown
      trigger={(
        <Button size="md" className="rounded-full p-2 bg-gray-700" variant="darkGray" isIconOnly>
          <Icon.EllipsisHorizontal className="size-6 text-white" />
        </Button>
    )}
      content="content"
      classNames={{
        content: 'w-fit',
      }}
      placement="end"
    />
  </div>
)

const TopOverlay = ({ view }: { view: ScreenType['view'] }) => {
  const overlayVariants = {
    initial: { opacity: 0, y: '-100%' },
    hover: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="absolute top-0 inset-x-0 flex pt-6 pb-[93px] items-center justify-center gap-4 bg-screen-hover-gradient-to-bottom"
      variants={overlayVariants}
      transition={{ duration: 0.4 }}
    >
      {view === 'default' && <DefaultTopOverlay />}
      {view === 'global' && <GlobalTopOverlay />}
      {view === 'in-app' && <InAppTopOverlay />}
    </motion.div>
  )
}

const DefaultBottomOverlay = ({ app }: { app: ScreenType['screen']['app'] }) => (
  <>
    <AppInfo app={app} />
    <button type="button" title="expand" aria-label="Expand">
      <Icon.Expand className="size-6 text-white" />
    </button>
  </>
)

const GlobalBottomOverlay = ({ app }: { app: ScreenType['screen']['app'] }) => (
  <AppInfo app={app} />
)

const InAppBottomOverlay = () => (
  <div className="w-full flex items-center justify-center gap-4">
    <Button size="md" className="w-full" variant="liteGray">
      <Icon.Save className="size-[18px]" />
      Save
    </Button>
    <Button size="md" className="w-full" variant="darkGray">
      <Icon.Copy className="size-[18px] stroke-white fill-transparent" />
      Copy
    </Button>
  </div>
)

const BottomOverlay = ({ view, app }: { view: ScreenType['view'], app: ScreenType['screen']['app'] }) => {
  const overlayVariants = {
    initial: { opacity: 0, y: '100%' },
    hover: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="absolute bottom-0 inset-x-0 flex px-4 pb-[26px] pt-[48px] items-center justify-between bg-screen-hover-gradient-to-top"
      variants={overlayVariants}
      transition={{ duration: 0.4 }}
    >
      {view === 'default' && <DefaultBottomOverlay app={app} />}
      {view === 'global' && <GlobalBottomOverlay app={app} />}
      {view === 'in-app' && <InAppBottomOverlay />}
    </motion.div>
  )
}

const ScreenOverlay = ({ view, app }: { view: ScreenType['view'], app: ScreenType['screen']['app'] }) => (
  <>
    <TopOverlay view={view} />
    <BottomOverlay view={view} app={app} />
  </>
)

export default ScreenOverlay

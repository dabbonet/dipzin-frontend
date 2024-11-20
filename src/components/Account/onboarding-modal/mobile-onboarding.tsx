import { Button } from '@/components/Shared/button'
import { Dialog, DialogContent } from '@/components/UI/dialog'
import {
  Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader
} from '@/components/UI/drawer'
import { Logo } from '@/components/UI/logo'
import React from 'react'

const MobileOnboarding: React.FC = () => (
  <Dialog defaultOpen>
    <DialogContent className="size-full bg-slate-950 flex flex-col justify-between px-4 md:px-8 lg:px-10 xl:px-16 2xl:px-[100px]">
      {/* stepper */}
      <div className="size-fit flex items-center gap-3">
        <span className="w-12 flex items-center justify-center aspect-square shrink-0 rounded-full border-[0.8px] border-slate-700 px-1.5 bg-black-950">
          <Logo.Dipzin className="size-full" />
        </span>
        <div>
          <h3 className="text-base leading-normal font-medium">
            Dipzin
          </h3>
          <p className="text-white/60 text-xs">
            Design, Discover, Inspire
          </p>
        </div>
      </div>
      <Drawer defaultOpen>
        <DrawerContent className="bg-slate-900 rounded-t-3xl text-center">
          <DrawerHeader className="text-lg font-semibold">
            Smart Search ...
          </DrawerHeader>
          <DrawerDescription className="text-white/60 text-sm">
            Navigation through App Elements,
          </DrawerDescription>
          <DrawerFooter className="w-full h-fit flex flex-row gap-x-4 mt-4">
            <Button className="flex-1" variant="ghost" fullWidth size="lg">
              Skip
            </Button>
            <Button className="flex-1" fullWidth size="lg">
              Next
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </DialogContent>
  </Dialog>
)

export default MobileOnboarding

"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/Shared/avatar";
import { Button } from "@/components/Shared/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/tooltip";

import { Pill } from "@/components/Shared/pill";
import useIsMobile from "@/hooks/useIsMobile";
import { Icon } from "@/components/UI/icon";
import { Dropdown } from "@/components/Shared/dropdown";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/UI/command";
import { extractInitials } from "@/utils/StringUtils";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowRightStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerClose,
} from "@/components/UI/drawer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/dialog";
import { SettingsModal } from "../../settings-modal";
import { storage } from "@/utils/storage";

const navigationItems = [
  { label: "Stream", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Collections", href: "#", comingSoon: true },
  { label: "Blog", href: "#", comingSoon: true },
  { label: "Apps", href: "apps" },
  { label: "About", href: "#", comingSoon: true },
  { label: "Flows", href: "flows" },
  { label: "Support", href: "mailto:support@dipzin.com" },
  { label: "Screens", href: "screens" },
];

const soonItems = [
  {
    heading: "Marketing Pages",
    description: "Showcases your brand's offerings effectively.",
    badge: "Q2 2024",
  },
  {
    heading: "Arabic Marketing Pages",
    description: "Easily collect your Arabic marketing pages.",
    badge: "Q2 2024",
  },
  {
    heading: "Collections",
    description: "Create, share, comment, and save in your collection library.",
    badge: "Q3 2024",
  },
  {
    heading: "Flows",
    description: "See the flow screens of web and apps.",
    badge: "Q3 2024",
  },
  {
    heading: "Interactive Prototypes",
    description: "Interact with prototype screens all in one place.",
    badge: "Q3 2024",
  },
  {
    heading: "Journey Interactions",
    description: "View Flow Interactions, Gestures and Collect it.",
    badge: "Q3 2024",
  },
  {
    heading: "Figma Plugin",
    description: "Easily download screens with Figma Plugin.",
    badge: "Q4 2024",
  },
  {
    heading: "Mobile Apps",
    description: "Available for download as a mobile app.",
    badge: "Q4 2024",
  },
  {
    heading: "+1000 Apps",
    description: "Over 1000 apps available in one place.",
    badge: "Q4 2024",
  },
  {
    heading: "Comments",
    description: "Leave comments in your collection.",
    badge: "Q4 2024",
  },
];

const UserMenu = () => {
  const session = useSession();
  const user = session.data?.user;
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    WheelGesturesPlugin(),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setCount(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on("select", onSelect);
    // eslint-disable-next-line consistent-return
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!user) {
    return (
      <Button size="lg" className="rounded-full" href="/access">
        <ArrowRightEndOnRectangleIcon className="size-6" />
        Login
      </Button>
    );
  }

  const menuContent = (
    <Command className="w-full p-2 sm:p-0">
      <CommandList>
        <CommandGroup>
          <CommandItem className="w-full h-fit flex items-center justify-between p-2">
            <Dialog>
              <DialogTrigger className="flex items-center gap-2 rounded-full hover:bg-slate-900 py-2 px-2.5">
                <Avatar>
                  <AvatarImage
                    src={storage(
                      (user.avatar?.hash ?? "") + (user.avatar?.ext ?? ""),
                    )}
                    alt={user.name || "Avatar"}
                  />
                  <AvatarFallback>
                    {extractInitials(user.name || "User")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <Icon.Settings className="size-6 ml-4" />
              </DialogTrigger>
              <DialogContent className="w-full max-w-4xl">
                <SettingsModal />
              </DialogContent>
            </Dialog>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full hover:bg-slate-900"
                onClick={() => signOut()}
              >
                <ArrowRightStartOnRectangleIcon className="size-4" />
                Logout
              </Button>
            </div>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Navigation">
          <div
            className={`grid ${isMobile ? "grid-cols-3" : "grid-cols-2"} gap-2 p-2 max-w-max md:max-w-[70%]`}
          >
            {navigationItems.map((item) => {
              if (item.comingSoon) {
                return (
                  <TooltipProvider delayDuration={200} key={item.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="w-full h-fit rounded-xl text-base font-semibold font-outfit text-white hover:bg-slate-900 py-1 px-2 hover:outline-0 hover:text-aqua-500">
                          {item.label}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="w-full h-fit rounded-xl text-sm font-semibold text-white py-1 px-2">
                        <p>Coming Soon</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }
              return (
                <Link
                  key={item.label}
                  className="w-full h-fit rounded-xl text-base font-semibold text-white hover:bg-slate-900 py-1 px-2 hover:outline-0 hover:text-aqua-500"
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </CommandGroup>

        <CommandGroup heading="Coming Soon">
          <div className="max-w-fit md:max-w-sm" ref={emblaRef}>
            <div className="flex">
              {[0, 1, 2].map((page) => (
                <div key={page} className="mx-1 flex-[0_0_100%]">
                  <div className="grid grid-cols-2 gap-3">
                    {soonItems.slice(page * 4, (page + 1) * 4).map((item) => (
                      <div
                        key={item.heading}
                        className="w-full h-[135px] bg-slate-800 hover:bg-slate-900 rounded-2xl p-4 flex flex-col gap-1 items-start justify-between text-start"
                      >
                        <h3 className="text-[12px] leading-normal font-medium text-white">
                          {item.heading}
                        </h3>
                        <p className="text-[11px] leading-normal font-normal text-slate-400">
                          {item.description}
                        </p>
                        <Pill
                          className={`mt-2 ${item.badge === "Q2 2024" ? "bg-lime-100 text-lime-900" : "bg-[#FCEED9] text-[#383B3D]"} text-[11px] rounded-[3px] px-1`}
                        >
                          {item.badge}
                        </Pill>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 w-full h-fit flex p-0 items-center justify-between">
            <div className="flex justify-center">
              {Array.from({ length: count }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to page ${i + 1}`}
                  className={`size-2.5 rounded-full mx-1 ${current === i ? "bg-[#CBD5E1]" : "bg-slate-900"}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                />
              ))}
            </div>
            <CommandGroup>
              <CommandItem className="flex items-center gap-2 text-sm text-gray-500 p-0">
                <Link
                  href="/legal/terms"
                  className="text-slate-500 hover:text-aqua-500 transition-all font-medium text-[10px]"
                >
                  Copyrights
                </Link>
                <Link
                  href="/legal/term-of-service"
                  className="text-slate-500 hover:text-aqua-500 transition-all font-medium text-[10px]"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/legal/privacy-policy"
                  className="text-slate-500 hover:text-aqua-500 transition-all font-medium text-[10px]"
                >
                  Privacy
                </Link>
              </CommandItem>
            </CommandGroup>
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );

  const triggerButton = (
    <Button variant="darkGray" className="py-3 px-1.5 rounded-full" role="combobox">
      <Avatar className="size-8">
        <AvatarImage
          src={storage((user.avatar?.hash ?? "") + (user.avatar?.ext ?? ""))}
          alt={user.name ?? "name"}
        />
        <AvatarFallback>{extractInitials(user.name || "User")}</AvatarFallback>
      </Avatar>
      <Icon.BurgerMenu className="size-8 text-slate-400" />
    </Button>
  );

  if (isMobile) {
    return (
      <Drawer
        modal
        direction="right"
        dismissible={false}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      >
        <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
        <DrawerContent className="h-screen w-screen bg-[#1A2333] rounded-none border-0">
          {menuContent}
          <DrawerFooter className="pt-0 pl-2">
            <DrawerClose onClick={() => setIsDrawerOpen(false)} asChild>
              <Button isIconOnly variant="darkGray">
                <ChevronRightIcon className="size-4" />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <Button href="/pricing" className="rounded-xl">
        Join Us
      </Button>
      <Dropdown
        classNames={{
          trigger:
          "bg-[#1A2333] hover:bg-slate-900 border-[1px] border-slate-900 rounded-full flex items-center gap-x-2 p-1 pr-2",
          content:
          "w-fit h-fit bg-[#1A2333] border-[1px] border-slate-900 rounded-2xl p-4",
        }}
        trigger={triggerButton}
        content={menuContent}
        placement="end"
      />
    </div>
  );
};

export default UserMenu;

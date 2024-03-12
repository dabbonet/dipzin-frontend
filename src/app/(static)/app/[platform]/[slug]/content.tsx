"use client";
import SingleScreen from "@/components/screen/SingleScreen";
import Screen from "@/components/ui/Screen";
import { usePlatform } from "@/context/usePlatforms";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";
import ScreenActions from "./ScreenActions";
import ScreenDetails from "@/components/ScreenDetails";
import { useNavigator } from "@/context/useNavigatiorContext";
import { useSelcetedImages } from "@/lib/SelectedToDownload";

interface ContentProps {
  apps: any;
  selectedApp: any;
  tagLine?: any
}

export default function Content({ apps, selectedApp: app }: ContentProps) {
  const { setActiveControls } = useNavigator()
  const { selectedImages, setSelectedImages } = useSelcetedImages()
  const { selected, setSelected, setPlatforms, setSingleApp } = usePlatform();
  const [openScreen, setOpenScreen] = useState<any | null>();
  useEffect(() => {
    if (selectedImages.images.length > 0) {
      setActiveControls('selection')
    } else {
      setActiveControls('menu-search')
    }
  }, [selectedImages])

  useEffect(() => {
    return () => {
      setSelectedImages({ appName: '', images: [] })
      setSingleApp('')
      setActiveControls('')
    }
  }, [])

  // Create an array of platform IDs
  const platformIds = apps.data.map((app) => app.attributes.platform.data.id);
  // Platform Switcher initialization.
  useEffect(() => {
    setPlatforms(platformIds);
    setSelected(app.platform.data.id);
    setSingleApp('apps');
  }, [app]);

  const icon = app.icon.data.attributes.hash + app.icon.data.attributes.ext;
  const categoryName = app.categories.data[0].attributes.name;
  const screens = app.screens.data;
  if (!icon || !screens || !categoryName || !app) {
    notFound()
  }

  return (
    <main className="flex flex-col items-center w-full">
      <Toaster position="bottom-right" />
      <div className="z-10 flex flex-wrap items-center justify-between w-full gap-4 mt-10 mb-4 ml-10 mr-10 text-slate-100">
        <div className="flex space-x-6">
          <Image
            className="h-20 rounded-2xl bg-slate-600"
            src={icon}
            width={80}
            height={80}
            alt="apps Icon"
          />
          <div>
            <span className="text-3xl font-medium">{app.name}</span>
            <span className="block text-[16px] text-slate-400">
              {app.tag_line}
            </span>
          </div>
        </div>

        <div className="flex space-x-16">
          <div className=" lg:text-right">
            <span className="text-xl font-medium">{categoryName}</span>
            <span className="block text-[16px] text-slate-400">
              App Category
            </span>
          </div>
          <div className="text-right">
            <span className="text-xl font-medium">{app.copy_right}</span>
            <span className="block text-[16px] text-slate-400">@copyright</span>
          </div>
        </div>
      </div>

      <VirtuosoGrid
        className="mt-6"
        useWindowScroll
        data={screens}
        style={{ minHeight: 100, width: "100%" }}
        totalCount={screens.length}
        overscan={10}
        listClassName={cn(
          "grid content-center gap-3 md:gap-6 pt-0 grid-cols-2",
          selected == 3
            ? "2xl:grid-cols-4 md:grid-cols-3"
            : "grid-cols-2 2xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4  sm:grid-cols-2"
        )}
        itemContent={(index, data) => {
          return (
            <SingleScreen screen={data} appName={app.name} setOpen={() => setOpenScreen(data)} />
          );
        }}
      />
      <AnimatePresence>
        {openScreen && (
          <>
            <motion.div
              className="fixed top-0 w-full h-[100vh] backdrop-blur-md bg-slate-900/70 z-50 flex items-center justify-center gap-8"
              // onClick={() => setOpenScreen(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ScreenActions appName={app.name} screen={openScreen} />
              <motion.div className="relative z-[100] h-full flex items-center" >
                <ScreenDetails screenId={openScreen.id} />
                <Screen
                  src={mergeScreenUrl(openScreen)}
                  quality={50}
                  className="rounded-2xl h-[90%] w-auto bg-slate-900/80"
                />
              </motion.div>
              <motion.div
                onClick={() => setOpenScreen(null)}
                className={
                  "w-[100%] h-[100%] fixed top-0 bg-transparent"
                }
              ></motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

const mergeScreenUrl = (data) =>
  data.attributes.screen.data?.attributes.hash +
  data.attributes.screen.data?.attributes.ext;

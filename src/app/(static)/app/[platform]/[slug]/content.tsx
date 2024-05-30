"use client";
import SingleScreen from "@/components/screen/SingleScreen";
import Screen from "@/components/ui/Screen";
import { usePlatform } from "@/context/usePlatforms";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";
import ScreenActions from "./ScreenActions";
import ScreenDetails from "@/components/ScreenDetails";
import { useNavigator } from "@/context/useNavigatiorContext";
import { useSelectedImages } from "@/lib/SelectedToDownload";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { Button, Kbd, Tooltip } from "@nextui-org/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ContentProps {
  apps: any;
  selectedApp: any;
  tagLine?: any;
}

export default function Content({ apps, selectedApp: app }: ContentProps) {
  const { setActiveControls } = useNavigator();
  const { selectedImages, setSelectedImages } = useSelectedImages();
  const { selected, setSelected, setPlatforms, setSingleApp } = usePlatform();
  const [openScreen, setOpenScreen] = useState<any | null>();
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedImages.images.length > 0) {
      setActiveControls("selection");
    } else {
      setActiveControls("menu-search");
    }
  }, [selectedImages]);

  useEffect(() => {
    return () => {
      setSelectedImages({ appName: "", images: [] });
      setSingleApp("");
      setActiveControls("");
    };
  }, []);

  const platformIds = apps.data.map((app) => app.attributes.platform.data.id);

  useEffect(() => {
    setPlatforms(platformIds);
    setSelected(app.platform.data.id);
    setSingleApp("apps");
  }, [app]);

  const icon = app.icon.data.attributes.hash + app.icon.data.attributes.ext;
  const categoryName = app.categories.data[0].attributes.name;
  const screens = app.screens.data;

  if (!icon || !screens || !categoryName || !app) {
    notFound();
  }

  const { openScreenByIndex, nextScreen, prevScreen } = useKeyboardNavigation(
    screens,
    openScreen,
    setOpenScreen
  );

  return (
    <main className="w-full flex flex-col items-center">
      <Toaster position="bottom-right" />
      <div className="flex w-full mt-10 mb-4 mr-10 ml-10 justify-between items-center text-slate-100 z-10 flex-wrap gap-4">
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
            <SingleScreen
              screen={data}
              appName={app.name}
              setOpen={() => {
                setOpenScreen(data);
                openScreenByIndex(index);
              }}
            />
          );
        }}
      />
      <AnimatePresence>
        {openScreen && (
          <motion.div
            className="z-50 fixed top-0 w-full h-[100vh] backdrop-blur-md bg-slate-900/70 flex items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScreenActions appName={app.name} screen={openScreen} />
            <motion.div
              className={`w-full h-fit flex items-center justify-center ${selected === 3 ? 'flex flex-col justify-start w-fit h-fit' : 'gap-10'
                }`}
            >
              <div className={`z-20 ${selected === 3 ? "relative flex flex-col h-full w-full max-w-[70vw] -scale-[90%]  rotate-180 items-center gap-6" : ""}`}>
                <div className={`w-full h-fit ${selected === 3 && openScreen ? "absolute top-0 left-0 right-0 translate-y-[6vh] z-10" : "h-full absolute top-0 translate-y-[20%]"}`}>
                  <ScreenDetails isDetailsOpen={isDetailsOpen} setIsDetailsOpen={setIsDetailsOpen} screenId={openScreen.id} />
                </div>
                <div className={`w-fit relative flex ${selected === 3 ? "mt-[15%] mb-[5%]" : ""} justify-center`}>
                  <Screen
                    src={mergeScreenUrl(openScreen)}
                    quality={50}
                    className={`rounded-2xl w-fit h-fit max-h-[90vh] bg-slate-900/80`}
                  />
                  <div
                    className={
                      selected === 3
                        ? 'flex absolute justify-between bottom-0 translate-y-[-50%] p-4 w-full h-fit'
                        : 'flex absolute justify-between bottom-0 translate-y-[-30%] p-4 w-full h-fit'
                    }
                  >
                    <Tooltip
                      showArrow={true}
                      content={
                        <p>
                          Press <Kbd className="mx-2" keys={['left']} /> to
                          navigate
                        </p>
                      }
                    >
                      <Button
                        className="bg-white rounded-full px-2 py-2 min-w-0 aspect-square w-fit h-fit text-black-900"
                        onClick={prevScreen}
                      >
                        <ArrowLeft />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      showArrow={true}
                      content={
                        <p>
                          Press <Kbd className="mx-2" keys={['right']} /> to
                          navigate
                        </p>
                      }
                    >
                      <Button
                        className="bg-white rounded-full px-2 py-2 min-w-0 aspect-square w-fit h-fit text-black-900"
                        onClick={nextScreen}
                      >
                        <ArrowRight />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              onClick={() => setOpenScreen(null)}
              className="w-screen h-screen fixed top-0 -z-5 bg-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

const mergeScreenUrl = (data) =>
  data.attributes.screen.data?.attributes.hash +
  data.attributes.screen.data?.attributes.ext;
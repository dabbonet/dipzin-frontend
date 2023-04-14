'use client'
import SingleScreen from "@/components/screen/SingleScreen"
import Screen from "@/components/ui/Screen"
import { usePlatform } from "@/lib/platforms"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { VirtuosoGrid } from "react-virtuoso"
import Image from "next/image"
import { Toaster } from "react-hot-toast"
import ScreenActions from "./ScreenActions"

interface ContentProps {
    apps: any,
    selectedApp: any
}

export default function Content({ apps, selectedApp: app }: ContentProps) {
    const { selected, setSelected, setPlatforms, setSingleApp } = usePlatform();
    const [openScreen, setOpenScreen] = useState<string | null>();

    // Create an array of platform IDs
    const platformIds = apps.data.map(app => app.attributes.platform.data.id);
    // Platform Switcher initialization.
    useEffect(() => {
        setPlatforms(platformIds)
        setSelected(app.platform.data.id)
        setSingleApp(true)
    }, [app])

    const icon = app.icon.data.attributes.hash + app.icon.data.attributes.ext
    const categoryName = app.categories.data[0].attributes.name
    const screens = app.screens.data


    return (
        <main className="w-full flex flex-col items-center">
            <Toaster position="bottom-right" />
            <div className="flex w-full mt-10 mb-4 justify-between items-center text-slate-100 z-10">
                <div className="flex space-x-6">
                    <Image
                        className="h-20 rounded-2xl bg-slate-600"
                        src={icon}
                        width={80}
                        height={80}
                        alt="apps Icon"
                    />
                    <div>
                        <span className="text-[32px] font-medium">{app.name}</span>
                        <span className="block text-[16px] text-slate-400">
                            {app.tag_line}
                        </span>
                    </div>
                </div>

                <div className="flex space-x-16">
                    <div className="text-right">
                        <span className="text-xl font-medium">
                            {categoryName}
                        </span>
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
                style={{ minHeight: 100, width: '100%' }}
                totalCount={screens.length}
                overscan={10}
                listClassName={cn("grid content-center gap-6 pt-0 grid-cols-2", selected == 3 ? "2xl:grid-cols-4 md:grid-cols-3" : " 2xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4")}
                itemContent={(index, data) => {
                    const screen = data?.attributes.screen.data?.attributes.hash + data?.attributes.screen.data?.attributes.ext
                    return (
                        <SingleScreen src={screen} setOpen={setOpenScreen} />
                    )
                }}
            />
            <AnimatePresence>
                {openScreen && (
                    <>
                        <motion.div
                            className="fixed top-0 w-full h-[100vh] backdrop-blur-md bg-slate-900/70 z-[100] flex items-center justify-center"
                            onClick={() => setOpenScreen(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Screen src={openScreen} quality={50} className='rounded-2xl h-[90%] w-auto bg-slate-900/80' />
                            <ScreenActions />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
}
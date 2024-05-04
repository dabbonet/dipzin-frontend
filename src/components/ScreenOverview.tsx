'use client';

import ScreenActions from '@/app/(static)/app/[platform]/[slug]/ScreenActions'
import { AnimatePresence, motion } from 'framer-motion'
import ScreenDetails from './ScreenDetails'
import Screen from './ui/Screen'
import { useSearchContext } from '@/context/SearchContext'

export const ScreenOverview = () => {
    const { openScreen, setOpenScreen } = useSearchContext(); // Get openScreen and setOpenScreen from useSearchContext
    return (
        <AnimatePresence>
            {openScreen && (
                <motion.div
                    className="fixed top-0 w-full h-[100vh] backdrop-blur-md bg-slate-900/70 z-50 flex items-center justify-center gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <ScreenActions appName={openScreen.app.name} screen={openScreen.screen} />
                    <motion.div className="flex flex-wrap justify-center items-center z-[100] w-fit mx-auto h-full gap-10 relative" >
                        <ScreenDetails screenId={openScreen.id} />
                        <Screen
                            src={openScreen.screen}
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
            )}
        </AnimatePresence>
    )
}
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useSearchContext } from '@/context/SearchContext';
import ScreenDetails from '@/components/ScreenDetails';
import Screen from '@/components/ui/Screen';
import { Button, Kbd, Tooltip } from "@nextui-org/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useState } from 'react';
import { usePlatform } from "@/context/usePlatforms";
import ScreenActions from '@/app/(static)/app/[platform]/[slug]/ScreenActions';

export const ScreenOverview = () => {
    const { data, openScreen, setOpenScreen } = useSearchContext(); // Get openScreen and setOpenScreen from useSearchContext
    const { selected } = usePlatform();
    const { openScreenByIndex, nextScreen, prevScreen } = useKeyboardNavigation(
        data,
        openScreen,
        setOpenScreen
    );

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
                    <motion.div className={`w-full h-fit flex items-center justify-center ${selected === 3 ? 'flex flex-col justify-start w-fit h-fit' : 'gap-10'}`}>
                        <div className={`z-20 ${selected === 3 ? "relative flex flex-col h-full w-full max-w-[70vw] -scale-[90%] rotate-180 items-center gap-6" : ""}`}>
                            <div className={`w-full h-fit ${selected === 3 && openScreen ? "absolute top-0 left-0 right-0 translate-y-[6vh] z-10" : "h-full absolute top-0 translate-y-[20%]"}`}>
                                <ScreenDetails
                                    isDetailsOpen={isDetailsOpen}
                                    setIsDetailsOpen={setIsDetailsOpen}
                                    screenId={openScreen.id}
                                />
                            </div>
                            <div className={`w-fit relative flex ${selected === 3 ? "mt-[15%] mb-[5%]" : ""} justify-center`}>
                                <Screen
                                    src={openScreen.screen}
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
                                                Press <Kbd className="mx-2" keys={['left']} /> to navigate
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
                                                Press <Kbd className="mx-2" keys={['right']} /> to navigate
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
                        className="w-[100%] h-[100%] fixed top-0 bg-transparent"
                    ></motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

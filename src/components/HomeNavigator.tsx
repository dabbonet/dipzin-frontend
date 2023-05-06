'use client'
import { useContentDiscovery } from "@/context/useContentDiscovery";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react"

const HomeNavigator: FC = () => {
    const path = usePathname();
    const { setStreamData, filters } = useContentDiscovery()
    return (
        <div className="flex space-x-6 items-center mt-8 h-10">

            {!filters ? (
                <>
                    <Link href="/" className="cursor-pointer duration-500 flex items-center">
                        <span
                            className={cn("text-slate-900 dark:text-slate-100 text-[2rem] font-normal tracking-wide origin-left transform transition-all duration-500", path === "/" ? "text-[2.2rem] opacity-100" : "opacity-70")}
                        >
                            Stream
                        </span>

                        <motion.div
                            onClick={() => setStreamData({})}
                            whileHover={{ rotate: 90 }}
                            whileTap={{
                                rotate: 360,
                            }}
                            transition={{ type: "spring", stiffness: 50, damping: 20 }}
                            className={cn("ml-3 transition-opacity", path === "/" ? "opacity-100" : "opacity-25")}
                        >
                            <img className=" w-8" src="/images/assets/refresh.svg" alt="refresh" />
                        </motion.div>
                    </Link>
                    <Link href="/collections" className="mt-1">
                        <span
                            className={cn("text-slate-900 dark:text-slate-100 text-[2rem] font-light origin-left transform transition-all duration-500", path === "/" ? "opacity-70" : "text-[2.2rem] opacity-100")}
                        >
                            Collections
                        </span>
                    </Link>
                </>
            ) : (
                <span
                    className="text-slate-900 dark:text-slate-100 text-[2rem] font-light origin-left transform transition-all duration-500 opacity-100"
                >
                    Search Results
                </span>
            )}
        </div>
    )
}

export default HomeNavigator
'use client'
import { useContentDiscovery } from "@/context/useContentDiscovery";
import { usePlatform } from "@/context/usePlatforms";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect } from "react"

const HomeNavigator: FC = () => {
    const path = usePathname();
    const { setStreamData } = useContentDiscovery()
    const { selected, platforms, slug } = usePlatform()
    if (!path.startsWith('/search')) {
        return <div className="flex space-x-6 items-center mt-8 h-10 mx-auto  max-w-[90%]">
            <>
                <Link href={platforms ? `/${slug()}` : '/ios'} className="cursor-pointer duration-500 flex items-center">
                    <span
                        className={cn("text-slate-900 dark:text-slate-100 text-[2rem] font-normal tracking-wide origin-left transform transition-all duration-500"," text-[1.8rem] md:text-[2.2rem] opacity-100")}
                    >
                        Stream
                    </span>

                </Link>
                <motion.div
                    onClick={() => setStreamData([])}
                    whileHover={{ rotate: 90 }}
                    whileTap={{
                        rotate: 360,
                    }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    className={cn("ml-3 transition-opacity cursor-pointer opacity-100" )}
                >
                    <img className="w-6  md:w-8" src="/images/assets/refresh.svg" alt="refresh" title="refresh" />
                </motion.div>
                {/* <Link href="/collections" className="mt-1">
                <span
                className={cn("text-slate-900 dark:text-slate-100 text-[2rem] font-light origin-left transform transition-all duration-500", path === "/" ? "opacity-70" : "text-[2.2rem] opacity-100")}
                >
                Collections
                </span>
            </Link> */}
            </>
        </div>
    } else {
        return <div className="flex space-x-6 items-center mt-8 h-10 mx-auto  max-w-[90%]">
            <span
                className="text-slate-900 dark:text-slate-100 text-[2rem] font-light origin-left transform transition-all duration-500 opacity-100"
            >
                Search Results
            </span>
        </div>

    }

}

export default HomeNavigator
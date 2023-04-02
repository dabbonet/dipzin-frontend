'use client'
import React, { useRef } from 'react'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion, MotionConfig, useAnimationControls } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';
import Search from './search';
import Menu from './menu';
import Filters from './filters';
import Icons from '@/components/Icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import useMeasure from 'react-use-measure';
import useDebounce from '@/lib/debounce';

const MainNavigator = ({ type }: any) => {
    const [navOpen, setNavOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)

    // Logic to handle if user clicks outside of the navigator
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setFilterOpen(false)
                    setMenuOpen(false)
                    setNavOpen(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);



    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 200);

    return (
        <div ref={wrapperRef} className="fixed left-0 right-0 bottom-12 mx-auto flex justify-center z-20">
            <div className='relative flex items-end'>

                {/* User Avatar area */}
                <motion.div
                    layout="position"
                    className="mr-4 mb-2 cursor-pointer"
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="overflow-hidden w-[45px] h-[45px] rounded-full mr-2 relative cursor-pointer border-2 border-slate-200 bg-slate-900">
                                <img
                                    className="w-full rounded-full"
                                    src={"/_next/image?url=https%3A%2F%2Fdipzinapplications.s3.us-west-1.amazonaws.com%2Fthumbnail_82f58fa7_9f57_45c8_b882_0c520c43eedf_a63e322d65.png&w=96&q=75"}
                                    alt='avatar'
                                />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='start' forceMount className='p-5 mb-4 rounded-xl'>
                            <div
                                className={`opacity-100 max-w-sm transform-gpu transition duration-400  text-slate-100`}
                            >
                                <div className="flex items-center mb-[20px]">
                                    <div className="w-10 h-10 rounded-full mr-2 bg-slate-800">
                                        <img
                                            className="rounded-full"
                                            src={"/_next/image?url=https%3A%2F%2Fdipzinapplications.s3.us-west-1.amazonaws.com%2Fthumbnail_82f58fa7_9f57_45c8_b882_0c520c43eedf_a63e322d65.png&w=96&q=75"}
                                            alt='avatar'
                                        />
                                    </div>
                                    <div>
                                        <span className="font-bold text-base w-full">
                                            Ahmed Mahmoud
                                        </span>
                                        <span className="block font-medium text-[12px] text-slate-400">
                                            @ahmed
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <DropdownMenuItem>
                                <Icons.Sun className='mr-2 h-4 w-4'></Icons.Sun>
                                <Link href="/account">
                                    Account Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Icons.Sun className='mr-2 h-4 w-4'></Icons.Sun>
                                <span
                                // onClick={() => {
                                //     router.push("/profile");
                                // }}
                                >
                                    Membership
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Icons.Sun className='mr-2 h-4 w-4'></Icons.Sun>
                                <span
                                // onClick={() => {
                                //     router.push("/profile");
                                // }}
                                >
                                    Logout
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>

                    </DropdownMenu>
                </motion.div>

                <MotionConfig transition={{ duration: .5 }}>

                    {/* Navigator Area */}
                    <motion.div
                        layoutRoot
                        className="relative w-full h-full rounded-3xl bg-slate-900/90 border-[0.5px] border-slate-800 p-2 flex-col items-end text-slate-100 tracking-[.07rem]"
                        transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
                        initial={{ borderRadius: 30 }}
                    >

                        <AnimatePresence mode='wait'>
                            {navOpen && (
                                <Search search={debouncedSearch} />
                            )}

                            {filterOpen && (
                                <Filters />
                            )}
                            {menuOpen && (
                                <Menu />
                            )}
                        </AnimatePresence>
                        <motion.div className="flex w-full h-[48px] relative z-30">

                            <motion.div
                                layout="position"
                                className="flex items-center bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-3xl px-7 space-x-2 mr-5"
                                onClick={() => {
                                    setMenuOpen(!menuOpen);
                                    setNavOpen(false);
                                    setFilterOpen(false);
                                }}>
                                <Icons.Grip className='w-4 h-4 text-slate-400' />
                                <span className="font-medium text-sm mt-0.5">Menu</span>
                            </motion.div>

                            <motion.div layout className="flex items-center h-[48px] w-[100%] bg-slate-800 rounded-full pl-7">
                                <motion.input
                                    layout
                                    className="appearance-none h-[100%] bg-inherit border-[0px] outline-0"
                                    placeholder="Search"
                                    transition={{ duration: 0.4 }}
                                    animate={{ width: navOpen ? "40vw" : "18vw" }}
                                    onChange={(e) => {
                                        if (e.target.value.length > 0) {
                                            setSearch(e.target.value);
                                            setNavOpen(true);
                                            setMenuOpen(false);
                                            setFilterOpen(false);
                                        } else {
                                            setNavOpen(false);
                                        }
                                    }}
                                    onFocus={(e) => {
                                        if (e.target.value.length > 0) {
                                            setNavOpen(true);
                                            setMenuOpen(false);
                                            setFilterOpen(false);
                                        }
                                    }}
                                />
                                <motion.div
                                    layout="position"
                                    className="h-full flex items-center bg-gradient-to-br from-slate-700 to-slate-700/60  hover:bg-slate-600 cursor-pointer rounded-full space-x-2 px-6 ml-auto"
                                    onClick={() => {
                                        setFilterOpen(!filterOpen);
                                        setNavOpen(false);
                                        setMenuOpen(false);
                                    }}>
                                    <Icons.Filter className='w-4 h-4 text-slate-400' />
                                    <span className="font-medium text-sm mt-0.5">Fillter</span>
                                </motion.div>
                            </motion.div>

                        </motion.div>

                    </motion.div>
                </MotionConfig>

            </div>
        </div >
    )
}

export default MainNavigator



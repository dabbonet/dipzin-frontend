'use client'
import React, { useCallback, useRef } from 'react'
import { useState, useEffect } from "react";
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import Search from './search';
import Menu from './menu';
import Filters from './filters';
import Icons from '@/components/Icons';
import { useContentDiscovery } from '@/context/useContentDiscovery';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUser } from '@/lib/auth';
import Link from 'next/link';


const MainNavigator = ({ type }: any) => {
    const [navOpen, setNavOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)
    const searchParams = useSearchParams()!;
    const router = useRouter();


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

    const { filters, setFilters, searchKeyword, setSearchKeyword } = useContentDiscovery();

    useEffect(() => {
        if (!searchKeyword) {
            setNavOpen(false)
        }
    }, [filters, searchKeyword])


    const removeTag = useCallback((type, indexToRemove) => {
        let params = new URLSearchParams(searchParams.toString());
        let categories, tags;
        if (type === 'tag') {
            const tagList = filters.tags.filter((_, index) => index !== indexToRemove);
            tags = tagList.join(',');
            tagList.length > 0 ? params.set('tags', tags) : params.delete('tags');
            setFilters({ ...filters, tags: tagList })
        } else {
            const categoryList = filters.categories.filter((_, index) => index !== indexToRemove);
            categories = categoryList.join(',');
            categoryList.length > 0 ? params.set('categories', categories) : params.delete('categories');
            setFilters({ ...filters, categories: categoryList })
        }
        router.push('/search?' + params)

    }, [searchParams, router, filters])

    return (
        <div ref={wrapperRef} className="fixed left-32 right-32 bottom-12 mx-auto flex justify-center z-20">
            <div className='relative flex items-end'>

                {/* User Avatar area */}

                {/* Navigator Area */}
                <motion.div
                    layoutRoot
                    className="relative w-full h-full rounded-3xl bg-slate-950/100 border-[0.5px] border-slate-800 p-2 flex-col items-end text-slate-100 tracking-[.07rem]"
                    transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
                    initial={{ borderRadius: 30 }}
                >

                    <AnimatePresence mode='wait'>
                        {navOpen && (
                            <Search />
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
                            className="flex items-center bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-3xl px-7 space-x-2 mr-2"
                            onClick={() => {
                                setMenuOpen(!menuOpen);
                                setNavOpen(false);
                                setFilterOpen(false);
                            }}>
                            <Icons.Grip className='w-4 h-4 text-slate-400' />
                            <span className="font-medium text-sm mt-0.5">Menu</span>
                        </motion.div>

                        <motion.div layout className={cn("flex items-center h-[48px] w-[100%] bg-slate-800 rounded-full", filters?.tags || filters?.categories ? 'pl-3' : 'pl-7')}>
                            {/* TODO: Reduce size and add selected tags/categories in circles like ui */}
                            {filters && (filters?.tags?.length > 0 || filters?.categories?.length > 0) && (
                                <div className='relative rounded-md'>
                                    <div className='w-[7%] h-full absolute left-0 bg-gradient-to-r from-slate-800 to-slate-800/0'></div>
                                    <div className='w-[7%] h-full absolute right-0 bg-gradient-to-l from-slate-800 to-slate-800/0'></div>
                                    <ul className='flex space-x-2 mr-2 w-fit max-w-[20vw] overflow-x-scroll scrollbar-none ml-2'>
                                        {filters?.categories?.map((category, index) => (
                                            <TagItem key={index} title={category} onClick={() => removeTag('category', index)} />
                                        ))}
                                        {filters?.tags?.map((tag, index) => tag && (
                                            <TagItem key={index} title={tag} onClick={() => removeTag('tag', index)} />
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <motion.input
                                layout
                                className="appearance-none h-[100%] bg-inherit border-[0px] outline-0 text-sm rounded-full"
                                placeholder={filters ? 'Search More Tags...' : 'Try Search!'}
                                transition={{ duration: 0.4 }}
                                animate={{ width: navOpen ? "40vw" : "18vw" }}
                                value={searchKeyword}
                                onChange={(e) => {
                                    setSearchKeyword(e.target.value);
                                    if (e.target.value.length > 0) {
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
                            {/* <motion.div
                                    layout="position"
                                    className="h-full flex items-center bg-gradient-to-br from-slate-700 to-slate-700/60  hover:bg-slate-600 cursor-pointer rounded-full space-x-2 px-6 ml-auto"
                                    onClick={() => {
                                        setFilterOpen(!filterOpen);
                                        setNavOpen(false);
                                        setMenuOpen(false);
                                    }}>
                                    <Icons.Filter className='w-4 h-4 text-slate-400' />
                                    <span className="font-medium text-sm mt-0.5">Fillter</span>
                                </motion.div> */}
                        </motion.div>

                    </motion.div>

                </motion.div >
                {/* </MotionConfig > */}

            </div >
        </div >
    )
}

export default MainNavigator



const TagItem = ({ title, onClick }) => {
    return (
        <li onClick={onClick} className='text-slate-400 hover:text-slate-200 cursor-pointer flex items-center space-x-1 border border-slate-500 rounded-full font-light text-sm py-[0.25rem] pl-2 pr-1.5'>
            <span className='w-max'>{title}</span>
            <Icons.XCircle className='w-5 h-5 hover:text-aqua-500' />
        </li>
    )
}
'use client'
import React, { useCallback, useRef } from 'react'
import { useState, useEffect } from "react";
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import Search from './search';
import Menu from './menu';
import Icons from '@/components/Icons';
import { useContentDiscovery } from '@/context/useContentDiscovery';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import InitialSearch from './InitailSearch';
import { useNavigator } from '@/context/useNavigatiorContext';
import { useSelcetedImages } from '@/lib/SelectedToDownload';
import { ImageDownloader } from '@/lib/ImageDownloader';
const qs = require('qs')


const MainNavigator = ({ type }: any) => {
    const searchParams = useSearchParams()!;
    const router = useRouter();
    const { activeView, setActiveView, activeControls, setActiveControls } = useNavigator()
    const { selectedImages, setSelectedImages } = useSelcetedImages()
    const { filters, setFilters, searchKeyword, setSearchKeyword } = useContentDiscovery();
    const inputRef = useRef(null)
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && (event.key === 'k' || event.keyCode === 75)) {
                event.preventDefault();
                // Perform your desired functionality here
                setActiveView(prev => {
                    if (['search' , 'initial'].includes(prev)) {
                        setSearchKeyword('')
                        inputRef?.current?.blur()
                        return ''
                    } else {
                        inputRef?.current?.focus()
                        return 'initial'
                    }
                })
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeView]);
    // Logic to handle if user clicks outside of the navigator
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setActiveView('menuWithSearch')
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

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchKeyword(e.target.value);
            if (e.target.value.length > 0) {
                setActiveView('search');
            } else {
                setActiveView('initial');
            }
        },
        [setSearchKeyword, setActiveView]
    );
    const handleGetScreens = () =>{
        const query = qs.stringify({
            q: searchKeyword
        })
        console.log()
        router.push(`/search?${query}`)
    }
    if (activeControls === '') return
    return (
        <div ref={wrapperRef} className="fixed left-1/2 -translate-x-1/2 bottom-12 flex justify-center z-[10000000] w-fit">
            <div className='relative flex items-end'>

                {/* User Avatar area */}

                {/* Navigator Area */}
                <motion.div

                    className="relative w-full h-full rounded-3xl bg-slate-950/100 border-[0.5px] border-slate-800 p-2 flex-col items-end text-slate-100 tracking-[.07rem]"
                    transition={{ type: "spring", duration: 0.6 }}
                    initial={{ borderRadius: 30 }}
                >

                    <AnimatePresence mode='wait'>
                        {activeView == 'search' && (
                            <Search />
                        )}
                        {activeView == 'menu' && (
                            <Menu />
                        )}
                        {activeView == 'initial' && (
                            <InitialSearch />
                        )}
                    </AnimatePresence>

                    <motion.div className="flex w-full h-[48px] relative z-30 space-x-2">


                        <motion.div

                            className="flex items-center bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-3xl px-7 space-x-2"
                            onClick={() => {
                                setActiveView(activeView == 'menu' ? '' : 'menu')
                            }}>
                            <Icons.Grip className='w-4 h-4 text-slate-400' />
                            <span className="font-medium text-sm mt-0.5">Menu</span>
                        </motion.div>



                        {(activeControls == 'menu-search') && (

                            <motion.div className={cn("flex items-center h-[48px] w-[100%] bg-slate-800 rounded-full pl-3 relative")}>
                                <motion.img src='/images/assets/search.svg' className=' mr-2'/> 
                                <motion.input
                                    ref={inputRef}
                                    className=" h-[100%]  bg-inherit border-[0px] outline-0 text-sm rounded-full"
                                    placeholder={filters ? 'Search More Tags...' : 'Try Search!'}
                                    transition={{ duration: 0.4 }}
                                    animate={{ width: '100%' }}
                                    value={searchKeyword}
                                    onChange={handleSearch}
                                    onFocus={(e) => {
                                        setActiveView('initial')
                                        if (e.target.value.length > 0) {
                                            setActiveView('search')
                                        }
                                    }}
                                />
                                <motion.button onClick={handleGetScreens} className=' bg-slate-700 py-1 px-2 rounded-full absolute right-1'>search</motion.button>
                            </motion.div>
                        )}

                        {(activeControls == 'selection') && (
                            <div className=' flex gap-20 flex-wrap items-center bg-slate-800 rounded-full pl-5'>
                                <div className=' flex items-center'>{selectedImages.images.length} selected <button className=' ml-2' onClick={() => setSelectedImages({ appName: '', images: [] })}><Icons.Clear /></button></div>

                                <div className=' flex gap-5 pr-3'>
                                    <button className=' py-1 px-3 rounded-2xl bg-slate-600' onClick={() => ImageDownloader(selectedImages.appName + " Showcase", selectedImages.images)}>download</button>
                                </div>
                            </div>
                        )}

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
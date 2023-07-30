'use client'
import React, { useCallback, useRef } from 'react'
import { useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import Search from './search';
import Menu from './menu';
import Icons from '@/components/Icons';
import { useContentDiscovery } from '@/context/useContentDiscovery';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useNavigator } from '@/context/useNavigatiorContext';
import { useSelcetedImages } from '@/lib/SelectedToDownload';
import { ImageDownloader } from '@/lib/ImageDownloader';
import PlatformSwitcher from '@/components/PlatformSwitcher';




const MainNavigator = ({ type }: any) => {
    const router = useRouter();
    const { activeView, setActiveView, activeControls, setActiveControls } = useNavigator()
    const { selectedImages, setSelectedImages } = useSelcetedImages()
    const { filters, setFilters, searchKeyword, setSearchKeyword } = useContentDiscovery();
    const inputRef = useRef(null)
    const searchButton = useRef(null)

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && (event.key === 'k' || event.keyCode === 75)) {
                event.preventDefault();
                // Perform your desired functionality here
                setActiveView('search')
                inputRef?.current?.focus()
            }
            if (event.key === 'Escape') {
                setActiveView('')
                setSearchKeyword('')
                inputRef?.current?.blur()
                setFilters([])
            }
            if (event.key === "Enter") {
                searchButton?.current?.click()
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

    useEffect(() => {
      if(selectedImages.images.length === 0){
        setActiveControls('menu-search')
      }
    }, [selectedImages])
    

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchKeyword(e.target.value);
            setActiveView('search');
        },
        [setSearchKeyword, setActiveView]
    );

    const removeFilter = () => {
        setFilters([])
    }
    const clearParams = (value) => {
        setFilters(filters.filter(el => el !== value))
        const url = new URL(window.location.href);
        const params = url.searchParams;
        const updatedParams = new URLSearchParams();
        params.forEach((paramValue, paramName) => {
            if (paramValue === value) {
                return;
            }
            updatedParams.append(paramName, paramValue);
        });
        const newUrl = `${url.origin}${url.pathname}${updatedParams.toString() ? '?' + updatedParams.toString() : ''}`;
        router.push(newUrl);
    };

    if (activeControls === '') return
    return (
        <div ref={wrapperRef} className="flex w-fit items-center h-full">
            <div className={cn('relative w-fit', activeView == 'search' ? 'bg-slate-950 rounded-2xl p-3' : '')}>
                <div className='flex flex-col md:flex-row items-center w-full bg-slate-900 rounded-full'>
                    {(activeControls == 'menu-search') && (
                        <motion.div className={cn(" flex gap-3 items-center pl-6 w-full")}>
                            <motion.img src='/images/assets/search.svg' className=' mr-2' />
                            <motion.input
                                ref={inputRef}
                                className="bg-inherit outline-none w-fit"
                                placeholder={filters.length !== 0 ? 'Search More Tags...' : 'Try Search!'}
                                transition={{ duration: 0.4 }}
                                animate={{ width: '100%' }}
                                value={searchKeyword}
                                onChange={handleSearch}
                                onFocus={() => {
                                    setActiveView('search')
                                }}
                            />
                            {activeView === 'menuWithSearch' && filters.length !== 0 && <button onClick={removeFilter} className=' text-slate-500 font-medium text-sm'><span className=' text-slate-50 font-bold mr-1'>+{filters.length}</span>filters</button>}
                            <p className=' text-slate-500 text-sm w-20 mr-2 text-center sm:block hidden'>{searchKeyword.length === 0 ? 'CTRL K' : 'Enter'}</p>
                        </motion.div>
                    )}
                    <PlatformSwitcher />
                </div>
                <AnimatePresence mode='wait'>
                    {activeView == 'search' && (
                        <Search />
                    )}
                </AnimatePresence>
            </div>
            <div className='relative h-full'>

                {/* User Avatar area */}

                {/* Navigator Area */}
                <motion.div

                    className="h-full"
                    transition={{ type: "spring", duration: 0.6 }}
                    initial={{ borderRadius: 30 }}
                >


                    <motion.div className="w-fit h-full">


                        {/* <motion.div

                            className="flex items-center bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-3xl px-7 space-x-2"
                            onClick={() => {
                                setActiveView(activeView == 'menu' ? '' : 'menu')
                            }}>
                            <Icons.Grip className='w-4 h-4 text-slate-400' />
                            <span className="font-medium text-sm mt-0.5 mx-auto">Menu</span>
                        </motion.div> */}




                        {(activeControls === 'selection') && selectedImages.images.length !== 0 && (
                            <div className=' flex gap-x-20 flex-wrap justify-center w-fit items-center bg-slate-800 rounded-full pl-5 py-1 z-[100000000000000000000000000000000000000]'>
                                <div className=' flex items-center text-xs md:text-base'>{selectedImages.images.length} selected <button className=' ml-2' onClick={() => setSelectedImages({ appName: '', images: [] })}><Icons.Clear /></button></div>

                                <div className='pr-3'>
                                    <button className=' md:py-1 md:px-3 px-1 py-1 rounded-2xl bg-slate-600 text-xs md:text-base' onClick={() => ImageDownloader(selectedImages.appName + " Showcase", selectedImages.images)}>Download</button>
                                </div>
                            </div>
                        )}


                    </motion.div>
                    <AnimatePresence mode='wait'>
                        {activeView == 'menu' && (
                            <Menu />
                        )}
                    </AnimatePresence>
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
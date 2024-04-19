'use client'
import React, { useCallback, useRef } from 'react'
import { useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import Search from './search';
import Menu from './menu';
import Icons from '@/components/Icons';
import { cn } from '@/lib/utils';
import { useNavigator } from '@/context/useNavigatiorContext';
import { useSelcetedImages } from '@/lib/SelectedToDownload';
import { ImageDownloader } from '@/lib/ImageDownloader';
import PlatformSwitcher from '@/components/PlatformSwitcher';
import { usePathname } from 'next/navigation';
import { useResponsive } from '@/context/useResponsive';
import SmallSearchBar from './SmallSearchBar';
import { useSearchContext } from '@/context/SearchContext';


const MainNavigator = ({ type }: any) => {
    const { activeView, setActiveView, activeControls, setActiveControls } = useNavigator()
    const { selectedImages, setSelectedImages } = useSelcetedImages()
    const { searchKeyword, setSearchKeyword, filters, setFilters } = useSearchContext();
    const inputRef = useRef(null)
    const searchButton = useRef(null)
    const path = usePathname()
    const { isMobile, isTablet } = useResponsive();


    // Logic to handle if user clicks outside of the navigator
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setActiveView('menuWithSearch')
                }
            }
            // Bind the event listener
            (!isMobile && !isTablet) && document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    useEffect(() => {
        if (selectedImages.images.length === 0 && (path.startsWith('/search') || path.startsWith('/app'))) {
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
    if (isMobile || isTablet) return <SmallSearchBar />

    if (activeControls === '') return
    return (
        <div ref={wrapperRef} className="flex w-fit items-center h-full bg-slate-900 rounded-full">
            <div className='relative h-full'>
                <motion.div
                    className="h-full"
                    transition={{ type: "spring", duration: 0.6 }}
                    initial={{ borderRadius: 30 }}
                >
                    <motion.div className="w-fit h-full">
                        {(activeControls === 'selection') && selectedImages.images.length !== 0 && (
                            <div className=' flex gap-x-20 flex-wrap justify-center w-fit items-center bg-slate-900 rounded-full pl-5 py-1'>
                                <div className=' flex items-center text-xs md:text-base'>{selectedImages.images.length} selected <button className=' ml-2' onClick={() => setSelectedImages({ appName: '', images: [] })}><Icons.Clear /></button></div>
                                <div className='pr-3'>
                                    <button className=' md:py-1 md:px-3 px-1 py-1 rounded-2xl bg-slate-700 text-xs md:text-base flex items-center gap-1' onClick={() => ImageDownloader(selectedImages.appName + " Showcase", selectedImages.images)}><Icons.Download className=' w-4 h-4' /> Download</button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div >
            </div >


            {(isMobile || isTablet) && <SmallSearchBar />}


            <div className={cn('relative w-fit', activeView == 'search' ? 'bg-slate-950 rounded-2xl p-3' : '')}>

                <div className='flex flex-col md:flex-row items-center w-full bg-slate-900 rounded-full'>
                    {(activeControls == 'menu-search') && (
                        <motion.div className={cn(" flex gap-3 items-center pl-6 w-full")}>
                            <motion.img src='/images/assets/search.svg' className=' mr-2' alt="search" title="search" />
                            <motion.input
                                ref={inputRef}
                                className="bg-inherit outline-none w-fit p-2"
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
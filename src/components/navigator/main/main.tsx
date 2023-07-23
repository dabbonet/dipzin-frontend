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
import { useNavigator } from '@/context/useNavigatiorContext';
import { useSelcetedImages } from '@/lib/SelectedToDownload';
import { ImageDownloader } from '@/lib/ImageDownloader';
import { usePlatform } from '@/lib/platforms';
import { toast } from 'react-hot-toast';



const MainNavigator = ({ type }: any) => {
    const router = useRouter();
    const { activeView, setActiveView, activeControls, setActiveControls } = useNavigator()
    const { selectedImages, setSelectedImages } = useSelcetedImages()
    const { filters, setFilters, searchKeyword, setSearchKeyword } = useContentDiscovery();
    const inputRef = useRef(null)
    const searchButton = useRef(null)
    const params = useSearchParams()
    const components = params.getAll('component')
    const tag = params.getAll('tag')
    const category = params.getAll('category')


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && (event.key === 'k' || event.keyCode === 75)) {
                event.preventDefault();
                // Perform your desired functionality here
                setActiveView(prev => {
                    if (['search', ].includes(prev)) {
                        setSearchKeyword('')
                        inputRef?.current?.blur()
                        return ''
                    } else {
                        inputRef?.current?.focus()
                        return 'search'
                    }
                })
            }
            if (event.key === "Enter") {
                searchButton.current.click()
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


    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchKeyword(e.target.value);
            setActiveView('search');
        },
        [setSearchKeyword, setActiveView]
    );
    
    const removeFilter = (tag) => {
        setFilters(filters.filter(el=> el.tag !== tag))
    }
    const clearParams = (value)=> {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        params.forEach((paramValue, paramName) => {
            if (paramValue === value) {
            params.delete(paramName);
            }
        });
        const newUrl = `${url.origin}${url.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        router.push(newUrl)

    }
    if (activeControls === '') return
    return (
        <div ref={wrapperRef} className=" flex justify-center z-[10000000] w-fit">
            <div className='relative flex items-end'>

                {/* User Avatar area */}

                {/* Navigator Area */}
                <motion.div

                    className="relative w-full h-full rounded-3xl bg-slate-950/100 border-[0.5px] border-slate-800 p-2 flex-col items-end text-slate-100 tracking-[.07rem]"
                    transition={{ type: "spring", duration: 0.6 }}
                    initial={{ borderRadius: 30 }}
                >


                    <motion.div className="flex w-full h-[48px] relative z-30 space-x-2">


                        <motion.div

                            className="flex items-center bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-3xl px-7 space-x-2"
                            onClick={() => {
                                setActiveView(activeView == 'menu' ? '' : 'menu')
                            }}>
                            <Icons.Grip className='w-4 h-4 text-slate-400' />
                            <span className="font-medium text-sm mt-0.5 mx-auto">Menu</span>
                        </motion.div>



                        {(activeControls == 'menu-search') && (

                            <motion.div className={cn("flex items-center h-[48px] min-w-[20rem] w-full bg-slate-800 rounded-full pl-3 relative")}>
                                <motion.img src='/images/assets/search.svg' className=' mr-2' />
                                <motion.input
                                    ref={inputRef}
                                    className=" h-[100%]  bg-inherit border-[0px] outline-0 text-sm rounded-full max-w-sm"
                                    placeholder={filters.length !== 0 ? 'Search More Tags...' : 'Try Search!'}
                                    transition={{ duration: 0.4 }}
                                    animate={{ width: '100%' }}
                                    value={searchKeyword}
                                    onChange={handleSearch}
                                    onFocus={() => {
                                        setActiveView('search')
                                    }}
                                />
                                {activeView === 'search' && <div className=' flex gap-2'>
                                    {filters.map(el => <button onClick={()=>removeFilter(el.tag)} key={el.tag} className=' text-xs text-white font-bold border border-solid border-white rounded-xl p-2 hover:text-aqua-500 hover:border-aqua-500'>{el.tag}</button>)}
                                    </div>
}
                                <span className=' absolute text-slate-500 right-20 text-xs'>{searchKeyword.length === 0 ? 'CTRL + K' : 'Enter'}</span>
                            </motion.div>
                        )}

                        {(activeControls == 'selection') && (
                            <div className=' flex gap-20 flex-wrap items-center bg-slate-800 rounded-full pl-5'>
                                <div className=' flex items-center'>{selectedImages.images.length} selected <button className=' ml-2' onClick={() => setSelectedImages({ appName: '', images: [] })}><Icons.Clear /></button></div>

                                <div className=' flex gap-5 pr-3'>
                                    <button className=' py-1 px-3 rounded-2xl bg-slate-600' onClick={() => ImageDownloader(selectedImages.appName + " Showcase", selectedImages.images)}>Download</button>
                                </div>
                            </div>
                        )}
                        {(activeControls === 'filters') && (
                            <div className=' flex flex-wrap items-center bg-slate-800 rounded-full px-6'>
                                <button className=' text-white mr-1 font-semibold' onClick={()=> setActiveControls('menu-search')}>{searchKeyword}</button>
                                {[...tag ,...components , ...category].length !== 0 && <div className='flex gap-1 ml-1 items-center'>with filters {[...tag ,...components , ...category].map(el => <button onClick={()=>clearParams(el)} key={el} className=' bg-transparent border border-solid border-slate-300 text-slate-300 rounded-xl py-1 px-2 hover:text-aqua-500 hover:border-aqua-500'>{el} x</button>)}</div> }
                            </div>
                        )}

                    </motion.div>
                    <AnimatePresence mode='wait'>
                        {activeView == 'search' && (
                            <Search />
                        )}
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
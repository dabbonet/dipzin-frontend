import React, { useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Search from './search';
import { useContentDiscovery } from '@/context/useContentDiscovery';
import { cn } from '@/lib/utils';
import { useNavigator } from '@/context/useNavigatiorContext';
import PlatformSwitcher from '@/components/PlatformSwitcher';
import { useResponsive } from '@/context/useResponsive';

const SmallSearchBar = () => {
    const { activeView, setActiveView, activeControls, setActiveControls } = useNavigator()
    const { filters, setFilters, searchKeyword, setSearchKeyword } = useContentDiscovery();
    const inputRef = useRef(null)

     const handleCloseButton = (e) => {
      e.preventDefault();
        setActiveView('')
    }
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
  return (
    <div className={cn('relative w-fit', activeView == 'search' ? 'absolute top-0 left-0 bg-slate-950 rounded-2xl p-3 h-screen w-screen' : '')}>
                 <div className=' absolute top-0 left-0 mt-5 ml-5 '>
                     {activeView == 'search' &&
                     <button onClick={handleCloseButton}><img src='/images/assets/arrow_back.svg' alt='Close Menu'/>
                    </button>}
                </div>
                <div className= {cn(' flex  sm:flex-row md:flex-row items-cente w-[100%] bg-slate-900 rounded-full' ,activeView=='search'?'w-[85%] ml-14':'')}>
                    {(activeControls == 'menu-search') && (
                        <motion.div className={cn(" flex gap-3 items-center pl-6 w-full")}>
                            <motion.img src='/images/assets/search.svg' className=' mr-2' />
                            <motion.input
                                ref={inputRef}
                                className={cn(activeView==''?"bg-inherit outline-none w-fit p-2":'bg-inherit outline-none w-fit')}
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
                        </motion.div>
                    )}
                    {activeView=='search'&&<PlatformSwitcher /> }
                </div>
                <AnimatePresence mode='wait'>
                    {activeView == 'search' && (
                        <Search />
                    )}
                </AnimatePresence>
            </div>  )
}

export default SmallSearchBar;
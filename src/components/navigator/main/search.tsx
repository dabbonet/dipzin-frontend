'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useContentDiscovery } from '@/context/useContentDiscovery';
import { getToken, useAuth } from '@/lib/auth';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce'
import { cn, getPlatformById, platfroms } from '@/lib/utils';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { usePlatform } from '@/context/usePlatforms';
import { usePathname, useRouter } from 'next/navigation';
import { useNavigator } from '@/context/useNavigatiorContext';
import { useDialog } from '@/context/useDialog';
import { useResponsive } from '@/context/useResponsive';
import { useSearchContext } from '@/context/SearchContext';
const qs = require('qs')

const mergeArrays = (arr) => {
    const comps = arr[2].hits.filter(el => el.type === "component").slice(0, 5)
    const tags = arr[2].hits.filter(el => el.type === "tag").slice(0, 5)
    const categories = arr[2].hits.filter(el => el.type === "category").slice(0, 5)
    return {
        apps: arr[1].hits,
        components: comps,
        tags,
        categories
    }
}

const InitialSearch = () => {
    const { searchKeyword, setSearchKeyword, filters } = useSearchContext();
    const { setActiveView, activeView } = useNavigator()
    const { selected } = usePlatform()
    const [data, setdata] = useState(null)
    const inputRef = useRef(null)
    const searchButton = useRef(null)
    const [debounce] = useDebounce(searchKeyword, 300)
    const { showDialog, DIALOG_ENUM, navigateToRoute } = useDialog();
    const { isMobile } = useResponsive();
    const [searchBarWidth, setSearchBarWidth] = useState('w-44');


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && (event.key === 'k' || event.keyCode === 75)) {
                event.preventDefault();
                // Perform your desired functionality here
                setActiveView(prev => {
                    if (['search',].includes(prev)) {
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
    useLayoutEffect(() => {
        const handleSearch = async (debounce) => {
            const res = await fetch(`/api/search`, {
                method: 'POST',
                body: JSON.stringify({
                    keyword: debounce
                })
            });
            const data = await res.json();
            const filterData = mergeArrays(data?.search?.search?.results)
            setdata(filterData)
        }
        if (debounce?.length > 1) {
            handleSearch(debounce)
        } else {
            const myArray = ["hello world", "login", "dashboard", "sign up", "sports"];
            const randomValue = myArray[Math.floor(Math.random() * myArray.length)];
            handleSearch(randomValue)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce])
    const handleGetScreens = () => {
        const query = qs.stringify(
            {
                q: searchKeyword,
                component: filters
                    .filter(el => el.type === 'component' && el.tag)
                    .map(el => el.tag),
                category: filters
                    .filter(el => el.type === 'category' && el.tag)
                    .map(el => el.tag),
                tag: filters
                    .filter(el => el.type === 'tag' && el.tag)
                    .map(el => el.tag),
            },
            { encodeValuesOnly: true, addQueryPrefix: true, indices: false }
        );
        const platform = getPlatformById(selected)
        navigateToRoute({ link: `/search/${platform}${query}` })
    }

    return (
        <motion.div
            layout
            key="menu"
            className='overflow-x-hidden rounded-[20px] p-1 b-g w-full h-fit relative z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        // exit={{ opacity: 0, height: 0, width: 0 }}
        // transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
        >
            <h1 className=' text-slate-100 font-semibold mt-3'><span className='ml-3 mt-3 text-xs md:text-base'>Search Suggestions</span></h1>
            <div className=' overflow-y-hidden h-[90%] md:h-[25rem] xl:w-[900px] rounded-[20px] mb-10'>
                {/* <div className='w-full h-[10%] absolute bottom-0 bg-gradient-to-b from-slate-950/0 to-slate-950/90'></div> */}

                <div className='flex h-full p-2 px-4 flex-col overflow-y-scroll'>
                    <p className=' text-slate-500 text-xs'>Featured Apps</p>
                    <div className=' grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-3 mt-3 mb-6'>
                        {data ?
                            data?.apps?.map((el, index) =>
                                <App slug={el.app.slug} key={index} name={el.app.name} src={el.app.icon} app_catigory={el.app.categories[0]} app_platform={platfroms[el.app.platform]} />
                            )
                            :
                            isMobile ? <VerticalSearchLoader /> : <SearchLoader cellsNumber={6} />
                        }
                    </div>
                    <div className='flex justify-between'>
                        <p className=' text-slate-500 text-xs'>Tags</p>
                        <button className=' text-xs md:text-base'>view all</button>
                    </div>
                    <div className=' flex gap-2 mt-2 mb-6 flex-wrap'>
                        {data ? data?.tags?.map((el, index) => {
                            return <FeatureCard tag={el.name} type={el.type} key={index} />
                        }) : <SearchLoader cellsNumber={5} />}
                    </div>
                    <div className='flex justify-between'>
                        <p className=' text-slate-500 text-xs'>Components</p>
                        <button className=' text-xs md:text-base'>View all</button>
                    </div>
                    <div className=' flex gap-2 mt-2 mb-6 flex-wrap'>
                        {data ? data?.components?.map((el, index) => {
                            return <FeatureCard tag={el.name} type={el.type} key={index} />
                        }) : <SearchLoader cellsNumber={5} />}
                    </div>
                    <div className='flex justify-between'>
                        <p className=' text-slate-500 text-xs'>Categories</p>
                        <button className=' text-xs md:text-base'>view all</button>
                    </div>
                    <div className=' flex gap-2 mt-2 mb-6 flex-wrap'>
                        {data ? data?.categories?.map((el, index) => {
                            return <FeatureCard tag={el.name} type={el.type} key={index} />
                        }) : <SearchLoader cellsNumber={5} />}

                    </div>
                </div>
            </div>
            <motion.button disabled={searchKeyword?.length === 0 ? true : false} ref={searchButton} onClick={handleGetScreens} className={cn(' absolute w-[95%] font-semibold py-2 left-1/2 -translate-x-1/2 text-center text-white rounded-full bottom-5', searchKeyword?.length === 0 ? 'bg-slate-900' : 'bg-aqua-500')}>search</motion.button>
        </motion.div>
    )
}

export default InitialSearch


const InitialSearchCard = () => {
    return <div className='flex-shrink-0 w-[300px] bg-slate-900 hover:bg-slate-800 rounded-2xl p-4 gap-1'>
        <h3 className='text-slate-200 font-semibold'>Figma Plugin</h3>
        <p className='text-slate-400 text-xs'>Work from your browser with our lightweight extension.</p>
        <span className=' bg-lime-100 rounded-md  px-1 text-lime-900'>In Progress</span>
    </div>
}


const FeatureCard = ({ tag, type }) => {
    const { filters, setFilters } = useSearchContext()

    const handleClick = () => {
        if (filters.some(el => el.tag === tag && el.type === type)) {
            setFilters(filters.filter(el => el.tag !== tag))
            return
        }
        setFilters([... new Set(filters), { tag, type }])
    }

    if (filters.some(el => el.tag === tag)) {
        return <button className=' md:py-1.5 md:px-3 py-1 px-1 bg-slate-800 rounded-lg w-fit border border-solid border-aqua-400' onClick={handleClick}>
            <span className=' text-slate-200 mx-auto text-xs md:text-base'>{tag}</span>
        </button>
    }
    return <button className=' md:py-1.5 md:px-3 py-1 px-1 bg-slate-900 hover:bg-slate-800 rounded-lg w-fit border border-solid border-transparent' onClick={handleClick}>
        <span className=' text-slate-200 mx-auto text-xs md:text-base'>{tag}</span>
    </button>
}

const App = ({ name, src, app_catigory, app_platform, slug }) => {
    const { navigateToRoute } = useDialog()
    return <button onClick={() => navigateToRoute({ link: `/app/${app_platform}/${slug}` })} className='hover:bg-slate-900 w-fit px-2 py-2 rounded-xl flex gap-3 items-center flex-wrap' >
        <Image src={src} width={24} height={24} alt='' className=' rounded-md' />
        <h3 className=' font-medium md:text-sm text-xs'>{name}</h3>
        <span className=' text-slate-700 text-xs md:text-base'>{app_catigory}</span>
        <span className=' text-slate-500 bg-slate-800 md:px-2 px-1 capitalize rounded-lg text-xs md:text-base'>{app_platform}</span>
    </button>
}


const SearchLoader = ({ cellsNumber }) => {
    const arr = []
    for (let i = 0; i < cellsNumber; i++) {
        arr.push(i)
    }
    return <div className=' flex flex-wrap w-full gap-4'>
        {arr.map((el, index) => <div key={index} className='flex-1 bg-slate-900 h-8 rounded-md'>
        </div>)}
    </div>
}


function VerticalSearchLoader() {
    const [searchBarWidths, setSearchBarWidths] = useState([]);
    const cellCount = 5;

    useEffect(() => {
        const newWidths = Array.from({ length: cellCount }).map(() => (Math.random() < 0.5 ? 'w-44' : 'w-60'));
        setSearchBarWidths(newWidths);
    }, []);

    return (
        <div className="flex flex-col gap-3">
            {searchBarWidths.map((width, index) => (
                <div key={index} className={`bg-slate-900 h-8 ${width} rounded-md`}></div>
            ))}
        </div>
    );
}




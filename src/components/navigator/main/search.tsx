import { motion } from 'framer-motion'
import Image from 'next/image'
import { useContentDiscovery } from '@/context/useContentDiscovery';
import { getToken } from '@/lib/auth';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDebounce } from 'use-debounce'
import { platfroms } from '@/lib/utils';
import Link from 'next/link';

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
    const { searchKeyword } = useContentDiscovery();
    const [data, setdata] = useState(null)
    const [debounce] = useDebounce(searchKeyword, 300)
    const token = getToken()
    useLayoutEffect(() => {
        const handleSearch = async (debounce) => {
            const res = await fetch(`/api/search`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    keyword: debounce
                })
            });
            const data = await res.json();
            const filterData = mergeArrays(data?.search?.search?.results)
            setdata(filterData)
        }
        if (debounce.length > 1) {
            handleSearch(debounce)
        }else{
            const myArray = ["hello world", "login", "dashboard", "sign up", "sports"];
            const randomValue = myArray[Math.floor(Math.random() * myArray.length)];
            handleSearch(randomValue)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce])
    return (
        <motion.div
            layout
            key="menu"
            className='overflow-x-hidden bg-[#050814]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0, width: 0 }}
        // transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
        >
            <div className=' overflow-y-hidden relative h-[400px] w-[1000px]'>
                <div className='w-full h-[10%] absolute bottom-0 bg-gradient-to-b from-slate-950/0 to-slate-950/90'></div>

                {data &&
                    <div className='flex h-full p-2 px-4 flex-col overflow-y-scroll'>
                        <h1 className=' text-slate-100 font-semibold mb-3'>Search Suggestions</h1>
                        <p className=' text-slate-500 text-xs'>Featured Apps</p>
                        <div className=' grid grid-cols-2 gap-3 mt-3 mb-6'>
                            {data && data?.apps?.map((el, index) => <App slug={el.app.slug} key={index} name={el.app.name} src={el.app.icon} app_catigory={el.app.categories[0]} app_platform={platfroms[el.app.platform]} />)}
                        </div>
                        <p className=' text-slate-500 text-xs'>Tags</p>
                        <div className=' flex gap-2 mt-2 mb-6'>
                            {data && data?.tags?.map((el, index) => {
                                return <FeatureCard tag={el.name} type={el.type} key={index}/>
                            })}
                        </div>
                        <p className=' text-slate-500 text-xs'>components</p>
                        <div className=' flex gap-2 mt-2 mb-6'>
                            {data && data?.components?.map((el, index) => {
                                return <FeatureCard tag={el.name} type={el.type} key={index} />
                            })}
                        </div>
                        <p className=' text-slate-500 text-xs'>categories</p>
                        <div className=' flex gap-2 mt-2 mb-6'>
                            {data && data?.categories?.map((el, index) => {
                                return <FeatureCard tag={el.name} type={el.type} key={index} />
                            })}

                        </div>
                    </div>
                }
            </div>

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
    const { filters, setFilters, searchKeyword } = useContentDiscovery()
    
    const handleClick = () => {
        if (filters.some(el => el.tag === tag && el.type === type)) {
            setFilters(filters.filter(el => el.tag !== tag))
            return
        }
        setFilters([... new Set(filters), { tag, type }])
    }

    if (filters.some(el => el.tag === tag)) {
        return <button className=' py-1.5 px-3 bg-slate-800 rounded-lg w-fit border border-solid border-aqua-400' onClick={handleClick}>
            <span className=' text-slate-200 mx-auto'>{tag}</span>
        </button>
    }
    return <button className=' py-1.5 px-3 bg-slate-900 hover:bg-slate-800 rounded-lg w-fit border border-solid border-transparent' onClick={handleClick}>
        <span className=' text-slate-200 mx-auto'>{tag}</span>
    </button>
}

const App = ({ name, src, app_catigory, app_platform, slug }) => {

    return <Link href={`/app/${app_platform}/${slug}`} className='hover:bg-slate-900 w-fit px-2 py-2 rounded-xl flex gap-x-3 items-center' >
        <Image src={src} width={24} height={24} alt='' className=' rounded-md' />
        <h3 className=' font-medium text-sm'>{name}</h3>
        <span className=' text-slate-700'>{app_catigory}</span>
        <span className=' text-slate-500 bg-slate-800 px-2 capitalize rounded-lg'>{app_platform}</span>
    </Link>
}

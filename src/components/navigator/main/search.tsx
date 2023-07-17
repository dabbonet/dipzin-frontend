import { motion } from 'framer-motion'
import Image from 'next/image'
import { useContentDiscovery } from '@/context/useContentDiscovery';
import { getToken } from '@/lib/auth';
import { useLayoutEffect, useState } from 'react';
import { useDebounce } from 'use-debounce'
import { platfroms } from '@/lib/utils';

const mergeArrays = (arr)=> {
    const comps = arr[2].hits.filter(el => el.type === "component").slice(0, 5)
    const tags = arr[2].hits.filter(el => el.type === "tag").slice(0,5)
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
        if (debounce.length > 1) {
            const handleSearch = async () => {
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
                // For loop data.hits & Check Tags,components, categories Set length
                // if length < 5 ... keep looping and add new tags to set until set length for tags, components and categories
                const filterData = mergeArrays(data?.search?.search?.results)
                setdata(filterData)
            }
            handleSearch()
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
            <div className=' overflow-y-hidden relative h-[400px]'>
                <div className='w-full h-2 absolute bottom-0 bg-gradient-to-b from-slate-900/0 to-slate-900/90'></div>

                <div className='flex h-full p-2 px-4 w-[1000px] flex-col overflow-y-scroll'>
                    <h1 className=' text-slate-100 font-semibold mb-3'>Search Suggestions</h1>
                    <p className=' text-slate-500 text-xs'>Featured Apps</p>
                    <div className=' grid grid-cols-2 gap-3 mt-3 mb-6'>
                        {data && data?.apps?.map(el => <App key={el} name={el.app.name} src={el.app.icon} app_catigory={el.app.categories[0]} app_platform={platfroms[el.app.platform]}/>)}
                    </div>
                    <p className=' text-slate-500 text-xs'>Tags</p>
                    <div className=' flex gap-2 mt-2 mb-6'>
                        {data && data?.tags?.map(el => {
                            return <FeatureCard tag={el.name} />
                        })}

                    </div>
                    <p className=' text-slate-500 text-xs'>components</p>
                    <div className=' flex gap-2 mt-2 mb-6'>
                        {data && data?.components?.map(el => {
                            return <FeatureCard tag={el.name} />
                        })}

                    </div>
                    <p className=' text-slate-500 text-xs'>categories</p>
                    <div className=' flex gap-2 mt-2 mb-6'>
                        {data && data?.categories?.map(el => {
                            return <FeatureCard tag={el.name} />
                        })}

                    </div>
                </div>
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


const FeatureCard = ({ tag }) => {
    const [cliced, setcliced] = useState(false)

    if (cliced) {
        return <button className=' py-2 px-3 bg-slate-800 rounded-lg w-fit border border-solid border-aqua-400' onClick={() => setcliced(!cliced)}>
            <span className=' text-slate-200 mx-auto'>{tag}</span>
        </button>
    }
    return <button className=' py-2 px-3 bg-slate-800 rounded-lg w-fit border border-solid border-transparent' onClick={() => setcliced(!cliced)}>
        <span className=' text-slate-200 mx-auto'>{tag}</span>
    </button>
}

const App = ({ name, src, app_catigory , app_platform }) => {
    return <div className=' flex gap-x-3 items-center'>
        <Image src={src} width={24} height={24} alt='' className=' rounded-md'/>
        <h3 className=' font-medium text-sm'>{name}</h3>
        <span className=' text-slate-700'>{app_catigory}</span>
        <span className=' text-slate-500 bg-slate-800 p-1 rounded'>{app_platform}</span>
    </div>
}

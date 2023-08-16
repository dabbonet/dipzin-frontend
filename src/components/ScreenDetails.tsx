'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { usePlatform } from '@/context/usePlatforms'
import { getPlatformById } from '@/lib/utils'
import { useContentDiscovery } from '@/context/useContentDiscovery'
import Image from 'next/image'
const qs = require('qs')
const ScreenDetails = ({ screenId }) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        async function getData() {
            const req = await fetch(`/api/screens`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    screenId,
                })
            })
            const res = await req.json()
            if (res) {
                const data = {
                    colors: res.data?.attributes.colors,
                    tags: res.data?.attributes.tags.data,
                    components: res.data?.attributes.components.data,
                    app: res.data?.attributes.app.data.attributes
                }
                setData(data)
            }
        }
        getData()
    }, [screenId]);
    const App = () => {
        const icon = data?.app?.icon?.data?.attributes?.hash + data?.app?.icon?.data?.attributes?.ext
        return <div className=' flex flex-col gap-1'>
            <Image src={icon} className='rounded-xl' width={56} height={56} alt='' />
            <h2 className='text-white'>{data.app.name}</h2>
            <p className=' text-slate-600'>{data.app.tag_line}</p>
        </div>
    }
    const Components = () => {
        return <div className=' flex gap-2 flex-wrap'>
            {data?.components.map(el => (
                <Tag name={el.attributes.name} type="component" key={el} />
            ))}
        </div>
    }
    const Tags = () => {
        return <div className=' flex gap-2 flex-wrap'>
            {data?.tags.map(el => (
                <Tag name={el.attributes.name} type="tag" key={el} />
            ))}
        </div>
    }
    const Colors = () => {
        const colorsArr = data?.colors.split(',')
        return <div className='flex gap-2 flex-wrap'>
            {colorsArr?.map(el => (
                <ColorSquare color={el} key={el} />
            ))}
        </div>
    }
    if (data) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='absolute -left-[100%]'
            >
                <div className=' bg-slate-950 p-8 flex flex-col gap-y-8 rounded-3xl w-[370px] h-fit'>
                    {data?.app && <div>
                        <p className=' text-slate-500 text-sm mb-2'>App</p>
                        <App />
                    </div>}
                    {data?.tags?.length > 0 &&
                        <div>
                            <p className=' text-slate-500 text-sm mb-2'>Tags</p>
                            <Tags />
                        </div>
                    }
                    {data?.components?.length > 0 &&
                        <div>
                            <p className=' text-slate-500 text-sm mb-2'>components</p>
                            <Components />
                        </div>
                    }
                    {data?.colors?.length > 0 &&
                        <div>
                            <p className=' text-slate-500 text-sm mb-2'>colors</p>
                            <Colors />
                        </div>
                    }

                </div>
            </motion.div>

        )
    }
}

export default ScreenDetails


const ColorSquare = ({ color }) => {
    const [showColorCode, setShowColorCode] = useState(false)
    function copyToClipboard() {
        navigator.clipboard.writeText(color)
            .then(() => {
                toast.remove()
                toast.success('Text copied to clipboard');
            })
            .catch((error) => {
                toast.remove()
                toast.error('Error copying text to clipboard:', error);
            });
    }
    return <button onClick={copyToClipboard} onMouseEnter={() => setShowColorCode(true)} onMouseLeave={() => setShowColorCode(false)} className={` w-10 h-10 rounded-xl border-transparent border-[3px] hover:border-aqua-400 relative`} style={{ backgroundColor: color }}>
        {showColorCode && <span className=' absolute -bottom-14 left-1/2 -translate-x-1/2'>copy {color}</span>}
    </button>
}

const Tag = ({ name, type }: { name: string, type: string }) => {
    const { selected } = usePlatform()
    const { searchKeyword } = useContentDiscovery()
    const router = useRouter()
    const platform = getPlatformById(selected)
    const searchTag = () => {
        const query = qs.stringify({
            q: searchKeyword,
            [type]: name
        })
        console.log(query)
        router.push(`/search/${platform}?${query}`)
    };

    return (
        <button
            onClick={searchTag}
            className='bg-slate-800 hover:bg-slate-700 py-1 px-4 text-sm rounded-3xl'
        >
            {name}
        </button>
    );
};

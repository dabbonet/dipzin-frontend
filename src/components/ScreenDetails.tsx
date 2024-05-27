'use client'
import { useRouter } from 'next/navigation';
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { usePlatform } from '@/context/usePlatforms';
import { getPlatformById } from '@/lib/utils';
import Image from 'next/image';
import { useSearchContext } from '@/context/SearchContext';
import { Button, Tab, Tabs } from '@nextui-org/react';
const qs = require('qs');

// ScreenDetails component
const ScreenDetails = ({ screenId, isOpen, setIsOpen }) => {
    const [data, setData] = useState(null);
    const { slug, selected } = usePlatform();

    const handelOpen = () => {
        setIsOpen(true);
    };
    const handelClose = () => {
        setIsOpen(false);
    };

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
            });
            const res = await req.json();
            if (res) {
                const data = {
                    colors: res.data?.attributes.colors,
                    tags: res.data?.attributes.tags.data,
                    components: res.data?.attributes.components.data,
                    app: res.data?.attributes.app.data.attributes
                };
                setData(data);
            }
        }
        getData();
    }, [screenId]);

    const App = () => {
        const icon = data?.app?.icon?.data?.attributes?.hash + data?.app?.icon?.data?.attributes?.ext;
        return (
            <Link href={`/app/${slug()}/${data.app.slug}`} className={`hover:bg-slate-900/60 rounded-xl ${isOpen ? 'text-lg bg-slate-950 p-3' : ''} p-2 flex gap-1`}>
                <Image src={icon} className='rounded-xl min-w-[75px] min-h-[75px]' width={56} height={56} alt='' />
                <div className={` ${selected === 3 ? "flex flex-col px-2" : ""}`}>
                    <h2 className='text-white'>{data.app.name}</h2>
                    <p className='text-slate-600'>
                        {isOpen ? data.app.tag_line : (data.app.tag_line.length > 20 ? `${data.app.tag_line.substring(0, 20)}...` : data.app.tag_line)}
                    </p>
                </div>
            </Link>
        );
    };
    

    const Components = () => (
        <div className={`flex gap-2 ${isOpen ? 'w-[25vh] flex-wrap ' : ""} ${selected===3 && !isOpen?"flex-nowrap text-nowrap":""} flex-wrap h-full overflow-y-auto overflow-hidden`}>
            {data?.components.map((el, index) => {
                if (!isOpen && (index === 0 || index === 1)) {
                    
                    return <Tag name={el.attributes.name} type="tag" key={el.id} />;
                } else if (isOpen) {
                    return <Tag name={el.attributes.name} type="tag" key={el.id} />;
                }
                return null;
            })}
            {!isOpen && data.components.length > 2 ? <Tag name={`+ ${data.components.length - 2} components`} type="tag" key={1} /> : null}
        </div>
    );

    const Tags = () => (
        <div className={`flex gap-2 ${isOpen ? 'w-[25vh] flex-wrap' : ""} ${selected===3 && !isOpen?"flex-nowrap text-nowrap":""} text-nowrap flex-wrap h-full overflow-y-auto overflow-hidden`}>
            {data?.tags.map((el, index) => {
                if (!isOpen && (index === 0 || index === 1)) {
                    return <Tag name={el.attributes.name} type="tag" key={el.id} />;
                } else if (isOpen) {
                    return <Tag name={el.attributes.name} type="tag" key={el.id} />;
                }
                return null;
            })}
            {!isOpen && data.tags.length > 2 ? <Tag name={`+ ${data.tags.length - 2} tags`} type="tag" key={1} /> : null}
        </div>
    );

    const Colors = () => {
        const colorsArr = data?.colors.split(',');
        return (
            <div  className={`flex gap-2 flex-wrap `}>
                {colorsArr?.map(el => (
                    <ColorSquare isOpen={isOpen} color={el} key={el} />
                ))}
            </div>
        );
    };

    if (data) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                
                className={`${selected === 3 ? 'flex-col w-full justify-center   py-3 items-center ' : 'absolute left-0 translate-x-0 md:flex'}`}
            >
                <div className={`${isOpen ? 'py-5 relative top-[74px] transition-[2s] z-50' : ''} ${selected === 3 ? 'bg-slate-900 px-5  justify-between  p-2 flex gap-x-8 items-center rounded-3xl w-full h-fit' : 'bg-slate-950 p-8 flex flex-col gap-y-8 rounded-3xl w-[370px] h-fit'}`}>
                {data?.app && (
                    <div className='flex flex-col gap-4'>
                        {isOpen && (
                            <>
                                <h1 className='text-xl'>Screen Details</h1>
                                <p className='text-slate-500 text-sm mb-2'>App</p>
                            </>
                        )}
                        <App />
                    </div>
                )}
                {data?.tags?.length > 0 && (
                    <div className={`${isOpen && data.tags.length >=3 &&data.tags.length<=5?"relative top-7":""}${isOpen && data.tags.length <=2?"relative top-4":"" }`}>
                    <p className='text-slate-500 text-sm mb-2'>Tags</p>
                        <Tags />
                    </div>
                )}
                {data?.components?.length > 0 && (
                    <div className={`${isOpen && data.components.length >=3 &&data.components.length<=5?"relative top-7":""}${isOpen && data.components.length <=2?"relative top-4":"" }`}>
                        <p className='text-slate-500 text-sm mb-2'>Components</p>
                        <Components />
                    </div>
                )}
                {data?.colors?.length > 0 && (
                    <div className={`flex items-center justify-between gap-3 ${isOpen ? "flex-col-reverse relative bottom-6" : ""}`}>
                        <div className={`flex flex-col ${isOpen?"relative top-6":""}`}>
                            <p className='text-slate-500 text-sm mb-2'>Colors</p>
                            <Colors />
                        </div>
                        {selected === 3 && isOpen?
                            <div className={`flex items-center relative${isOpen ? "self-end  left-8" : ""} `}>
                                <Tabs aria-label="Tabs radius" radius='full'
                                    classNames={{
                                        tabList: "bg-slate-700 flex items-center",
                                        tab: "px-[18px] py-3 data-[hover=true]:opacity-[100%] ",
                                        cursor: "group-data-[selected=true]:bg-slate-600",
                                        tabContent:
                                            "text-slate-300 group-data-[selected=true]:text-slate-200 ",
                                    }}
                                >
                                    <Tab key="photos" title="Section" />
                                    <Tab key="videos" title="Full Page" />
                                </Tabs>
                                <Button variant='light' className='min-w-0 relative left-2 ' onClick={() => setIsOpen(!isOpen)}>
                                    <img className='min-w-[20px] min-h-[20px]' src={!isOpen ? '/images/assets/expand.svg' : '/images/assets/collapse.svg'} />
                                </Button>
                            </div>
                            : null}
                    </div>
                )}
                

                {selected === 3 && !isOpen && (
                    <div className={`flex items-center relative ${isOpen ? "self-end left-8" : ""}`}>
                        <Tabs aria-label="Tabs radius" radius='full'
                            classNames={{
                                tabList: "bg-slate-700 flex items-center",
                                tab: "px-[18px] py-3 data-[hover=true]:opacity-[100%]",
                                cursor: "group-data-[selected=true]:bg-slate-600",
                                tabContent: "text-slate-300 group-data-[selected=true]:text-slate-200",
                            }}
                        >
                            <Tab key="photos" title="Photos" />
                            <Tab key="videos" title="Videos" />
                        </Tabs>
                        <Button variant='light' className='min-w-0 relative left-2' onClick={() => setIsOpen(!isOpen)}>
                            <img className='min-w-[20px] min-h-[20px]' src={!isOpen ? '/images/assets/expand.svg' : '/images/assets/collapse.svg'} />
                        </Button>
                    </div>
                )}


                    {/* ${isOpen ? 'flex gap-6 w-fit h-full flex-col' : ' flex-row'} ${selected === 3 ? 'flex-row' : ""} */}

                </div>

            </motion.div>
        );
    }

    return null;
};

export default ScreenDetails;

const ColorSquare = ({ color, isOpen }) => {

    const [showColorCode, setShowColorCode] = useState(false);
    const { slug, selected } = usePlatform();

    function copyToClipboard() {
        navigator.clipboard.writeText(color)
            .then(() => {
                toast.remove();
                toast.success('Text copied to clipboard');
            })
            .catch((error) => {
                toast.remove();
                toast.error('Error copying text to clipboard:', error);
            });
    }

    return (
        <button onClick={copyToClipboard} onMouseEnter={() => setShowColorCode(true)} onMouseLeave={() => setShowColorCode(false)} className={`${selected === 3 ? `border-transparent border-[3px] hover:border-aqua-400 relative rounded-full ${isOpen ? "w-10 h-10 bg-red-500" : "w-5 h-5"} ` : 'w-10 h-10 rounded-xl border-transparent border-[3px] hover:border-aqua-400 relative'}`} style={{ backgroundColor: color }}>
            {showColorCode && <span className='absolute -bottom-14 left-1/2 transform -translate-x-1/2'>copy {color}</span>}
        </button>
    );
};

const Tag = ({ name, type }) => {
    const { selected } = usePlatform();
    const { searchKeyword } = useSearchContext();
    const router = useRouter();
    const platform = getPlatformById(selected);

    const searchTag = () => {
        const query = qs.stringify({
            q: searchKeyword,
            [type]: name
        });
        router.push(`/search/${platform}?${query}`);
    };

    return (
        <button onClick={searchTag} className='bg-slate-800 hover:bg-slate-700 py-1 px-4 text-sm rounded-3xl'>
            {name}
        </button>
    );
};

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
const ScreenDetails = ({ screenId, isDetailsOpen, setIsDetailsOpen }) => {
    const [data, setData] = useState(null);
    const { slug, selected } = usePlatform();

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
            <Link href={`/app/${slug()}/${data.app.slug}`} className={`hover:bg-slate-900/50 p-2 flex  gap-1  ${selected === 3 ? "items-center rounded-2xl w-fit h-fit flex-row" : "flex-col"} rounded-xl ${isDetailsOpen ? 'max-w-[25vw] text-lg rounded-xl flex-row hover:bg-slate-950/50 bg-slate-900' : ''}`}>
                <Image src={icon} width={56} height={56} className={`${selected === 3 ? "rounded-full" : "rounded-xl"} ${isDetailsOpen ? "rounded-xl" : ""}`} alt={'app logo'} />
                <div className={` ${selected === 3 ? "flex flex-col px-2" : ""}`}>
                    <h2 className={`text-white  ${selected == 3 && isDetailsOpen ? "text-wrap" : "text-nowrap"}`}>{data.app.name}</h2>
                    <p className={` ${selected == 3 && isDetailsOpen ? "text-wrap leading-tight" : "text-nowrap"} text-slate-600 `}>
                        {selected == 3 ? (isDetailsOpen ? data.app.tag_line : (data.app.tag_line.length > 20 ? `${data.app.tag_line.substring(0, 16)}...` : data.app.tag_line)) : data.app.tag_line}
                    </p>
                </div>
            </Link>
        );
    };

    const Components = () => (
        <div className={`flex gap-1  flex-wrap h-fit overflow-y-auto overflow-hidden ${isDetailsOpen ? 'flex-wrap text-nowrap w-fit h-fit' : ""} ${selected === 3 && !isDetailsOpen ? "w-fit  text-nowrap flex-wrap overflow-y-scroll" : ""}`}>
            {data?.components.map((el, index) => {
                if (!isDetailsOpen && (index === 0 || index === 1)) {
                    return <Tag name={el.attributes.name} type="tag" key={el.id} />;
                } else if (isDetailsOpen) {
                    return <Tag name={el.attributes.name} type="tag" key={el.id} />;
                }
                return null;
            })}
            {!isDetailsOpen && data.components.length > 2 ? <Tag name={`+ ${data.components.length - 2} components`} type="tag" key={1} /> : null}
        </div>
    );

    const Tags = () => (
        <div className={`flex gap-1 flex-wrap h-fit overflow-y-auto overflow-hidden`}>
            {data?.tags.map((el, index) => {
                if (!isDetailsOpen && (index === 0 || index === 1)) {
                    return <Tag name={el.attributes.name} type="tag" key={el.id} />;
                } else if (isDetailsOpen) {
                    return <Tag name={el.attributes.name} type="tag" key={el.id} />;
                }
                return null;
            })}
            {!isDetailsOpen && data.tags.length > 2 ? <Tag name={`+ ${data.tags.length - 2} tags`} type="tag" key={1} /> : null}
        </div>
    );

    const Colors = () => {
        const colorsArr = data?.colors.split(',');
        return (
            <div className={`flex gap-2 flex-wrap `}>
                {colorsArr?.map(el => (
                    <ColorSquare isDetailsOpen={isDetailsOpen} color={el} key={el} />
                ))}
            </div>
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
            <button onClick={searchTag} className={` ${selected == 3 ? "w-fit h-fit py-1 px-2 bg-slate-700" : "py-2 px-3"} ${isDetailsOpen ? "max-w-[25vh]" : ""} bg-slate-700 hover:bg-slate-500  text-sm rounded-3xl`}>
                {name}
            </button>
        );
    };

    const variants = {
        closed: {
            height: selected === 3 ? "12.5vh" : null,
            originY: 0, // Set the origin of the animation to the top of the element
        },
        open: {
            height: selected === 3 ? "25vh" : null,
            originY: 0, // Set the origin of the animation to the top of the element
        },
    };

    if (data) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`hidden md:flex ${selected === 3 ? 'w-full h-full py-1 items-center overflow-auto transition-all duration-300 ease-in-out' : 'absolute -translate-x-[110%] md:flex'}`}
            >
                <motion.div
                    className={`overflow-hidden ${selected === 3 ? 'bg-[#1e293bcc] h-full backdrop-blur-md px-3 gap-1 p-2 flex justify-between items-center rounded-3xl w-full' : 'bg-slate-950 p-8 flex flex-col gap-y-5 rounded-3xl w-full h-full'}`}
                    variants={variants}
                    initial="closed"
                    animate={isDetailsOpen ? "open" : "closed"}
                    exit="closed"
                >
                    <div className="flex flex-col gap-1">
                        {isDetailsOpen && (
                            <>
                                <h1 className='text-xl'>Screen Details</h1>
                                <p className='text-slate-500 text-sm'>App</p>
                            </>
                        )}
                        {data?.app && (
                            <>
                                {selected !== 3 ? <p className='text-slate-500 text-sm'>App</p> : null}
                                <App />
                            </>
                        )}
                    </div>
                    <div className={`${selected === 3 && isDetailsOpen ? "absolute top-0 translate-y-[30%] h-full w-[10vw]" : "h-[4vw] w-[12vw]" ? "" : ""} ${isDetailsOpen && data.tags.length >= 1 && data.tags.length <= 10 ? "relative top-0" : ""}`}>
                        {data?.tags?.length > 0 && (
                            <>
                                <p className='text-slate-500 text-sm'>Tags</p>
                                <Tags />
                            </>
                        )}
                    </div>
                    <div className={`${selected === 3 && isDetailsOpen ? "absolute top-0 translate-y-[30%] h-full w-[10vw]" : "h-[4vw] w-[12vw]" ? "" : ""} ${isDetailsOpen && data.components.length >= 1 && data.components.length <= 10 ? "relative top-0" : ""} `}>
                        {data?.components?.length > 0 && (
                            <>
                                <p className='text-slate-500 text-sm'>Components</p>
                                <Components />
                            </>
                        )}
                    </div>
                    {data?.colors?.length > 0 && (
                        <div className={`flex items-start justify-start gap-3 ${isDetailsOpen ? "flex-col-reverse relative -translate-y-[20%]" : ""}`}>
                            <div className={`flex flex-col`}>
                                <p className='text-slate-500 text-sm'>Colors</p>
                                <Colors />
                            </div>
                            {selected === 3 ?
                                <div className={`flex items-center gap-2 relative${isDetailsOpen ? "" : ""} `}>
                                    <Tabs aria-label="Tabs radius" radius='full'
                                        classNames={{
                                            tabList: "bg-slate-700 flex items-center",
                                            tab: "px-[18px] py-3 data-[hover=true]:opacity-[100%]",
                                            cursor: "group-data-[selected=true]:bg-slate-600",
                                            tabContent: "text-slate-300 group-data-[selected=true]:text-slate-200",
                                        }}
                                    >
                                        <Tab key="photos" title="Section" />
                                        <Tab key="videos" title="Full Page" />
                                    </Tabs>
                                    <Button disableRipple variant='light' className='min-w-0 p-1 data-[hover=true]:bg-transparent w-[2rem] h-[2rem]' onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
                                        <img src={!isDetailsOpen ? '/images/assets/expand.svg' : '/images/assets/collapse.svg'} />
                                    </Button>
                                </div>
                                : null}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        );
    }

    return null;
};

export default ScreenDetails;

const ColorSquare = ({ color, isDetailsOpen }) => {
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
        <button onClick={copyToClipboard} onMouseEnter={() => setShowColorCode(true)} onMouseLeave={() => setShowColorCode(false)} className={`${selected === 3 ? `border-white border-[2px] hover:border-aqua-400 relative rounded-full ${isDetailsOpen ? "w-[2rem] h-[2rem]" : "w-[18px] h-[18px]"} ` : 'w-10 h-10 rounded-xl border-white border-[2px] hover:border-aqua-400 relative'}`} style={{ backgroundColor: color }}>
            {showColorCode && <span className='absolute -bottom-14 left-1/2 transform -translate-x-1/2'>copy {color}</span>}
        </button>
    );
};

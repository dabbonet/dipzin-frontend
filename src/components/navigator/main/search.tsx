
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Screen from "@/ui/Screen"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { NotFoundPreview, NotFoundResults } from "./notFound"
import Loading from "./loading"
import useMeasure from "react-use-measure"

const Search = ({ search }: any) => {

    const [results, setResults] = useState<any>([]);
    const [selected, setSelected] = useState<any>({});

    useEffect(() => {
        const handleSearch = async () => {
            const res = await fetch(`/api/search?keyword=${search}`);
            const data = await res.json();
            // console.log(data.search.apps);
            setResults(data.search.tags);
            setSelected(data.search.tags[0]);
        }

        handleSearch();
        // console.log('results', results)
    }, [search]);

    let [ref, bounds] = useMeasure();
    return (
        <motion.div
            key="search"
            layout
            className="overflow-y-hidden p-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, height: bounds.height }}
            exit={{ opacity: 0, height: 0, width: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
        >
            <div
                ref={ref}
                className="py-2 px-4"
            >
                <p className='uppercase text-sm text-slate-400'>Search Results</p>
                <div className='flex space-x-4 mt-2 max-h-[500px] min-w-[1200px] max-w-[1200px] w-full h-full'>
                    {results.length > 0 && (
                        <>
                            <div className='w-[30%] px-2 py-2  flex-col rounded-2xl bg-slate-800 scroll-py-2 snap-y scroll-smooth overflow-y-scroll scrollbar-hide'>
                                {results.map((result: any) => (
                                    <motion.div
                                        key={result.id}
                                        className={clsx(selected.id == result.id && 'bg-slate-900', 'flex items-center cursor-pointer p-2 hover:bg-slate-900 rounded-xl space-x-3')}
                                        onHoverStart={() => setSelected(result)}
                                    >

                                        <Image
                                            className="rounded-2xl bg-slate-700"
                                            width={48}
                                            height={48}
                                            src={"f57f3855_4c01_477a_81c1_ad83c6814489_d1ee475bcd.webp"}
                                            alt="icon"
                                        />


                                        <div className="text-white">
                                            <span className="text-[15px] font-semibold">{result.name}</span>
                                            <span className="block text-[10px] font-light">
                                                {result.tag_line && (
                                                    <span className="block text-[10px] font-light">{result.tag_line}</span>
                                                )}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <PreviewCard selected={selected} />
                        </>
                    )}
                    {/* {!results.length && (
                        <>
                            <NotFoundResults />
                            <NotFoundPreview />
                        </>
                    )} */}

                </div>
            </div>
        </motion.div>
    )
}

export default Search




const PreviewCard = ({ selected }: any) => {

    //TODO: Show App Icon 
    const [showcase, setShowcase] = useState<any>([]);
    // const data = await getPreview({ id: selected.id })

    useEffect(() => {
        // Get App Showcase
        setShowcase([])
        const Preview = async () => {
            const preview = await getTagPreview({ id: selected.id })
            // console.log(preview)
            setShowcase(preview);
        }
        Preview()

    }, [selected])

    if (!selected) {
        return (
            <div className='w-[70%] p-2 rounded-2xl bg-slate-800'>
                Nothing here.
            </div>
        )
    }

    return (
        <div className='max-w-[70%] w-full h-full p-2 rounded-2xl bg-slate-800'>

            {/* Header Area */}
            <div className='w-full flex justify-between'>
                <div className='flex items-center p-2 rounded-xl space-x-3' >

                    <Image
                        className="rounded-2xl bg-slate-700"
                        width={48}
                        height={48}
                        src={"f57f3855_4c01_477a_81c1_ad83c6814489_d1ee475bcd.webp"}
                        alt="icon"
                    />
                    <div className="text-white">
                        <span className="text-[15px] font-semibold">{selected.name}</span>
                        <span className="block text-[10px] font-light">
                            {selected.tag_line && (
                                <span className="block text-[10px] font-light">{selected.tag_line}</span>
                            )}
                        </span>
                    </div>
                </div>
                <Link
                    className="min-w-fit h-full p-2  bg-slate-900 rounded-xl flex flex-col justify-between relative border-transparent border-2 hover:border-orange-500"
                    href={'#'}
                >
                    <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 absolute right-2"
                        preserveAspectRatio="none"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.30834 2.3103C1.33203 3.2866 1.33203 4.85795 1.33203 8.00065C1.33203 11.1433 1.33203 12.7147 2.30834 13.691C3.28465 14.6673 4.856 14.6673 7.9987 14.6673C11.1414 14.6673 12.7128 14.6673 13.689 13.691C14.6654 12.7147 14.6654 11.1433 14.6654 8.00065C14.6654 4.85795 14.6654 3.2866 13.689 2.3103C12.7128 1.33398 11.1414 1.33398 7.9987 1.33398C4.856 1.33398 3.28465 1.33398 2.30834 2.3103ZM8.83203 4.66732C8.83203 4.94346 9.0559 5.16732 9.33203 5.16732H10.1249L8.64516 6.6471C8.4499 6.84238 8.4499 7.15892 8.64516 7.35418C8.84043 7.54945 9.15696 7.54945 9.35223 7.35418L10.832 5.87442V6.66732C10.832 6.94345 11.0559 7.16732 11.332 7.16732C11.6082 7.16732 11.832 6.94345 11.832 6.66732V4.66732C11.832 4.39118 11.6082 4.16732 11.332 4.16732H9.33203C9.0559 4.16732 8.83203 4.39118 8.83203 4.66732ZM7.35223 9.35419C7.5475 9.15892 7.5475 8.84238 7.35223 8.64712C7.15696 8.45185 6.84043 8.45185 6.64514 8.64712L5.16536 10.1269V9.33398C5.16536 9.05785 4.9415 8.83398 4.66536 8.83398C4.38922 8.83398 4.16536 9.05785 4.16536 9.33398V11.334C4.16536 11.6101 4.38922 11.834 4.66536 11.834H6.66536C6.9415 11.834 7.16536 11.6101 7.16536 11.334C7.16536 11.0579 6.9415 10.834 6.66536 10.834H5.87247L7.35223 9.35419Z"
                            fill="#F1F5F9"
                        />
                    </svg>
                    <p className="w-[80%] text-[10px] font-medium text-left text-white">
                        Open Application
                    </p>
                </Link>
            </div>
            <div className='w-full flex flex-row h-[420px] space-x-4 overflow-x-scroll px-2 pt-2 scrollbar-hide'>
                {showcase.length > 0 && showcase.map((screen: any, index: any) => {
                    const name = screen?.hash + screen?.ext
                    return (
                        <Screen key={index} className={'w-auto rounded-2xl'} src={name} />
                    )
                }
                )}
                {showcase.length === 0 && (
                    <Loading />
                )}
            </div>
        </div>
    )
}


const getAppPreview = async ({ id }: { id: number }) => {
    const qs = require('qs');
    const query = qs.stringify(
        {
            fields: ['screen'],
            filters: {
                app: {
                    id: {
                        $eq: id
                    }
                },
                is_showcase: {
                    $eq: true
                }
            },
            populate: {
                screen: {
                    fields: ['hash', 'ext']
                }
            }
        }
    )
    const res = await fetch(`https://rah.dipzin.com/api/screens?${query}`)
    const data = await res.json()
    const screens = data.data.flatMap(item => ({
        hash: item.attributes.screen.data?.attributes.hash,
        ext: item.attributes.screen.data?.attributes.ext
    }));
    return screens
}

const getCategoryPreview = async ({ id }: { id: number }) => {
    const qs = require('qs');
    const query = qs.stringify(
        {
            fields: ['id'],
            filters: {
                categories: {
                    id: {
                        $eq: id
                    }
                },
                is_published: {
                    $eq: true
                }
            },
            populate: {
                screens: {
                    fields: ['id'],
                    filters: {
                        is_published: {
                            $eq: true
                        }
                    },
                    populate: {
                        screen: {
                            fields: ['hash', 'ext']
                        }
                    }
                }
            },
            pagination: {
                start: 0,
                limit: 5,
            }
        }
    )
    const res = await fetch(`https://rah.dipzin.com/api/apps?${query}`)
    const data = await res.json()

    const screens = data.data.flatMap((item) => {
        return item.attributes.screens.data.map((screen) => ({
            hash: screen.attributes.screen.data?.attributes.hash,
            ext: screen.attributes.screen.data?.attributes.ext,
        }));
    });
    return screens
}

const getTagPreview = async ({ id }: { id: number }) => {
    const qs = require('qs');
    const query = qs.stringify(
        {
            fields: ['screen'],
            filters: {
                tags: {
                    id: {
                        $eq: id
                    }
                },
                is_published: {
                    $eq: true
                }
            },
            populate: {
                screen: {
                    fields: ['hash', 'ext']
                }
            },
            pagination: {
                page: 0,
                pageSize: 5,
            }
        }
    )
    const res = await fetch(`https://rah.dipzin.com/api/screens?${query}`)
    const data = await res.json()

    const screens = data.data.flatMap(item => ({
        hash: item.attributes.screen.data?.attributes.hash,
        ext: item.attributes.screen.data?.attributes.ext
    }));
    return screens
}
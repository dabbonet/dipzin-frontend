
import { motion } from "framer-motion"
import Screen from "@/ui/Screen"
import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import clsx from "clsx"
import { NotFoundPreview } from "./notFound"
import { PreviewSkeleton, ResultsSekelton, ScreensSkeleton } from "./loading"
import useMeasure from "react-use-measure"
import ResultIcon from './ResultIcon'
import { useContentDiscovery } from "@/context/useContentDiscovery"
import Icons from "@/components/Icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useDialog } from "@/context/useDialog"

import { getToken } from "@/lib/auth"

import { MaxQouta } from "@/components/accessAndUpgrade"
const Search = () => {

    const { searchKeyword, filters } = useContentDiscovery();
    const [results, setResults] = useState<any>(null);
    const [selected, setSelected] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    // const [showMaxQoutaDialog, setShowMaxQoutaDialog] = useState(false)
    const token = getToken()

    useLayoutEffect(() => {
        const handleSearch = async () => {
            setResults([]);
            setIsLoading(true)
            const res = await fetch(`/api/search?keyword=${searchKeyword}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            const { maxQouta } = data
            if (maxQouta) {
                // setShowMaxQoutaDialog(true)
            }
            setIsLoading(false)

            // Filter results that's in filters object.
            const results = data.search.result.filter((result) => {
                if (filters?.tags?.includes(result.item.name) && result.item.type === 'tag') {
                    return false;
                }
                if (filters?.categories?.includes(result.item.name) && result.item.type === 'category') {
                    return false;
                }
                return true;
            });

            if (results?.length > 0) {
                setResults(results);
                setSelected(results[0]);
            } else {
                setResults(null);
            }

        }
        handleSearch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKeyword, setResults, setSelected, setIsLoading]);

    let [ref, bounds] = useMeasure();

    // if (showMaxQoutaDialog) {
    //     return <MaxQouta />
    // }

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
                <p className='uppercase text-sm text-slate-400'>Search Results for: {searchKeyword}</p>

                <div className='flex space-x-4 mt-2 max-h-[500px] min-w-[1200px] max-w-[1200px] w-full h-full'>
                    {isLoading &&
                        <>
                            <ResultsSekelton />
                            <PreviewSkeleton />
                        </>
                    }
                    {results && !isLoading && (
                        <>
                            <div className='w-[30%] px-2 py-2  flex-col rounded-2xl bg-slate-800 scroll-py-2 snap-y scroll-smooth overflow-y-scroll scrollbar-hide'>
                                {results.map((result: any, index: number) => (
                                    <motion.div
                                        key={index}
                                        className={clsx(selected.item.id == result.item.id && 'bg-slate-900', 'flex items-center cursor-pointer p-2 hover:bg-slate-900 rounded-xl space-x-3')}
                                        onHoverStart={() => setSelected(result)}
                                    >
                                        <ResultIcon result={result.item.icon?.url} type={result.item.type} />


                                        <div className="flex justify-between w-full items-center">
                                            <div className="text-white flex-1">
                                                <span className="text-[15px] font-semibold">{result.item.name}</span>
                                                <span className="block text-[10px] font-light text-slate-300">
                                                    {result.item.type === 'app' && (
                                                        <span className="block text-[10px]">{result.item.tag_line}</span>
                                                    )}
                                                    {result.item.type === 'tag' && (
                                                        <span className="block text-[10px]">Search by <b className="font-semibold">Tags</b></span>
                                                    )}
                                                    {result.item.type === 'category' && (
                                                        <span className="block text-[10px]">Search by <b className="font-semibold">App Category</b></span>
                                                    )}
                                                </span>

                                            </div>
                                            {result.item.platform && <span className="text-[0.7rem] bg-slate-700 text-slate-300 py-1 px-2 rounded-lg">{result.item.platform?.name}</span>}
                                        </div>

                                    </motion.div>
                                ))}
                            </div>
                            <PreviewCard selected={selected.item} />
                        </>
                    )}


                    {!results && !isLoading && (
                        <>
                            <ResultsSekelton />
                            <NotFoundPreview />
                        </>
                    )}

                </div>
            </div>
        </motion.div>
    )
}

export default Search




const PreviewCard = ({ selected }: any) => {

    //TODO: Show App Icon 
    const { navigateToRoute } = useDialog()
    const [showcase, setShowcase] = useState<any>([]);
    const { setSearchKeyword, setFilters } = useContentDiscovery();
    const pathName = usePathname()
    const router = useRouter();
    const searchParams = useSearchParams()!;
    // const data = await getPreview({ id: selected.id })

    useEffect(() => {
        // Get App Showcase
        setShowcase([])
        const Preview = async () => {
            let res = await fetch(`/api/search/preview?id=${selected.id}&type=${selected.type}`)
            let preview = await res.json()
            setShowcase(preview);
        }
        Preview()

    }, [selected])

    const handleSearchClick = useCallback((selected) => {
        let params = new URLSearchParams(searchParams.toString());
        let tags = params.get('tags');
        let categories = params.get('categories');

        let link = '';
        const platName = selected.platform?.name.toLowerCase()
        const tagList = tags ? tags.split(',') : []; tags = tagList.join(',');
        const categoryList = categories ? categories.split(',') : [];
        const name = selected.name

        setFilters({ categories: categoryList, tags: tagList })
        setSearchKeyword('')
        if (selected.type === 'tag') {
            !tagList.includes(name) && tagList.push(name)
            tags = tagList.join(',');
            params.set('tags', tags);
            link = '/search?' + params
        } else if (selected.type === 'category') {
            !categoryList.includes(name) && categoryList.push(name);
            categories = categoryList.join(',');
            params.set('categories', categories);
            link = '/search?' + params
        } else {
            link = `/app/${platName}/${selected.slug}`
        }

        navigateToRoute({ link })
    }, [searchParams, router])



    if (!selected) {
        return (
            <div className='w-[70%] p-2 rounded-2xl bg-slate-800'>
                Nothing Selected!
            </div>
        )
    }

    return (
        <div className='max-w-[70%] w-full h-full p-2 rounded-2xl bg-slate-800'>

            {/* Header Area */}
            <div className='w-full flex justify-between'>
                <div className='flex items-center p-2 rounded-xl space-x-3' >

                    <ResultIcon result={selected.icon?.url} type={selected.type} />
                    <div className="text-white">
                        <span className="text-[15px] font-semibold">{selected.name}</span>
                        <span className="block text-[10px] font-light text-slate-300">
                            {selected.type === 'app' && (
                                <span className="block text-[10px]">{selected.tag_line}</span>
                            )}
                            {selected.type === 'tag' && (
                                <span className="block text-[10px]">Search by <b className="font-semibold">Tags</b></span>
                            )}
                            {selected.type === 'category' && (
                                <span className="block text-[10px]">Search by <b className="font-semibold">App Category</b></span>
                            )}
                        </span>
                    </div>
                </div>
                <button
                    className="min-w-fit h-full p-2  bg-slate-900 rounded-xl flex flex-col justify-between relative border-transparent border-2 hover:border-aqua-500"
                    onClick={() => handleSearchClick(selected)}
                >
                    <Icons.Expand />
                    <p className="w-[80%] text-[10px] font-medium text-left text-white">
                        {selected.type === 'app' ? 'Open Application' : selected.type == 'tag' ? 'Search by Tag' : 'Search by Category'}
                    </p>
                </button>

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
                    <ScreensSkeleton />
                )}
            </div>
        </div>
    )
}

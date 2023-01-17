
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Screen from "../../components/screen";
import Showcase from "./showcase";


export const fetchStream = async ({ page }: { page:number }) => {
    console.log('fetching page:', page);

    const perPage = 11;
    // const page = lastGroup ? (lastGroup.length / perPage) + 1 : 1;
    const res = await fetch(`/api/stream?page=${page}&per_page=${perPage}`);
    if (res.ok) {
        return res.json();
    }
    throw new Error('Failed to fetch stream');
};


const Stream = () => {
    const [selectedId, setSelectedId] = useState(null)
    const [page, setPage] = useState<number>(1);
    
    const { isLoading, isError, data, error, isFetched, fetchNextPage, fetchPreviousPage } = useInfiniteQuery(
        ['stream'],
        () => fetchStream({ page }),
        {
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            getNextPageParam: (lastGroup) => {
                // console.log('lastGroup', lastGroup)
                    return page
            },
            initialData: () => {
                // console.log('initialData')
                return fetchStream({page: 1}) 
            }
        }
    );
    

    useEffect(() => {
        let fetching = false;
        
        const onScroll = async (event) => {
            const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;
            
            let initVal = false;
            initVal ? setPage(page => page + 1) : initVal = true;
            // check if the user has scrolled to the bottom of the page
            if (scrollTop + clientHeight >= scrollHeight && page < 50) {
                fetching = true;
                // console.log('scrolling page:', page);
                setPage(page => page + 1)
                console.log("page:", page);
                await fetchNextPage();
                fetching = false;
            }
        };

        document.addEventListener("scroll", onScroll);
        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, [page]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message}</p>;

    return (
        <>
            <div className="scrollbar-rounded w-[80%] lg:w-[75%] grid gap-4 lg:gap-5 xl:gap-6 xxl:gap-9 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-7 mb-10 text-white">
                {data && data.pages.map((page) =>
                    page.data.map((application: any) => (
                        <>
                            <motion.div key={application.id} layoutId={application.id} onClick={() => setSelectedId(application.id)}>
                                <Screen  platform={1} app={application} list={application.showcase} />
                            </motion.div>
                        </>
                    ))
                )}
            </div>
            <AnimatePresence>
                {selectedId && (
                    <Showcase selectedId={selectedId} setSelectedId={setSelectedId} />
                )}
            </AnimatePresence>
        </>
    )
}

export default Stream
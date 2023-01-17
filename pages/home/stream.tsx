
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Screen from "../../components/screen";
import Showcase from "./showcase";


export const fetchStream = async ({ pageParam = 0 }) => {
    console.log('fetching page:', pageParam);

    const perPage = 11;
    // const page = lastGroup ? (lastGroup.length / perPage) + 1 : 1;
    const res = await fetch(`/api/stream?page=${pageParam}&per_page=${perPage}`);
    if (res.ok) {
        return res.json();
    }
    throw new Error('Failed to fetch stream');
};


const Stream = () => {
    // const [totalFetched, setTotalFetched] = useState(0);
    const [selectedId, setSelectedId] = useState(null)
    const [page, setPage] = useState(1);
    const { isLoading, isError, data, error, isFetched, fetchNextPage, fetchPreviousPage } = useInfiniteQuery(
        'stream',
        ({ pageParam = page }) => fetchStream(pageParam),
        {
            getNextPageParam: (lastGroup) => {
                // console.log('lastGroup', lastGroup)
                if (page < 50) {
                    return lastGroup.length;
                }
                return undefined;
            },
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        }
    );

    useEffect(() => {
        let fetching = false;
        const onScroll = async (event) => {
            const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;
            // check if the user has scrolled to the bottom of the page
            if (!fetching && scrollTop + clientHeight >= scrollHeight && page < 50) {
                fetching = true;
                setPage(page + 1)
                await fetchNextPage();
                console.log("page:", page);
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
                            <motion.div layoutId={application.id} onClick={() => setSelectedId(application.id)}>
                                <Screen key={application.id} platform={1} app={application} list={application.showcase} />
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
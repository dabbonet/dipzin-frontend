
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Screen from "../../components/screen";
import Showcase from "./showcase";


const fetchStream = async (page) => {
    console.log('fetching page:', page);

    const perPage = 12;
    // const page = lastGroup ? (lastGroup.length / perPage) + 1 : 1;
    const res = await fetch(`/api/stream?page=${page}&per_page=${perPage}`);
    if (res.ok) {
        return res.json();
    }
    throw new Error('Failed to fetch stream');
};


const Stream = () => {
    const maxPages = 10;
    let randomPage = Math.floor(Math.random() * maxPages) + 1;
    const [loadedPages, setLoadedPages] = useState([randomPage])

    const {
        isLoading,
        isError,
        data,
        error,
        isFetching,
        isSuccess,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        ['stream'],
        ({ pageParam = randomPage }) => fetchStream(pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {

                if (allPages.length >= maxPages) return undefined;
                return Math.floor(Math.random() * maxPages) + 1;
            },
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );


    useEffect(() => {
        const onScroll = async (event) => {
            const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;
            // console.log(isSuccess)
            if (!isFetching && clientHeight + scrollTop >= scrollHeight) {
                if (hasNextPage) {
                    const maxPages = 10;
                    let nextPage = Math.floor(Math.random() * maxPages) + 1;
                    while (loadedPages.includes(nextPage)) {
                        nextPage = Math.floor(Math.random() * maxPages) + 1;
                    }
                    setLoadedPages([...loadedPages, nextPage])
                    await fetchNextPage({ pageParam: nextPage });
                }
            }
        };

        document.addEventListener("scroll", onScroll);
        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, [isFetching]);

    const [selectedId, setSelectedId] = useState(null)

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message}</p>;

    return (
        <>
            <div className="scrollbar-rounded w-[80%] lg:w-[75%] grid gap-4 lg:gap-5 xl:gap-6 xxl:gap-9 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-7 mb-10 text-white">
                {data && data.pages.map((page) =>
                    page.data.map((application, index) => (
                        <>
                            <motion.div key={index} onClick={() => setSelectedId(index)}>
                                <Screen platform={1} app={application} list={application.showcase} />
                            </motion.div>
                        </>
                    ))
                )}
            </div>
            {/* <AnimatePresence> */}
            {selectedId && (
                <Showcase selectedId={selectedId} setSelectedId={setSelectedId} />
            )}
            {/* </AnimatePresence> */}
        </>
    )
}

export default Stream

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Screen from "../../components/screen";
import Showcase from "./showcase";

const perPage = 10;

const fetchStream = async (page: any) => {
    const res = await fetch(`/api/stream?page=${page}&per_page=${perPage}`);

    const data = await res.json();
    data.data.sort(() => Math.random() - 0.5);

    if (res.ok) {
        return data;
    }
    throw new Error('Failed to fetch stream');
};


const Stream = () => {

    const [maxPages, setMaxPages] = useState(4);
    let randomPage = Math.floor(Math.random() * maxPages) + 1;
    const [loadedPages, setLoadedPages] = useState([randomPage])

    useEffect(() => {
        const fetchMaxPages = async () => {
            const res = await fetch(`/api/stream/max`);
            if (res.ok) {
                const data = await res.json();
                const count = Math.ceil(data.count / perPage);
                console.log('count', count);
                setMaxPages(count);

            }
        }
        fetchMaxPages();
    }, [])

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
        const onScroll = async (event: any) => {
            const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;
            // console.log(isSuccess)
            if (!isFetching && clientHeight + scrollTop >= scrollHeight) {
                if (hasNextPage) {
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

    const [selected, setSelected] = useState(null);

    // function shuffle(array: any[]) {
    //     return array.sort(() => Math.random() - 0.5);
    // }
    // const shuffledPages = data ? shuffle(data.pages) : null;

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <div className="scrollbar-rounded w-[80%] lg:w-[80%] grid gap-4 lg:gap-5 xl:gap-6 xxl:gap-9 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 xxl:grid-cols-6 mb-10 text-white">
                {data && data?.pages.map((page: { data: any[]; }) =>
                    page.data.map((application, index) => {
                        // const shuffledApplication = application ? shuffle(application) : null;
                        return (
                            <>
                                <motion.div key={index} onClick={() => setSelected(application)}>
                                    <Screen platform={1} app={application} list={application.showcase} />
                                </motion.div>
                            </>
                        )
                    })
                )}
            </div>
            <AnimatePresence>
                {selected && (
                    <Showcase selected={selected} setSelected={setSelected} />
                )}
            </AnimatePresence>
        </>
    )
}

export default Stream
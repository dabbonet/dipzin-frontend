
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Screen from "../../components/screen";
import Showcase from "./showcase";


export const fetchStream = async ({ page }: { page: number }) => {
    // console.log('fetching page:', page);

    const perPage = 12;
    // const page = lastGroup ? (lastGroup.length / perPage) + 1 : 1;
    const res = await fetch(`/api/stream?page=${page}&per_page=${perPage}`);
    if (res.ok) {
        return res.json();
    }
    throw new Error('Failed to fetch stream');
};


const Stream = () => {
    const [selectedId, setSelectedId] = useState(null)
    const [page, setPage] = useState<number>(Math.floor(Math.random() * 10) + 1);
    const [fetchedPages, setFetchedPages] = useState<number[]>([page]);

    const {
        isLoading,
        isError,
        data,
        error,
        isFetching,
        isSuccess,
        fetchNextPage,
    } = useInfiniteQuery(
        ['stream'],
        () => fetchStream({ page }),
        {
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            getNextPageParam: (lastGroup) => {
                return page
            },
        }
    );

    // change page value in the first app run and add this value to fetchedPages array
    useEffect(() => {
        let randomPage = Math.floor(Math.random() * 10) + 1;
        setPage(randomPage);
        setFetchedPages([...fetchedPages, randomPage]);
    }, []);

    useEffect(() => {
        // let fetching = false;


        const onScroll = async (event) => {
            const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;
            console.log(isSuccess)
            if (!isFetching && isSuccess && clientHeight + scrollTop >= scrollHeight) {

                // fetching = true;
                console.log('scrolling...');
                console.log('fetched pages:', fetchedPages);
                // console.log('page:', page);


                let randomPage = Math.floor(Math.random() * 10) + 1;
                while (fetchedPages.includes(randomPage)) {
                    randomPage = Math.floor(Math.random() * 10) + 1;
                }
                console.log("random page:", randomPage)


                try {
                    setPage(randomPage);
                    setFetchedPages([...fetchedPages, randomPage]);
                    await fetchNextPage();
                } catch (error) {
                    console.log(error);
                }
            }
        };

        document.addEventListener("scroll", onScroll);
        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, [page, fetchedPages, isFetching, isSuccess]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message}</p>;

    return (
        <>
            <div className="scrollbar-rounded w-[80%] lg:w-[75%] grid gap-4 lg:gap-5 xl:gap-6 xxl:gap-9 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-7 mb-10 text-white">
                {data && data.pages.map((page) =>
                    page.data.map((application, index) => (
                        <>
                            <motion.div key={application.id} layoutId={application.id} onClick={() => setSelectedId(application.id)}>
                                <Screen key={index} platform={1} app={application} list={application.showcase} />
                            </motion.div>
                        </>
                    ))
                )}
            </div>
            <AnimatePresence>
                {selectedId && (
                    <>
                        <motion.div>
                            <h1 className='text-white'>{selectedId}</h1>
                            <Showcase selectedId={selectedId} setSelectedId={setSelectedId} />
                        </motion.div>
                    </>

                )}
            </AnimatePresence>
        </>
    )
}

export default Stream

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Screen from "../../components/screen";
import Showcase from "./showcase";


export const fetchStream = async () => {
    console.log('fetching...');
    const res = await fetch('/api/stream');

    if (res.ok) {
        return res.json();
    }
    throw new Error('Failed to fetch stream');

};


const Stream = () => {
    const [totalFetched, setTotalFetched] = useState(0);
    const [selectedId, setSelectedId] = useState(null)
    const { isLoading, isError, data, error, hasNextPage, fetchNextPage, fetchPreviousPage } = useInfiniteQuery(
        'stream',
        () => fetchStream(),
        {
            getNextPageParam: (lastGroup, allGroups) => {
                if (totalFetched < 50) {
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

            const { scrollHeight, scrollTop, clientHeight } =
                event.target.scrollingElement;

            if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
                if (totalFetched < 50) {

                    fetching = true;
                    await fetchNextPage();
                    setTotalFetched(totalFetched + 1);
                    fetching = false;

                }
            }
        };

        document.addEventListener("scroll", onScroll);
        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, [totalFetched]);

    // console.log(data.pages[0]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message}</p>;

    return (
        <>
            <div className="scrollbar-rounded w-[80%] lg:w-[75%] grid gap-4 lg:gap-5 xl:gap-6 xxl:gap-9 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-7 mb-10 text-white">
                {data?.pages.map((page) =>
                    page.map((application: any) => (
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
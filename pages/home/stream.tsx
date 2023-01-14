
import { useEffect } from "react";
import { useQuery, UseQueryResult, useInfiniteQuery } from "react-query";
import Screen from "../../components/screen";


export const fetchStream = async () => {
    const res = await fetch('/api/stream');

    if (res.ok) {
        return res.json();
    }
    throw new Error('Failed to fetch stream');

};


const Stream = () => {

    const { isLoading, isError, data, error, hasNextPage, fetchNextPage, fetchPreviousPage } = useInfiniteQuery(
        'stream',
        () => fetchStream(),
        {
            getNextPageParam: (lastPage) => {
                // lastPage signature depends on your api respond, below is a pseudocode
                if (lastPage.hasNextPage) {
                    return lastPage.nextCursor;
                }
                return undefined;
            },
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        let fetching = false;
        const onScroll = async (event) => {
            const { scrollHeight, scrollTop, clientHeight } =
                event.target.scrollingElement;

            if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
                fetching = true;
                // console.log('scroll');

                console.log(data)
                fetching = false;
            }
        };

        document.addEventListener("scroll", onScroll);
        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, []);

    // console.log(data.pages[0]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message}</p>;

    return (
        <div className="w-[80%] lg:w-[75%] grid gap-4 lg:gap-5 xl:gap-6 xxl:gap-9 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-7 mb-10 text-white">
            {data?.pages.map((page) =>
                data?.pages[0].map((application: any) => (
                    <>

                        <Screen key={application.id} platform={1} app={application} list={application.showcase} />
                    </>
                ))
            )}


        </div>
    )
}

export default Stream
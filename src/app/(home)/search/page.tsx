'use client'
import SingleScreen from '@/components/screen/SingleScreen';
import { useContentDiscovery } from '@/context/useContentDiscovery'
import { usePlatform } from '@/lib/platforms';
import { cn, shuffle } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react'
import { VirtuosoGrid } from 'react-virtuoso';
import StreamLoader from '@/components/StreamLoader';


interface pageProps {

}
const Search: FC<pageProps> = ({ }) => {

    const { setPlatforms, selected } = usePlatform();
    const { streamData, setStreamData, setFilters } = useContentDiscovery();
    const searchParams = useSearchParams();
    const tags = searchParams.get('tags')?.split(",")
    const categories = searchParams.get('categories')?.split(",")
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    async function getResults() {
        const results = await getSearchResults({ tags, categories, page: 1, platform: selected })
        setIsLoading(false)
        setPage((page) => page + 1)
        setStreamData(results);
    }

    useEffect(() => {
        if (searchParams.toString().length === 0) router.push('/') // go back if there is no search Params.
        setPlatforms([2, 1]);
        setFilters({ tags: tags, categories: categories })
        getResults()
        setTimeout(() => {
            window.scrollTo({
                top: 450,
                left: 0,
                behavior: "smooth"
            });
        }, 1000);
        // Remove filters on page unmount.
        return () => {
            setFilters(null)
        };
    }, [searchParams, router])

    const loadMore = useCallback(() => {
        return setTimeout(async () => {
            // Load more stream items
            const more = await getSearchResults({ tags, categories, page: page, platform: selected });
            setPage((page) => page + 1)

            const shuffledData = shuffle(more);
            setStreamData((streamData: any) => [...streamData, ...shuffledData])
        }, 300)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setStreamData, tags, page, categories]);

    if (isLoading) return <StreamLoader />
    if (!streamData) return

    return (
        // TODO: No Search Results state.
        <VirtuosoGrid
            id='searchGrid'
            className="mt-6"
            useWindowScroll
            data={streamData}
            style={{ minHeight: 100, width: '100%' }}
            totalCount={streamData.length}
            overscan={1}
            endReached={loadMore}
            listClassName={cn("grid content-center gap-6 pt-0 grid-cols-2", selected == 3 ? "2xl:grid-cols-4 md:grid-cols-3" : " 2xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4")}
            itemContent={(index, data) => (
                <SingleScreen screen={data?.hash + data?.ext} />
            )}
        />
    )
}

export default Search


async function getSearchResults({ tags, categories, page, platform }) {
    const req = await fetch("/api/search/filter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tags: tags || [''],
            categories: categories || [''],
            page: page,
            platform: platform
        }),
        cache: 'no-cache'
    });
    if (!req.ok) return { message: "something went wrong", status: req.status }

    const data = await req.json()
    const screens = data.screens.data.flatMap(item => ({
        hash: item.attributes.screen.data?.attributes.hash,
        ext: item.attributes.screen.data?.attributes.ext
    }));
    return screens;
}
'use client'
import SingleScreen from '@/components/screen/SingleScreen';
import { useContentDiscovery } from '@/context/useContentDiscovery'
import { usePlatform } from '@/lib/platforms';
import { cn, shuffle } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react'
import { VirtuosoGrid } from 'react-virtuoso';
import { useRouter } from 'next/navigation';

interface pageProps {

}

const Search: FC<pageProps> = ({ }) => {
    const { streamData, setStreamData, filters, setFilters, searchKeyword } = useContentDiscovery();
    const { selected: platform, setPlatforms } = usePlatform();
    const searchParams = useSearchParams();
    const tags = searchParams.get('tags')?.split(",")
    const categories = searchParams.get('categories')?.split(",")
    const [page, setPage] = useState(1);

    // @ts-ignore
    useEffect(() => {
        setPlatforms([2, 1, 3]);
        setStreamData([])
        setPage(1)
        setTimeout(() => {
            window.scrollTo({
                top: 450,
                left: 0,
                behavior: "smooth"
            });
        }, 1000);
        setFilters({ tags: tags, categories: categories })


        async function getResults() {
            const results = await getSearchResults({ tags, categories, page: page, platform })
            setPage((page) => page + 1)
            setStreamData(results);
        }
        getResults()
        // Remove filters on page unmount.
        return () => {
            setFilters(null)
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [platform]);


    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        setStreamData([])
        let searchParams = new URLSearchParams(window.location.search);

        // Handle params change and change url to adapt.
        if (filters?.tags?.length > 0) {
            searchParams.set('tags', filters.tags.join(','));
            router.push(pathname + '?' + searchParams);
        } else {
            searchParams.delete('tags')
            router.push(pathname + '?' + searchParams);
        }
        if (filters?.categories?.length > 0) {
            searchParams.set('categories', filters.categories.join(','));
            router.push(pathname + '?' + searchParams);
        } else {
            searchParams.delete('categories')
            router.push(pathname + '?' + searchParams);
        }
        if (!filters?.categories && !filters?.tags) {
            router.push('/');
        }

    }, [filters, router, pathname, setStreamData])

    const loadMore = useCallback(() => {
        return setTimeout(async () => {
            // Load more stream items
            const more = await getSearchResults({ tags, categories, page: page, platform });
            setPage((page) => page + 1)

            const shuffledData = shuffle(more);
            setStreamData((streamData: any) => [...streamData, ...shuffledData])
        }, 300)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setStreamData, tags, page, categories]);


    if (!streamData) return
    return (
        <VirtuosoGrid
            id='searchGrid'
            className="mt-6"
            useWindowScroll
            data={streamData}
            style={{ minHeight: 100, width: '100%' }}
            totalCount={streamData.length}
            overscan={1}
            endReached={loadMore}
            listClassName={cn("grid content-center gap-6 pt-0 grid-cols-2", platform == 3 ? "2xl:grid-cols-4 md:grid-cols-3" : " 2xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4")}
            itemContent={(index, data) => (
                <SingleScreen src={data?.hash + data?.ext} />
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
    });
    if (!req.ok) return { message: "something went wrong", status: req.status }

    const data = await req.json()
    const screens = data.screens.data.flatMap(item => ({
        hash: item.attributes.screen.data?.attributes.hash,
        ext: item.attributes.screen.data?.attributes.ext
    }));
    return screens;
}
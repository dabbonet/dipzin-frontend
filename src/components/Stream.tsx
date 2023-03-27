'use client'
import { FC, forwardRef, useCallback, useEffect, useState } from 'react'
import { Components, VirtuosoGrid } from 'react-virtuoso';
import ShowcaseScreen from './screen/ShowcaseScreen';
import { usePlatform } from "@/lib/platforms";
import { cn, shuffle } from '@/lib/utils';

interface StreamProps {
    streamCount: any;
}

const Stream: FC<StreamProps> = ({ streamCount }) => {

    const { platforms, setPlatforms, selected } = usePlatform();
    const [stream, setStream] = useState<any>({});
    const [loadedPages, setLoadedPages] = useState<number[]>([]);

    const getMaxCount = () => {
        if (streamCount.length == 0 && !selected) return
        const platform = getPlatformName(selected!)
        return streamCount[platform!];
    }

    const randomPage = () => {
        const max = getMaxCount();
        if (loadedPages.length >= max) return
        let randomPage = getRandomPageNumber(max);
        while (loadedPages.includes(randomPage)) {
            randomPage = getRandomPageNumber(max);
        }
        setLoadedPages((pages) => [...pages, randomPage]);
        return randomPage;
    }


    // 1. Initialize Stream and Page Platforms.
    // 2. Refetch Stream on Platform Change.
    useEffect(() => {
        setPlatforms([2, 1, 3]);
        setLoadedPages([]);
        const updateStream = async () => {
            const data = await getStream({ platform: selected!, page: randomPage()! });
            setStream(shuffle(data.stream));
        }
        updateStream();
    }, [selected]);

    const loadMore = useCallback(() => {
        console.log('loaded', loadedPages)
        return setTimeout(async () => {
            // Return if all pages have been loaded
            const max = getMaxCount() / 10
            if (loadedPages.length >= max) return

            // Load more stream items
            const more = await getStream({ platform: selected!, page: randomPage()! });
            setStream((stream: any) => [...stream, ...shuffle(more.stream)])
        }, 200)
    }, [setStream, selected, loadedPages])

    return (
        <>
            <VirtuosoGrid
                className="mt-6"
                useWindowScroll
                data={stream}
                style={{ minHeight: 100, width: '100%', height: 'fit' }}
                totalCount={stream.length}
                overscan={2}
                endReached={loadMore}
                listClassName={cn("grid content-center gap-6 pt-0 grid-cols-2", selected == 3 ? "2xl:grid-cols-4 md:grid-cols-3" : " 2xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4")}
                itemContent={(index, data) => (
                    <ShowcaseScreen app={data} />
                )}

            />
        </>
    );
};

Stream.displayName = "Stream"

export default Stream


interface StreamRequestProps {
    platform: number;
    page: number;
}

async function getStream({ platform, page }: StreamRequestProps) {
    const res = await fetch("/api/stream?platform=" + platform + "&page=" + page);
    if (!res.ok) throw new Error("Failed to fetch stream");
    return res.json();
}

function getRandomPageNumber(max: number): number {
    const randomPage = Math.round(Math.random() * (max / 10));
    console.log(randomPage)
    return randomPage === 0 ? 1 : randomPage; // Ensure page number is at least 1
}

function getPlatformName(platform: number) {
    switch (platform) {
        case 1:
            return 'android'
        case 2:
            return 'ios'
        case 3:
            return 'web'
    }
}
'use client'
import { FC, forwardRef, useCallback, useEffect, useState } from 'react'
import { Components, VirtuosoGrid } from 'react-virtuoso';
import ShowcaseScreen from './screen/ShowcaseScreen';
import { usePlatform } from "@/lib/platforms";
import { cn, shuffle } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import Showcase from './Showcase';

interface StreamProps {
}

const Stream: FC<StreamProps> = () => {

    const { setPlatforms, selected } = usePlatform();
    const [stream, setStream] = useState<any>({});
    const [loadedPages, setLoadedPages] = useState<number[]>([]);
    const [selectedShowcase, setSelectedShowcase] = useState<any>(null);

    // 1. Initialize Stream and Page Platforms.
    // 2. Refetch Stream on Platform Change.
    useEffect(() => {
        setPlatforms([2, 1, 3]);
        setLoadedPages([]);
        setStream({});
        const updateStream = async () => {
            const data = await getStream({ platform: selected!, previousPages: [] });
            setLoadedPages((prevLoadedPages) => [...prevLoadedPages, data.page]);
            setStream(shuffle(data.stream));
        }
        updateStream();
    }, [selected]);

    const loadMore = useCallback(() => {
        console.log(loadedPages)
        return setTimeout(async () => {
            // Load more stream items
            const more = await getStream({ platform: selected!, previousPages: loadedPages });
            if (more.status == 404) return
            setLoadedPages((prevLoadedPages) => [...prevLoadedPages, more.page]);

            const shuffledData = shuffle(more.stream);
            setStream((stream: any) => [...stream, ...shuffledData])
        }, 300)
    }, [setStream, loadedPages, selected])

    return (
        <>
            <VirtuosoGrid
                className="mt-6"
                useWindowScroll
                data={stream}
                style={{ minHeight: 100, width: '100%' }}
                totalCount={stream.length}
                overscan={1}
                endReached={loadMore}
                listClassName={cn("grid content-center gap-6 pt-0 grid-cols-2", selected == 3 ? "2xl:grid-cols-4 md:grid-cols-3" : " 2xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4")}
                itemContent={(index, data) => (
                    <div onClick={() => setSelectedShowcase(data)}>
                        <ShowcaseScreen app={data} />
                    </div>
                )}
            />
            <AnimatePresence>
                {
                    selectedShowcase && (
                        <Showcase selectedShowcase={selectedShowcase} setSelectedShowcase={setSelectedShowcase} />
                    )
                }
            </AnimatePresence>
        </>
    );
};

Stream.displayName = "Stream"

export default Stream

interface StreamRequestProps {
    platform: number;
    previousPages: number[];
}

async function getStream({ platform, previousPages }: StreamRequestProps) {
    const res = await fetch("/api/stream?platform=" + platform + "&previousPages=" + previousPages);
    if (!res.ok) return { message: "No more apps", status: 404 }
    return res.json();
}
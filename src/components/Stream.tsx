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
        const updateStream = async () => {
            const data = await getStream({ platform: selected!, limit: 13, previousIds: [] });
            const streamIds = data.stream.map((streamItem: any) => streamItem.id);
            setLoadedPages((prevLoadedPages) => [...prevLoadedPages, ...streamIds]);
            setStream(shuffle(data.stream));
        }
        updateStream();
    }, [selected]);

    const loadMore = useCallback(() => {
        return setTimeout(async () => {
            // Load more stream items
            const more = await getStream({ platform: selected!, limit: 13, previousIds: loadedPages });
            const streamIds = more.stream.map((streamItem: any) => streamItem.id);
            setLoadedPages((prevLoadedPages) => [...prevLoadedPages, ...streamIds]);

            const shuffledData = shuffle(more.stream);
            setStream((stream: any) => [...stream, ...shuffledData])
        }, 300)
    }, [setStream, loadedPages])

    return (
        <>
            <VirtuosoGrid
                className="mt-6"
                useWindowScroll
                data={stream}
                style={{ minHeight: 100, width: '100%' }}
                totalCount={stream.length}
                overscan={10}
                endReached={loadMore}
                listClassName={cn("grid content-center gap-6 pt-0 grid-cols-2", selected == 3 ? "2xl:grid-cols-4 md:grid-cols-3" : " 2xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4")}
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
    limit: number;
    previousIds: number[];
}

async function getStream({ platform, limit, previousIds }: StreamRequestProps) {
    const res = await fetch("/api/stream?platform=" + platform + "&limit=" + limit + "&previousIds=" + previousIds);
    if (!res.ok) throw new Error("Failed to fetch stream");
    return res.json();
}
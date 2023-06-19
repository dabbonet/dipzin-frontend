import { FC, useCallback, useEffect, useState } from "react";
import { LogLevel, VirtuosoGrid } from "react-virtuoso";
import ShowcaseScreen from "./screen/ShowcaseScreen";
import { usePlatform } from "@/lib/platforms";

import { cn, shuffle } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import Showcase from './Showcase';
import { useContentDiscovery } from '@/context/useContentDiscovery';
import StreamLoader from './StreamLoader';
import { useNavigator } from "@/context/useNavigatiorContext";

interface StreamProps { }


const Stream: FC<StreamProps> = () => {
  const {setNavigatorUi} = useNavigator()
  const { setPlatforms, selected } = usePlatform();
  const { streamData, setStreamData } = useContentDiscovery();
  const [loadedPages, setLoadedPages] = useState<number[]>([]);
  const [selectedShowcase, setSelectedShowcase] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    setNavigatorUi('mneuWithSearch')
    return ()=> {
      setNavigatorUi('')
    }
  },[])
  // 1. Initialize Stream and Page Platforms.
  // 2. Refetch Stream on Platform Change.
  const updateStream = async () => {
    const data = await getStream({ platform: selected!, previousPages: [] });
    setIsLoading(false)
    setLoadedPages((prevLoadedPages) => [...prevLoadedPages, data.page]);
    setStreamData(shuffle(data.stream));
  }

  // @ts-ignore
  useEffect(() => {
    setPlatforms([2, 1]);
    setLoadedPages([]);
    setStreamData({});
    updateStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Dump Loaded Pages when stream refetch
  useEffect(() => {
    if (streamData?.length == undefined && loadedPages.length > 1) {
      updateStream();
      setLoadedPages([]);
    }
  }, [streamData, loadedPages])

  const loadMore = useCallback(() => {
    return setTimeout(async () => {
      // Load more stream items
      const more = await getStream({ platform: selected!, previousPages: loadedPages });
      if (more.status == 404) return
      setLoadedPages((prevLoadedPages) => [...prevLoadedPages, more.page]);

      const shuffledData = shuffle(more.stream);
      setStreamData((streamData: any) => [...streamData, ...shuffledData])
    }, 300)
  }, [setStreamData, loadedPages, selected])

  if (isLoading) return <StreamLoader />
  if (!streamData) return

  return (
    <>
      <VirtuosoGrid
        className="my-6"
        useWindowScroll
        data={streamData}
        initialItemCount={15}
        style={{ minHeight: 100, width: '100%' }}
        totalCount={streamData.length}
        overscan={1}
        endReached={loadMore}
        atBottomStateChange={loadMore}
        listClassName={cn("mb-10 grid content-center gap-6 pt-0 grid-cols-2", selected == 3 ? "2xl:grid-cols-4 md:grid-cols-3" : " 2xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4")}
        logLevel={LogLevel.DEBUG}
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

Stream.displayName = "Stream";

export default Stream;

interface StreamRequestProps {
  platform: number;
  previousPages: number[];
}

async function getStream({ platform, previousPages }: StreamRequestProps) {
  const res = await fetch(
    "/api/stream?platform=" + platform + "&previousPages=" + previousPages
  );
  if (!res.ok) return { message: "No more apps", status: 404 };
  return res.json();
}

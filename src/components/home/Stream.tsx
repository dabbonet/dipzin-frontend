"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { LogLevel, VirtuosoGrid } from "react-virtuoso";
import ShowcaseScreen from "../screen/ShowcaseScreen";
import { usePlatform } from "@/context/usePlatforms";
import { cn, shuffle } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import Showcase from "../Showcase";
import { useContentDiscovery } from "@/context/useContentDiscovery";
import StreamLoader from "../StreamLoader";
import { useNavigator } from "@/context/useNavigatiorContext";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";

interface StreamProps { }


const Stream: FC<StreamProps> = () => {
  const { setActiveView, setActiveControls } = useNavigator()
  const { setPlatforms, platforms, selected, setSelected } = usePlatform();
  const { streamData, setStreamData, setSearchKeyword } = useContentDiscovery();
  const [loadedPages, setLoadedPages] = useState<number[]>([]);
  const [selectedShowcase, setSelectedShowcase] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // setActiveView('menuWithSearch')
    setActiveControls("menu-search");
    setSearchKeyword("");
    setPlatforms([2, 1, 3]); // Initialize Platform Switcher
    return () => {
      setActiveView("");
      setActiveControls("");
    };
  }, []);
  // 1. Initialize Stream and Page Platforms.
  // 2. Refetch Stream on Platform Change.
  const updateStream = async () => {
    const data = await getStream({ platform: selected!, previousPages: [] });
    setIsLoading(false);
    setLoadedPages((prevLoadedPages) => [...prevLoadedPages, data.page]);
    setStreamData(shuffle(data.stream));
  };

  // @ts-ignore
  useEffect(() => {
    if (selected) {
      setLoadedPages([]);
      setStreamData([]);
      updateStream();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Dump Loaded Pages when stream refetch
  useEffect(() => {
    if (streamData?.length == 0 && loadedPages.length >= 1) {
      updateStream();
      setLoadedPages([]);
    }
  }, [streamData, loadedPages]);

  useLockBodyScroll(selectedShowcase);

  const loadMore = useCallback(() => {
    return setTimeout(async () => {
      // Load more stream items
      const more = await getStream({
        platform: selected!,
        previousPages: loadedPages,
      });
      if (more.status == 404) {
        setIsLoading(false);
        return;
      }
      setLoadedPages((prevLoadedPages) => [...prevLoadedPages, more.page]);

      setStreamData((prevStreamData: any[] | null) => {
        const shuffledData = shuffle(more.stream);
        const newData = Array.isArray(prevStreamData) ? prevStreamData : [];
        return [...newData, ...shuffledData];
      });
    }, 500);
  }, [streamData, loadedPages, selected]);

  if (streamData.length <= 0 || isLoading) return <StreamLoader />;

  return (
    <>
      <VirtuosoGrid
        className="mt-6"
        useWindowScroll
        data={streamData}
        initialItemCount={10}
        style={{ minHeight: 100, width: "100%" }}
        totalCount={streamData.length}
        overscan={1}
        endReached={loadMore}
        listClassName={cn(
          "grid content-center gap-2 md:gap-6 pt-0 grid-cols-2",
          selected == 3
            ? "2xl:grid-cols-3 md:grid-cols-3"
            : "2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3"
        )}
        // logLevel={LogLevel.DEBUG}
        itemContent={(index, data) => (
          <div onClick={() => setSelectedShowcase(data)}>
            <ShowcaseScreen app={data} />
          </div>
        )}
        components={{
          Footer: () => {
            return (
              <>
                {isLoading && <StreamLoader />}
                {/* {isLoading || streamData?.length <= 1 && <StreamLoader />} */}
                <div className="pt-10 pb-48 text-center text-slate-500">
                  {isLoading && "Loading More"}
                  {!isLoading && "End Reached"}
                </div>
              </>
            );
          },
        }}
      />
      <AnimatePresence>
        {selectedShowcase && (
          <Showcase
            selectedShowcase={selectedShowcase}
            setSelectedShowcase={setSelectedShowcase}
          />
        )}
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

import { FC, useCallback, useEffect, useState } from "react";
import { LogLevel, VirtuosoGrid } from "react-virtuoso";
import ShowcaseScreen from "./screen/ShowcaseScreen";
import { usePlatform } from "@/context/usePlatforms";
import { cn, shuffle } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import Showcase from "./Showcase";
import { useContentDiscovery } from "@/context/useContentDiscovery";
import StreamLoader from "./StreamLoader";
import { useNavigator } from "@/context/useNavigatiorContext";
import { useSearchContext } from "@/context/SearchContext";

interface StreamProps {}

const Stream: FC<StreamProps> = () => {
  const { setActiveView, setActiveControls } = useNavigator();
  const { setPlatforms, selected } = usePlatform();
  const { streamData, setStreamData } = useContentDiscovery();
  const { setSearchKeyword, setFilters } = useSearchContext();
  const [loadedPages, setLoadedPages] = useState<number[]>([]);
  const [selectedShowcase, setSelectedShowcase] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setActiveControls("menu-search");
    setSearchKeyword("");
    setFilters([]);
    setPlatforms([2, 1, 3]); // Initialize Platform Switcher
    return () => {
      setActiveView("");
      setActiveControls("");
    };
  }, []);

  const getStream = async ({ platform, previousPages }: StreamRequestProps) => {
    let retries = 0;
    while (retries < 3) {
      try {
        const res = await fetch(
          "/api/stream?platform=" + platform + "&previousPages=" + previousPages
        );
        if (!res.ok) {
          if (res.status === 404) {
            return { message: "No more apps", status: 404 };
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      } catch (error) {
        retries++;
        if (retries === 3) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
      }
    }
  };

  const updateStream = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getStream({ platform: selected!, previousPages: [] });
      setIsLoading(false);
      setLoadedPages((prevLoadedPages) => [...prevLoadedPages, data.page]);
      setStreamData(shuffle(data.stream));
    } catch (error) {
      setIsLoading(false);
      setError("Failed to load stream. Please try again later.");
      console.error("Error fetching stream:", error);
    }
  };

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        setLoadedPages([]);
        setStreamData([]);
        updateStream();
      });
    }
  }, [selected]);

  useEffect(() => {
    if (streamData?.length == 0 && loadedPages.length >= 1) {
      updateStream();
      setLoadedPages([]);
    }
  }, [streamData, loadedPages]);

  const loadMore = useCallback(() => {
    return setTimeout(async () => {
      try {
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
      } catch (error) {
        setError("Failed to load more items. Please try again later.");
        console.error("Error loading more items:", error);
      }
    }, 500);
  }, [streamData, loadedPages, selected]);

  if (error) {
    return <div className="text-center text-red-500 mt-6">{error}</div>;
  }

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

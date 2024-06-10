"use client";

import { cn } from "@/lib/utils";
import { VirtuosoGrid } from "react-virtuoso";
import SingleScreen from "../screen/SingleScreen";
import { useSearchContext } from "@/context/SearchContext";
import { usePlatform } from "@/context/usePlatforms";
import StreamLoader from "../StreamLoader";
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { motion } from 'framer-motion';

export const SearchResultsContainer = () => {
  const { openScreen, setOpenScreen, data, isLoading, loadMore } = useSearchContext();
  const { selected } = usePlatform();
  const { openScreenByIndex } = useKeyboardNavigation(data, openScreen, setOpenScreen);

  if (isLoading && data?.length === 0)
    return (
      <div className="w-full h-full max-w-[92%]">
        <StreamLoader />
      </div>
    );

  if (!isLoading && data?.length === 0) {
    return (
      <motion.div
        className="w-full h-full flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        There are no screens with these filters
      </motion.div>
    );
  }

  return (
    <>
      {data !== null && data?.length !== 0 && (
        <VirtuosoGrid
          className="mt-6 max-w-[90%] mx-auto"
          useWindowScroll
          endReached={loadMore}
          data={data}
          style={{ minHeight: 100, width: "100%" }}
          listClassName={cn(
            "grid content-center gap-6 pt-0 grid-cols-2",
            +selected === 3
              ? "2xl:grid-cols-3 md:grid-cols-3"
              : "2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4"
          )}
          totalCount={data?.length}
          overscan={10}
          itemContent={(index, data) => (
            <SingleScreen
              screen={data?.screen}
              appName={data.app.name}
              tagLine={data.app.tag_line}
              setOpen={() => { setOpenScreen(data); openScreenByIndex(index); }}
              icon={data.app.icon}
            />
          )}
          components={{
            Footer: () => (
              <div className="pt-10 pb-48 text-center text-slate-500">
                {isLoading && data.length > 0 ? "Loading More..." : ""}
                {!isLoading && data.length !== 0 ? "End Reached" : ""}
              </div>
            ),
          }}
        />
      )}
    </>
  );
}
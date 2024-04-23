"use client";

import { cn } from "@/lib/utils";
import { VirtuosoGrid } from "react-virtuoso";
import SingleScreen from "../screen/SingleScreen";
import { useSearchContext } from "@/context/SearchContext";
import { usePlatform } from "@/context/usePlatforms";
import StreamLoader from "../StreamLoader";
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'

export const SearchResultsContainer = () => {
  const { openScreen, setOpenScreen, data, isLoading, loadMore } = useSearchContext();
  const { selected } = usePlatform();
  const {
    openScreenByIndex,
  } = useKeyboardNavigation(data, openScreen, setOpenScreen);

  if (!isLoading && data?.length === 0)
    return (
      <div className=" w-full h-full flex justify-center items-center">
        there is no screens with this filters
      </div>
    );

  if (isLoading && data?.length <= 0) return
  (
    <div className="w-full h-full max-w-[92%]">
      <StreamLoader />
    </div>
  );


  return (
    <>
      {data !== null && data?.length !== 0 && (
        <VirtuosoGrid
          className="mt-6 max-w-[90%] mx-auto"
          useWindowScroll
          endReached={loadMore}
          data={data && data}
          style={{ minHeight: 100, width: "100%" }}
          listClassName={cn(
            "grid content-center gap-6 pt-0 grid-cols-2",
            +selected === 3
              ? "2xl:grid-cols-3 md:grid-cols-3"
              : " 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4"
          )}
          totalCount={data && data?.length}
          overscan={10}
          itemContent={(index, data) => {
            return (
              <SingleScreen screen={data?.screen} appName={data.app.name} tagLine={data.app.tag_line} setOpen={() => { setOpenScreen(data); openScreenByIndex(index) }} icon={data.app.icon} />
            );
          }}
          components={{
            Footer: () => {
              return (
                <>
                  <div className="pt-10 pb-48 text-center text-slate-500">
                    {isLoading && "Loading More"}
                    {!isLoading && "End Reached"}
                  </div>
                </>
              );
            },
          }}
        />
      )}
    </>
  );
};

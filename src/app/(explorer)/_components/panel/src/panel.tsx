'use client';

import React, { useState, useEffect } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { Screen } from '@/components/Explorer/screen';
import { Spinner } from '@/components/UI/spinner';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { cn } from '@/lib/utils';
import { useFetchData } from '@/app/(explorer)/_hooks/useFetchData';

// type ScreenType = {
//   id: string;
//   imgSrc: string;
//   width: number;
//   height: number;
//   app: {
//     id: string;
//     avatar: {
//       imgSrc: string;
//     };
//     name: string;
//     tagLine: string;
//   };
// };

const ScreensGrid = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { query, data } = useQuery();
  // Destructure fetchData from the hook
  const { fetchData } = useFetchData();
  // Function to load screens
  const loadScreens = async () => {
    setIsLoading(true);
    // Call the fetchData function
    await fetchData();
    // Check if more data is available (based on pagination or data length)
    // if (data && data.length < pagination.limit) {
    //   setHasMore(false);
    // }
    // Append the new data to the screens state
    // setScreens((prevScreens) => [...prevScreens, ...data]);
    setIsLoading(false);
  };

  // UseEffect to load screens initially
  useEffect(() => {
    if (query.platform) loadScreens(); // Initial load
  }, [query]);

  if (!data || data.length < 0) return null;
  return (
    <VirtuosoGrid
      data={data}
      // endReached={hasMore ? loadMoreScreens : undefined}
      overscan={200}
      useWindowScroll
      // eslint-disable-next-line react/no-unstable-nested-components
      itemContent={(_, screen) => (
        <Screen
          key={screen.id}
          screen={screen}
          view="global" // Or any other prop you want to pass
        />
      )}
      listClassName="size-full grid content-center gap-2 md:gap-6 pt-0 grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3"
      style={{ minHeight: 100, width: "100%" }}
      className="size-full"
      components={{
        // eslint-disable-next-line react/no-unstable-nested-components
        Footer: () => (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {isLoading && <Spinner className="py-8 flex mx-auto" />}
          </>
        ),
      }}
    />
  );
};
const Panel = ({ pattern }: any) => {
  const { query } = useQuery();
  switch (pattern) {
    case "marketing":
    case "screens":
    case "components":
      return (
        <div className={cn('relative', (query?.apps?.length ?? 0) > 0 ? "top-40" : "top-28")}>
          <ScreensGrid />
        </div>
      );
    case "flows":
      return (
        <div>
          {/* UI for flows */}
        </div>
      );
    case "apps":
      return (
        <div className={cn('relative', (query?.apps?.length ?? 0) > 0 ? "top-32" : "top-28")}>
          <ScreensGrid />
        </div>
      );
    default:
      return null; // Handle invalid view prop value
  }
}

export default Panel;

'use client';

import React, { useState, useEffect } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { Screen } from '@/components/Explorer/screen';
import { Spinner } from '@/components/UI/spinner';

type ScreenType = {
  id: string;
  imgSrc: string;
  width: number;
  height: number;
  app: {
    id: string;
    avatar: {
      imgSrc: string;
    };
    name: string;
    tagLine: string;
  };
};

const ScreensGrid = () => {
  const [screens, setScreens] = useState<ScreenType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Mock API to simulate loading more data
  const loadMoreScreens = () => {
    if (isLoading) return;

    setIsLoading(true);

    // Simulating API call
    setTimeout(() => {
      const newScreens = Array.from({ length: 10 }).map((_, index) => ({
        id: `${screens.length + index + 1}`,
        imgSrc: `https://placehold.co/300x650.png?text=Screen+${screens.length + index + 1}`,
        width: 300,
        height: 650,
        app: {
          id: `${screens.length + index + 1}`,
          avatar: {
            imgSrc: 'https://github.com/shadcn.png',
          },
          name: `App Name ${screens.length + index + 1}`,
          tagLine: 'App Tag Line',
        },
      }));

      setScreens((prevScreens) => [...prevScreens, ...newScreens]);
      setIsLoading(false);

      // Stop loading more after 150 items
      if (screens.length + newScreens.length >= 150) {
        setHasMore(false);
      }
    }, 1000);
  };

  useEffect(() => {
    loadMoreScreens(); // Initial load
  }, []);

  return (
    <VirtuosoGrid
      data={screens}
      endReached={hasMore ? loadMoreScreens : undefined}
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

const Panel = ({ view }: { view: "screens" | "flows" | "collections" }) => {
  switch (view) {
    case "screens":
      return <ScreensGrid />;
    case "flows":
      return (
        <div>
          {/* UI for flows */}
        </div>
      );
    case "collections":
      return (
        <div>
          {/* UI for collections */}
        </div>
      );
    default:
      return null; // Handle invalid view prop value
  }
}

export default Panel;

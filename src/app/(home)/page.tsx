'use client'

import SingleScreen from "@/components/screen/SingleScreen"
import { getStream } from "@/helpers/requests"
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const items = [
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
  ];

  const parentRef = useRef<HTMLDivElement | null>(null)
  const parentOffsetRef = useRef(0)

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener to track window resize events
    window.addEventListener('resize', handleResize);

    // Call handleResize initially to set the initial window size
    handleResize();

    // Remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getColumnWidth(index?: number) {
    return 300;
  }

  function getRowHeight() {
    const height = windowSize.height;
    return 200;
    // if (height < 800) {
    //   return 200;
    // } else if (height < 600) {
    //   return 150;
    // } else {
    //   return 200;
    // }
  }

  const rowVirtualizer = useWindowVirtualizer({
    count: items.length / 6,
    estimateSize: getRowHeight,
    overscan: 1,
    scrollMargin: parentOffsetRef.current,

  })

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: 6,
    getScrollElement: () => parentRef.current,
    estimateSize: getColumnWidth,
    overscan: 0,
  })

  const columnItems = columnVirtualizer.getVirtualItems()
  const [before, after] =
    columnItems.length > 0
      ? [
        columnItems[0].start,
        columnVirtualizer.getTotalSize() -
        columnItems[columnItems.length - 1].end,
      ]
      : [0, 0]

  return (
    <div
      ref={parentRef}
      className='text-white w-[85%] pt-4'
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: columnVirtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((row) => {
          return (
            <div
              key={row.key}
              data-index={row.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                justifyContent: 'center',
                transform: `translateY(${row.start - rowVirtualizer.options.scrollMargin}px)`,
                display: 'flex',
                width: '100%',
              }}
            >
              <div style={{ width: `${before}px` }} />
              {columnItems.map((column: any) => {
                // const application: any = data?.pages[row.index]?.data?.[column.index];
                // if (!application) return null;

                return (
                  <div
                    key={column.key}
                    style={{
                      width: getColumnWidth(),
                      padding: '16px',
                    }}
                  >
                    <SingleScreen src={items[0]} />
                  </div>
                );
              })}
              <div style={{ width: `${after}px` }} />
            </div>
          )
        })}
      </div>
    </div>
  );
}
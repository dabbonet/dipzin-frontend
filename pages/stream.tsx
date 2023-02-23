import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { faker } from '@faker-js/faker'

import { useVirtualizer, useWindowVirtualizer } from '@tanstack/react-virtual'
import BlurImage from '../components/screen/Image'
import { supabase } from '../lib/supabase'
import { useInfiniteQuery } from 'react-query'
import { AnimatePresence, motion } from 'framer-motion'
import Screen from '../components/screen'
import { GlobalContext } from '../lib/globalContext'
import Showcase from './showcase'

interface Column {
  key: string
  name: string
  width: number
}
const perPage = 5;
let randomPage = Math.floor(Math.random() * 2) + 1;

const Stream = ({refetched}: any) => {
    
  const [maxPages, setMaxPages] = React.useState(2);
  const parentRef = React.useRef<HTMLDivElement | null>(null)
  const parentOffsetRef = React.useRef(0)


  const [loadedPages, setLoadedPages] = React.useState([randomPage]);
  const platform = React.useContext(GlobalContext)?.platform;
  const [selected, setSelected] = React.useState<any>(null);

  // get MaxPages
  React.useEffect(() => {
    const fetchMaxPages = async () => {
      let count: number | null = null;
      let error: any = null;
      switch (platform) {
        case 1:
          {
            ({ error, count } = await supabase
              .from("android_showcases")
              .select("id", { count: "exact" }));
          }
          break;
        case 2:
          {
            ({ error, count } = await supabase
              .from("ios_showcases")
              .select("id", { count: "exact" }));
          }
          break;
        case 4:
          {
            ({ error, count } = await supabase
              .from("web_showcases")
              .select("id", { count: "exact" }));
          }
          break;
      }
      if (error) console.error("max error: ", error);

      if (count) {
        const x = Math.ceil(count / perPage);
        setMaxPages(x);
      }
    };
    fetchMaxPages();
    // console.log("platfom: ", platform);
  }, [platform]);

  React.useEffect(() => {
    if(refetched){
        setLoadedPages([]);
    }
  },[refetched]);

  React.useEffect(() => {
    remove();
    refetch();
    setLoadedPages([]);
  },[maxPages]);

  
  
  const { 
      status,
      data, 
      error, 
      hasNextPage, 
      isFetchingNextPage,
      remove,
      refetch,
      fetchNextPage 
    } = useInfiniteQuery(
        ['stream'],
        (ctx) => fetchServerPage(perPage,ctx.pageParam, platform),
        {
            getNextPageParam: (_lastPage, _allPages) => {
                return  _lastPage.nextPage? _lastPage.nextPage : false
            },
            refetchOnWindowFocus: false,
            keepPreviousData: false,
            optimisticResults: true,
            refetchOnMount: false,
        },
        )
    

  const getColumnWidth = (index: number) => platform == 4 ? 500 : 400
  const getRowHeight = (index: number) => platform == 4 ? 50 : 200

  const allRows = data ? data.pages : []
  

  const rowVirtualizer = useWindowVirtualizer({
    count: allRows.length,
    estimateSize: getRowHeight,
    overscan: platform == 4 ? 5 : 1,
    scrollMargin: parentOffsetRef.current,
    
  })

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: platform == 4 ? 4 : 5,
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


    // Fetch next page when scrolling to the bottom
    React.useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()
        if (!lastItem) {
        return
        }
        if (
            lastItem.index >= allRows.length - 1 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            if (loadedPages.length >= maxPages) {
            // All pages have been loaded, do not fetch more.
            return;
            }
            let nextPage;
            do {
                nextPage = Math.floor(Math.random() * maxPages) + 1;
            } while (loadedPages.includes(nextPage));
                setLoadedPages([...loadedPages, nextPage]);
            try {
                fetchNextPage({ pageParam: nextPage });
            } catch (error) {
                console.error("fetchNextPage Error: ", error);
            }
        }
    }, [
        hasNextPage,
        fetchNextPage,
        allRows.length,
        isFetchingNextPage,
        rowVirtualizer.getVirtualItems(),
    ])

  return (
    <div
      ref={parentRef}
      className='text-white w-[85%] pt-4'
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
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
                transform: `translateY(${
                  row.start - rowVirtualizer.options.scrollMargin
                }px)`,
                display: 'flex',
                width: '100%',
              }}
            >
              <div style={{ width: `${before}px` }} />
              {columnItems.map((column) => {
                const application: any = data?.pages[row.index]?.data?.[column.index];
                if (!application) return null;

                return (
                    <div
                    key={column.key}
                    style={{
                        width: getColumnWidth(column.index),
                        padding: '16px',
                    }}
                    >
                    <motion.div
                        layout
                        onClick={() => setSelected(application)}
                    >
                        <Screen
                            platform={platform ?? 1}
                            app={application}
                            list={application.showcase}
                        />
                    </motion.div>
                    
                    </div>
                );
                })}
              <div style={{ width: `${after}px` }} />
            </div>
          )
        })}
        <AnimatePresence>
            {selected && <Showcase selected={selected} setSelected={setSelected} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

async function fetchServerPage(
    limit: number = 5,
    page: number = randomPage,
    platform: number | undefined,
    ): Promise<{ data: string[]; nextPage: number | null }> {
        const from = limit * (page - 1) + 1;
        const to = limit * page;

        let data, error: any;
        try {
            switch (platform) {
                case 1:
                    ({ data, error } = await supabase
                    .from("android_showcases")
                    .select("*")
                    .range(from, to));
                    break;
                case 2:
                    ({ data, error } = await supabase
                    .from("ios_showcases")
                    .select("*")
                    .range(from, to));
                    break;
                case 4:
                    ({ data, error } = await supabase
                    .from("web_showcases")
                    .select("*")
                    .range(from, to));
                    break;
                default:
                    throw new Error("Invalid platform");
                }

        } catch (e) {
            error = e;
        }

      // console.log('dataaa3', data)
        if (error) {
            throw new Error(error.message)
        }
        if( data && data.length === 0) {
            return { data , nextPage: null }
        }
        
        data?.sort(() => Math.random() - 0.5);
        if(data){
            return { data, nextPage: (page+1) * limit }
        }
        return { data: [], nextPage: null }
    }
        
export default Stream
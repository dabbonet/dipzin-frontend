import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { faker } from '@faker-js/faker'

import { useVirtualizer, useWindowVirtualizer } from '@tanstack/react-virtual'
import BlurImage from '../components/screen/Image'
import { supabase } from '../lib/supabase'
import { useInfiniteQuery } from 'react-query'
import { motion } from 'framer-motion'
import Screen from '../components/screen'
import { GlobalContext } from '../lib/globalContext'

interface Column {
  key: string
  name: string
  width: number
}

function GridVirtualizerDynamic() {

  const parentRef = React.useRef<HTMLDivElement | null>(null)
  const parentOffsetRef = React.useRef(0)


  const [maxPages, setMaxPages] = React.useState(2);
//   let randomPage = Math.floor(Math.random() * maxPages) + 1;
//   const [loadedPages, setLoadedPages] = React.useState([randomPage]);
  const platform = React.useContext(GlobalContext)?.platform;

  // get MaxPages
//   React.useEffect(() => {
//     const fetchMaxPages = async () => {
//       let count: number | null = null;
//       let error: any = null;
//       switch (platform) {
//         case 1:
//           {
//             ({ error, count } = await supabase
//               .from("android_showcases")
//               .select("id", { count: "exact" }));
//           }
//           break;
//         case 2:
//           {
//             ({ error, count } = await supabase
//               .from("ios_showcases")
//               .select("id", { count: "exact" }));
//           }
//           break;
//         case 4:
//           {
//             ({ error, count } = await supabase
//               .from("web_showcases")
//               .select("id", { count: "exact" }));
//           }
//           break;
//       }
//       if (error) console.error("max error: ", error);

//       if (count) {
//         const x = Math.ceil(count / 5);
//         setMaxPages(x);
//       }
//     };
//     fetchMaxPages();
//     // console.log("platfom: ", platform);
//   }, [platform]);

  
  
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
        (ctx) => fetchServerPage(5,ctx.pageParam, platform),
        {
            getNextPageParam: (_lastGroup, groups) => {
                return  _lastGroup.nextOffset? _lastGroup.nextOffset : false
            },
            refetchOnWindowFocus: false,
            keepPreviousData: false,
            optimisticResults: true,
            refetchOnMount: false,
        },
        )

    React.useEffect(() => {
        remove();
        refetch();
    }, [platform]);
    
        // const { 
            //     status,
    //     data, 
    //     error, 
    //     hasNextPage, 
    //     isFetchingNextPage,
    //     fetchNextPage 
    //    } = useInfiniteQuery(
    //    ['stream'],
    //    (ctx) => fetchServerPage(5, ctx.pageParam),
    //        {
    //            getNextPageParam: (_lastGroup, groups) => {
    //                return  _lastGroup.nextOffset? _lastGroup.nextOffset : false
    //            },
    //            refetchOnWindowFocus: false,
    //            keepPreviousData: false,
    //            optimisticResults: true,
    //            refetchOnMount: false,
    //        },
    //    )
    

  const getColumnWidth = (index: number) => 400
  const getRowHeight = (index: number) => 200

  const allRows = data ? data.pages : []

  const rowVirtualizer = useWindowVirtualizer({
    count: allRows.length,
    estimateSize: getRowHeight,
    overscan: 1,
    scrollMargin: parentOffsetRef.current,
    
  })

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: 5,
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
            fetchNextPage();
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
      style={{ overflowY: 'auto'}}
      className={'pt-4'}
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
                // console.log('data test:', row.index , data?.pages[row.index])
                if (!application) return null;

                return (
                    <div
                    key={column.key}
                    style={{
                        minHeight: row.index === 0 ? 50 : row.size,
                        width: getColumnWidth(column.index),
                        padding: '16px',
                    }}
                    >
                    <motion.div
                        layout
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
      </div>
    </div>
  )
}

async function fetchServerPage(
    limit: number = 5,
    offset: number = 0,
    platform: number = 1,
    ): Promise<{ data: string[]; nextOffset: number | null }> {
        let data, error: any;
        try {
            switch (platform) {
                case 1:
                    ({ data, error } = await supabase
                    .from("android_showcases")
                    .select("*")
                    .range(offset, (offset + limit) - 1));
                    break;
                case 2:
                    ({ data, error } = await supabase
                    .from("ios_showcases")
                    .select("*")
                    .range(offset, (offset + limit) - 1));
                    break;
                case 4:
                    ({ data, error } = await supabase
                    .from("web_showcases")
                    .select("*")
                    .range(offset, (offset + limit) - 1));
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
            return { data , nextOffset: null }
        }
        
        data?.sort(() => Math.random() - 0.5);
        if(data){
            return { data, nextOffset: offset + limit }
        }
        return { data: [], nextOffset: null }
    }
        
const RecycledStream = () => {

    return (
        <div className='text-white w-[85%]'>
        <GridVirtualizerDynamic />
        </div>
    )
}
export default RecycledStream
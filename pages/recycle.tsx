import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { faker } from '@faker-js/faker'

import { useVirtualizer, useWindowVirtualizer } from '@tanstack/react-virtual'
import BlurImage from '../components/screen/Image'
import { supabase } from '../lib/supabase'
import { useInfiniteQuery } from 'react-query'
import { motion } from 'framer-motion'
import Screen from '../components/screen'

interface Column {
  key: string
  name: string
  width: number
}

function GridVirtualizerDynamic() {

  const parentRef = React.useRef<HTMLDivElement | null>(null)

  const parentOffsetRef = React.useRef(0)

  const { 
     status,
     data, 
     error, 
     hasNextPage, 
     isFetchingNextPage,
     fetchNextPage 
    } = useInfiniteQuery(
    ['stream'],
    (ctx) => fetchServerPage(5, ctx.pageParam),
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
            fetchNextPage()
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
                        platform={1}
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
    ): Promise<{ data: string[]; nextOffset: number | null }> {
        const { data, error } = await supabase
        .from('ios_showcases')
        .select('*')
      .range(offset, (offset + limit))
      
      // console.log('dataaa3', data)
      if (error) {
            throw new Error(error.message)
        }
        if( data.length === 0) {
            return { data , nextOffset: null }
        }

        return { data, nextOffset: offset + limit }
    }
        
const RecycledStream = () => {

    return (
        <div className='text-white w-[85%]'>
        <GridVirtualizerDynamic />
        </div>
    )
}
export default RecycledStream
'use client'
import SingleScreen from '@/components/screen/SingleScreen'
import { getToken } from '@/lib/auth'
import { usePlatform } from '@/lib/platforms'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'

const page = () => {
    const params = useSearchParams()
    const [data, setdata] = useState([])
    const {selected} = usePlatform()
    const keyword = params.get('q')
    useEffect(()=> {
      async function getData() {
        const req = await fetch('/api/search/get-screens', {
          method: 'POST',
          body: JSON.stringify({
            token: getToken(),
            keyword
          })
        })
        const res = await req.json()
        console.log(res)
        setdata(res.screens)
      } 
      getData()
    },[])
  return (
    <>
      {data?.length !== 0 && 
        <VirtuosoGrid
        className="mt-6 max-w-[90%] mx-auto"
        useWindowScroll
        data={data && data}
        style={{ minHeight: 100, width: "100%" }}
        listClassName={cn(
          "grid content-center gap-6 pt-0 grid-cols-2",
          selected == 3
            ? "2xl:grid-cols-4 md:grid-cols-3"
            : " 2xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4"
        )}
        totalCount={data && data?.length}
        overscan={10}
        itemContent={(index, data) => {
          return (
            <SingleScreen screen={data}  />
          );
        }}
      />
      }
    </>
  )
}

export default page
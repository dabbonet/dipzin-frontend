'use client'
import SingleScreen from '@/components/screen/SingleScreen'
import { useNavigator } from '@/context/useNavigatiorContext'
import { useSelcetedImages } from '@/lib/SelectedToDownload'
import { getToken } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { usePathname, useSearchParams} from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
const qs = require('qs')
const page = () => {
  const [data, setdata] = useState([])
    const params = useSearchParams()
    const keyword = params.get('q')
    const queryString = window.location.search;
    const parsedQuery = qs.parse(queryString, { ignoreQueryPrefix: true });
    const components = parsedQuery.component;
    const tag = parsedQuery.tag;
    const category = parsedQuery.category;
    console.log(components , tag , category)
    const path = usePathname()
    const platform =  path.at(-1)
    const {selectedImages , setSelectedImages} = useSelcetedImages()
    const { setActiveControls } = useNavigator()

    useEffect(() => {
      if (selectedImages.images.length > 0) {
        setActiveControls('selection')
      } else {
        setActiveControls('menu-only')
      }
    }, [selectedImages])
    useEffect(() => {
      return () => {
        setSelectedImages({ appName: '', images: [] })
        setActiveControls('')
      }
    }, [])

    useEffect(()=> {
      async function getData() {
        const req = await fetch('/api/search/get-screens', {
          method: 'POST',
          body: JSON.stringify({
            token: getToken(),
            keyword,
            filters: `platform = ${platform}`
          })
        })
        const res = await req.json()
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
          +platform === 3
            ? "2xl:grid-cols-4 md:grid-cols-3"
            : " 2xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4"
        )}
        totalCount={data && data?.length}
        overscan={10}
        itemContent={(index, data) => {
          return (
            <SingleScreen screen={data.screen}  />
          );
        }}
      />
      }
    </>
  )
}

export default page
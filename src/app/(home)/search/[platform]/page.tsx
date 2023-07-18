'use client'
import SingleScreen from '@/components/screen/SingleScreen'
import { useContentDiscovery } from '@/context/useContentDiscovery'
import { useNavigator } from '@/context/useNavigatiorContext'
import { useSelcetedImages } from '@/lib/SelectedToDownload'
import { getToken } from '@/lib/auth'
import { usePlatform } from '@/lib/platforms'
import { cn } from '@/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
const qs = require('qs')





const page = () => {
  const [data, setdata] = useState([])
  const params = useSearchParams()
  const keyword = params.get('q')
  const queryString = window.location.search;
  const parsedQuery = qs.parse(queryString, { ignoreQueryPrefix: true });
  const { tag, components, category } = parsedQuery;

  const path = usePathname()
  const { selectedImages, setSelectedImages } = useSelcetedImages()
  const { setActiveView, setActiveControls } = useNavigator()
  const platform = path.at(-1)
  let filterQuery = `platform = ${platform}`

  if (Array.isArray(components) && components.length > 0) {
    const componentValues = components.map(component => `'${component}'`);
    filterQuery = filterQuery + ` AND components IN [${componentValues}]`;
  }

  if (Array.isArray(tag) && tag.length > 0) {
    const tagValues = tag.map(tagItem => `'${tagItem}'`);
    filterQuery = filterQuery + ` AND tags IN [${tagValues}]`;
  }

  if (Array.isArray(category) && category.length > 0) {
    const categoryValues = category.map(categoryItem => `'${categoryItem}'`);
    filterQuery = filterQuery + ` AND app.categories IN [${categoryValues}]`;
  }

  useEffect(() => {
    if (selectedImages.images.length > 0) {
      setActiveControls('selection')
    } else {
      setActiveControls('menu-only')
    }
  }, [selectedImages])

  const { filters, setSearchKeyword, setFilters } = useContentDiscovery();
  const { platforms, setSelected, setPlatforms } = usePlatform();

  useEffect(() => {
    setActiveView('menuWithSearch')
    setActiveControls('menu-search')
    setSearchKeyword(keyword)
    setPlatforms([2, 1]); // Initialize Platform Switcher
    setSelected(parseInt(platform))
    const newFilters = [
      ...(tag ? [{ tag, type: 'tag' }] : []),
      ...(components ? [{ components, type: 'component' }] : []),
      ...(category ? [{ category, type: 'category' }] : [])
    ];

    // Set the new filters
    setFilters(newFilters);

    return () => {
      setSelectedImages({ appName: '', images: [] })
      // setActiveControls('')
    }
  }, [])

  useEffect(() => {
    async function getData() {
      const req = await fetch('/api/search/get-screens', {
        method: 'POST',
        body: JSON.stringify({
          token: getToken(),
          keyword,
          filters: filterQuery
        })
      })
      const res = await req.json()
      setdata(res.screens)
    }
    getData()
  }, [])

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
              : " 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4"
          )}
          totalCount={data && data?.length}
          overscan={10}
          itemContent={(index, data) => {
            return (
              <SingleScreen screen={data.screen} />
            );
          }}
        />
      }
    </>
  )
}

export default page
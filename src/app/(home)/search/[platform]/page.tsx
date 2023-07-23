'use client'
import SingleScreen from '@/components/screen/SingleScreen'
import { useContentDiscovery } from '@/context/useContentDiscovery'
import { useNavigator } from '@/context/useNavigatiorContext'
import { useSelcetedImages } from '@/lib/SelectedToDownload'
import { getToken } from '@/lib/auth'
import { usePlatform } from '@/lib/platforms'
import { cn, getPlatformById, shuffle } from '@/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState , useCallback} from 'react'
import { VirtuosoGrid } from 'react-virtuoso'





const page = () => {
  const [data, setdata] = useState([])
  const params = useSearchParams()
  const keyword = params.get('q')
  const components = params.getAll('component')
  const tag = params.getAll('tag')
  const category = params.getAll('category')
  
  const path = usePathname()
  const { selectedImages, setSelectedImages } = useSelcetedImages()
  const { setActiveView, setActiveControls } = useNavigator()
  const [isLoading, setIsLoading] = useState(true);
  const {setSingleApp} = usePlatform()
  const id = path.split('/search/')[1]
  const platform = getPlatformById(id)
  let filterQuery = `platform = ${platform}`

  useEffect(() => {   
    if (Array.isArray(components) && components.length > 0) {
      filterQuery = filterQuery + ` AND components IN [${components.map(el => `'${el}'`).join(',')}]`;
    }
  
    if (Array.isArray(tag) && tag.length > 0) {
      filterQuery = filterQuery + ` AND tags IN [${tag.map(el => `'${el}'`).join(',')}]`;
    }
  
    if (Array.isArray(category) && category.length > 0) {
      filterQuery = filterQuery + ` AND app.categories IN [${category.map(el => `'${el}'`).join(',')}]`;
    }
  }, [])


  useEffect(() => {
    if (selectedImages.images.length > 0) {
      setActiveControls('selection')
    } else {
      setActiveControls('filters')
    }
  }, [selectedImages])

  const { filters, setSearchKeyword, setFilters } = useContentDiscovery();
  const { platforms, setSelected, setPlatforms } = usePlatform();

  useEffect(() => {
    setActiveView('menuWithSearch')
    setActiveControls('filters')
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
    setSingleApp('search')

    return () => {
      setSelectedImages({ appName: '', images: [] })
      setActiveControls('')
      setFilters([])
      setSingleApp('')
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
  }, [params])
  
  
  const loadMore = useCallback(() => {
    return setTimeout(async () => {
      setIsLoading(true)
      // Load more stream items
      async function getData() {
        const req = await fetch('/api/search/get-screens', {
          method: 'POST',
          body: JSON.stringify({
            token: getToken(),
            keyword,
            filters: `platform = ${platform}`,
            offset: data?.length,
            limit: 10
          })
        })
        const res = await req.json()
        const shuffledData = shuffle(res.screens)
        setdata(prev => [...prev , ...shuffledData])
      }
      getData()
      setIsLoading(false)
    }, 500);
  }, [data]);
  if(data?.length === 0) return <div className=' w-full h-full flex justify-center items-center'>there is no screens with this filters</div>
  return (
    <>
      {data !== null && data?.length !== 0 &&
        <VirtuosoGrid
          className="mt-6 max-w-[90%] mx-auto"
          useWindowScroll
          endReached={loadMore}
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
              <SingleScreen screen={data?.screen} />
            );
          }}
          components={{
            Footer: () => {
              return (
                <>
                  <div
                    className="pt-10 pb-48 text-center text-slate-500"
                  >
                    {isLoading &&
                      "Loading More"
                    }
                    {!isLoading &&
                      "End Reached"
                    }
                  </div>
                </>
              )
            },
          }}
        />
        
      }
    </>
  )
}

export default page
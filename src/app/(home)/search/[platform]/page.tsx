'use client'
import ScreenActions from '@/app/(static)/app/[platform]/[slug]/ScreenActions'
import ScreenDetails from '@/components/ScreenDetails'
import SingleScreen, { mergeScreenUrl } from '@/components/screen/SingleScreen'
import Image from "next/image"
import { useContentDiscovery } from '@/context/useContentDiscovery'
import { useDialog } from '@/context/useDialog'
import { useNavigator } from '@/context/useNavigatiorContext'
import { useSelcetedImages } from '@/lib/SelectedToDownload'
import { getToken } from '@/lib/auth'
import { usePlatform } from '@/context/usePlatforms'
import { cn, getPlatformById, shuffle } from '@/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useCallback } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import { AnimatePresence, motion } from 'framer-motion'
import Screen from '@/components/ui/Screen'
import Icons from '@/components/Icons'
import AppActions from '@/app/(static)/app/[platform]/[slug]/AppActions'
import StreamLoader from '@/components/StreamLoader'
import useKeyboardNavigation from '@/hooks/useKeyboardNavigation'



export default function SearchPage() {

  const [openScreen, setOpenScreen] = useState<any | null>();
  const params = useSearchParams()
  const keyword = params.get('q')
  const components = params.getAll('component')
  const tag = params.getAll('tag')
  const category = params.getAll('category')
  const path = usePathname()
  const { selectedImages, setSelectedImages } = useSelcetedImages()
  const { setActiveView, setActiveControls } = useNavigator()
  const [isLoading, setIsLoading] = useState(true);
  const { setSingleApp } = usePlatform()
  const { showDialog, DIALOG_ENUM } = useDialog();
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
    const token = getToken()
    if (!token) { showDialog(DIALOG_ENUM.ACCESS); }
  }, [])


  useEffect(() => {
    if (selectedImages.images.length > 0) {
      setActiveControls('selection')
    }
  }, [selectedImages])

  const { streamData, setStreamData, setSearchKeyword, setFilters } = useContentDiscovery();
  const { selected, setSelected, setPlatforms } = usePlatform();

  const activeScreenIndex = useKeyboardNavigation(streamData.length);

  useEffect(() => {
    if (openScreen) {
      setOpenScreen(streamData[activeScreenIndex]);
    }
  }, [activeScreenIndex, streamData]);

  useEffect(() => {
    setActiveView('menuWithSearch')
    setActiveControls('menu-search')
    setSearchKeyword(keyword)
    setPlatforms([2, 1, 3]); // Initialize Platform Switcher
    setSelected(parseInt(platform))
    // Set the new filters
    const newFilters = [
      ...components.map(el => {
        return {
          type: 'component',
          tag: el
        }
      }),
      ...tag.map(el => {
        return {
          type: 'tag',
          tag: el
        }
      }),
      ...category.map(el => {
        return {
          type: 'category',
          tag: el
        }
      }),
    ]
    setFilters(newFilters);
    setSingleApp('search')

    return () => {
      setSelectedImages({ appName: '', images: [] })
      setActiveControls('')
      setFilters([])
      setSingleApp('')
      setActiveView('')
    }
  }, [])

  async function getData() {
    setIsLoading(true)
    const req = await fetch('/api/search/get-screens', {
      method: 'POST',
      body: JSON.stringify({
        token: getToken(),
        keyword,
        filters: filterQuery,
        offset: streamData?.length,
        limit: 10
      })
    })
    const res = await req.json()
    const shuffledData = shuffle(res.screens)
    setStreamData(shuffledData)
    setIsLoading(false)
  }

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        setStreamData([]);
      },);
    }
  }, [selected, params]);

  useEffect(() => {
    if (streamData.length === 0) {
      getData()
    }
  }, [streamData])


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
            filters: filterQuery,
            offset: streamData?.length,
            limit: 10
          })
        })
        const res = await req.json()
        const shuffledData = shuffle(res.screens)
        setStreamData(prev => [...prev, ...shuffledData])
      }
      getData()
      setIsLoading(false)
    }, 500);
  }, [streamData]);

  if (!isLoading && streamData?.length === 0) return <div className=' w-full h-full flex justify-center items-center'>there is no screens with this filters</div>

  if (streamData.length <= 0 || isLoading) return (
    <div className="mx-auto max-w-[92%]">
      <StreamLoader />
    </div>
  )

  return (
    <main className="w-full flex flex-col items-center">
      {streamData !== null && streamData?.length !== 0 &&
        <VirtuosoGrid
          className="mt-6 max-w-[90%] mx-auto"
          useWindowScroll
          endReached={loadMore}
          data={streamData && streamData}
          style={{ minHeight: 100, width: "100%" }}
          listClassName={cn(
            "grid content-center gap-6 pt-0 grid-cols-2",
            +platform === 3
              ? "2xl:grid-cols-3 md:grid-cols-3"
              : " 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4"
          )}
          totalCount={streamData && streamData?.length}
          overscan={10}
          itemContent={(index, data) => {
            return (
              <SingleScreen screen={data?.screen} appName={data.app?.name} tagLine={data.app?.tag_line} setOpen={() => setOpenScreen(data)} icon={data.app?.icon} />
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
      <AnimatePresence>
        {openScreen && (
          <>
            <motion.div
              className="fixed top-0 w-full h-[100vh] backdrop-blur-md bg-slate-900/70 z-50 flex items-center justify-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ScreenActions appName={openScreen.app.name} screen={openScreen.screen} />
              <motion.div className="flex flex-wrap justify-center items-center z-[100] w-fit mx-auto h-full gap-10 relative" >
                <ScreenDetails screenId={openScreen.id} />
                <Screen
                  src={openScreen.screen}
                  quality={50}
                  className="rounded-2xl h-[90%] w-auto bg-slate-900/80"
                />
              </motion.div>
              <motion.div
                onClick={() => setOpenScreen(null)}
                className={
                  "w-[100%] h-[100%] fixed top-0 bg-transparent"
                }
              ></motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}

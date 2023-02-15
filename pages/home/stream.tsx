import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import Screen from "../../components/screen";
import StreamLoader from "../../components/streamLoader";
import { GlobalContext } from "../../lib/globalContext";
import { supabase } from "../../lib/supabase";
import Showcase from "./showcase";

const perPage = 10;

const Stream = () => {
  const [maxPages, setMaxPages] = useState(2);
  let randomPage = Math.floor(Math.random() * maxPages) + 1;
  const [loadedPages, setLoadedPages] = useState([randomPage]);

  const platform = useContext(GlobalContext)?.platform;

  const {
    isLoading,
    isError,
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    remove,
    refetch,
  } = useInfiniteQuery(
    ["stream"],
    ({ pageParam = [randomPage, platform] }) => fetchStream(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length >= maxPages) return undefined;
        return Math.floor(Math.random() * maxPages) + 1;
      },
      refetchOnWindowFocus: false,
      keepPreviousData: false,
      optimisticResults: true,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
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

  useEffect(() => {
    // console.log(maxPages)
    remove();
    refetch();
  }, [maxPages]);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.7,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    console.log("data :", data?.pages.length);
    console.log(isFetching);
    console.log("loaded Pages: ", loadedPages);
    if (!hasNextPage) {
      setLoadedPages([]);
    }
    if (inView && status == "success") {
      if (!isFetching && hasNextPage) {
        console.log("scroll happend here");
        const nextPage = Math.floor(Math.random() * maxPages) + 1;
        if (!loadedPages.includes(nextPage)) {
          setLoadedPages([...loadedPages, nextPage]);
          try {
            fetchNextPage({ pageParam: [nextPage, platform] });
          } catch (error) {
            console.error("fetchNextPage Error: ", error);
          }
        }
      }
    }
  }, [status, isFetching, hasNextPage, inView]);
  const [selected, setSelected] = useState<any>(null);

  if (isLoading) return <p className="text-white text-lg">Loading...</p>;

  return (
    <>
      <motion.div
        layoutScroll
        className="scrollbar-rounded w-[80%] lg:w-[80%] grid gap-4 lg:gap-5 xl:gap-6 xxl:gap-9 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 xxl:grid-cols-6 mb-10 text-white"
      >
        {data &&
          data?.pages.map((page: any[], pageIndex) =>
            page.map((application, index) => {
              // const shuffledApplication = application ? shuffle(application) : null;
              return (
                <motion.div
                  layout
                  key={application.id}
                  layoutId={application.id}
                  onClick={() => setSelected(application)}
                >
                  <Screen
                    platform={1}
                    app={application}
                    list={application.showcase}
                  />
                </motion.div>
              );
            })
          )}
      </motion.div>
      {data && (
        <div>
          <button
            className="mb-[15vh] text-white"
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <StreamLoader />
            ) : hasNextPage ? (
              "Load More ..."
            ) : (
              "Nothing more to load"
            )}
          </button>
        </div>
      )}
      <AnimatePresence>
        {selected && <Showcase selected={selected} setSelected={setSelected} />}
      </AnimatePresence>
    </>
  );
};

export default Stream;

const fetchStream = async (page: any, maxAttempts = 3) => {
  let data, error;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const from = perPage * (page[0] - 1);
      const to = perPage * page[0];
      const plat = page[1];

      if (plat) {
        switch (plat) {
          case 1:
            ({ data, error } = await supabase
              .from("android_showcases")
              .select("*")
              .range(from + 1, to));
            break;
          case 2:
            ({ data, error } = await supabase
              .from("ios_showcases")
              .select("*")
              .range(from + 1, to));
            break;
          case 4:
            ({ data, error } = await supabase
              .from("web_showcases")
              .select("*")
              .range(from + 1, to));
            break;
          default:
            throw new Error("Invalid platform");
        }
      }
      break;
    } catch (e) {
      error = e;
      attempts++;
    }
  }

  data?.sort(() => Math.random() - 0.5);

  if (data) {
    return data;
  } else if (error) {
    throw error;
  }
  throw new Error("Failed to fetch stream after maximum attempts");
};

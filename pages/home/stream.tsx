import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Screen from "../../components/screen";
import { GlobalContext } from "../../lib/globalContext";
import { supabase } from "../../lib/supabase";
import Showcase from "./showcase";

const perPage = 10;

const Stream = () => {
  const [maxPages, setMaxPages] = useState(2);
  let randomPage = Math.floor(Math.random() * maxPages) + 1;
  const [loadedPages, setLoadedPages] = useState([randomPage]);

  const globalContext = useContext(GlobalContext);
  const platform = globalContext?.platform;

  const {
    isLoading,
    isError,
    data,
    error,
    isFetching,
    isSuccess,
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
      if (platform) {
        const { error, count } = await supabase
          .from("random_showcases")
          .select("id", { count: "exact" })
          .eq("platform_id", platform);
        if (error) console.error("max error: ", error);

        if (count) {
          const x = Math.ceil(count / perPage);
          setMaxPages(x);
        }
      }
    };
    fetchMaxPages();
  }, [platform]);

  useEffect(() => {
    // console.log(maxPages)
    remove()
    refetch()
  }, [maxPages]);

  useEffect(() => {
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;
      // console.log(isSuccess)
      if (!isFetching && clientHeight + scrollTop >= scrollHeight) {
        if (hasNextPage) {
          let nextPage = Math.floor(Math.random() * maxPages) + 1;
          while (loadedPages.includes(nextPage)) {
            nextPage = Math.floor(Math.random() * maxPages) + 1;
          }
          setLoadedPages([...loadedPages, nextPage]);
          await fetchNextPage({ pageParam: [nextPage, platform] });
        }
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [isFetching]);

  const [selected, setSelected] = useState<any>(null);

  // function shuffle(array: any[]) {
  //     return array.sort(() => Math.random() - 0.5);
  // }
  // const shuffledPages = data ? shuffle(data.pages) : null;

  if (isLoading) return <p>Loading...</p>;

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
      <AnimatePresence>
        {selected && <Showcase selected={selected} setSelected={setSelected} />}
      </AnimatePresence>
    </>
  );
};

export default Stream;

const fetchStream = async (page: any) => {
  const from = perPage * (page[0] - 1);
  const to = perPage * page[0];
  // console.log('from:', from, 'to: ', to);
  // console.log("page: ", page);

  const { data, error } = await supabase
    .from("random_showcases")
    .select("*")
    .eq("platform_id", page[1])
    .range(from + 1, to);

  data?.sort(() => Math.random() - 0.5);
  // console.log(data);

  if (data) {
    return data;
  }
  throw new Error("Failed to fetch stream");
};

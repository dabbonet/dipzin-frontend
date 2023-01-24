import { ReactElement, useState, useRef, useEffect, useContext } from "react";
import { NextPage } from "next";
import Screen from "../../components/screen";
import cn from "../../components/helpers";
import Navigator from "../../components/navigator/main";
import TimedUpgrade from "../../components/modals/timedUpgrade";
import Collections from "../collection/collections";
import Stream from "./stream";
import { useQuery, useQueryClient } from 'react-query'
import { motion } from "framer-motion";
import { GlobalContext } from "../../lib/globalContext";

const Page: NextPage = () => {
  const globalContext = useContext(GlobalContext)
  //initialeze the platform
  useEffect(() => {
    globalContext?.setPlatform("ios")
  }, [])
  const platform = globalContext?.platform
  const [streamOpen, setStreamOpen] = useState<string>("stream");
  const [webScreenOpen, setWebScreenOpen] = useState<boolean>(false);



  const webImages = [
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/65692a13-8749-4ccf-8f94-8b62e99d0788.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/ba2780b8-ce7f-4d65-8e18-f6358d544733.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/9d105252-4222-483a-b90d-d4f898e41bd0.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/992731cb-7023-4058-af52-0cd1fad83bea.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/26e8ddc8-fd7f-4364-9a79-950dedb84d3a.png"
  ]

  const queryClient = useQueryClient()
  const handleRefetch = async () => {
    await queryClient.invalidateQueries('stream');
  }

  return (
    <>
      {/* <TimedUpgrade /> */}
      <Navigator />
      <main className="w-full flex flex-col items-center">
        <div className="lg:w-[75%] max-w-[75%] mt-[110px] rounded-[42px]">
          <img
            className="h-auto w-full"
            src="/images/assets/banner.png"
            alt="banner"
          />
        </div>

        <div className="lg:w-[75%] w-[85%] flex mt-10 mb-[25px]">
          <a className="cursor-pointer duration-500 flex items-center">
            <span
              onClick={() => {
                setStreamOpen("stream");
              }}
              className={` ${streamOpen == "stream"
                ? "text-white lg:text-[3rem] text-[2rem] font-light"
                : "text-gray-400 lg:text-[2.5rem] text-[1.5rem] opacity-70 font-light"
                } transform transition duration-500 `}
            >
              Stream
            </span>
            {streamOpen == "stream" && (
              <motion.div
                onClick={handleRefetch}
                whileHover={{ rotate: 90 }}
                whileTap={{
                  rotate: 360,
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                className="ml-3"
              >
                <img
                  className=" w-8"
                  src="/images/assets/refresh.svg"
                />
              </motion.div>
            )}
          </a>
          <a className="cursor-pointer flex items-center">
            <span
              onClick={() => {
                setStreamOpen("collection");
              }}
              className={` ${streamOpen == "collection"
                ? "text-white lg:text-[3rem] text-[2rem] font-light"
                : "text-gray-400 lg:text-[2.5rem] text-[1.5rem] opacity-70 font-light"
                } transform transition duration-500  ml-12 `}
            >
              Collections
            </span>
            {streamOpen == "collection" && (
              <img
                className="ml-3 transorm duration-[600ms] hover:rotate-90"
                src="/images/assets/refresh.svg"
              />
            )}
          </a>
        </div>

        {streamOpen == "stream" ? (
          <>
            {platform == "web" ? (
              <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-4 lg:gap-5 gap-5 mb-10 grid-cols-2">

                <div
                  className="flex justify-center items-center relative group/item cursor-pointer"
                  onClick={() => {
                    setWebScreenOpen(true);
                  }}
                >
                  <Screen platform={3} list={webImages} />
                </div>

                <Screen platform={3} list={webImages} />
                <Screen platform={3} list={webImages} />
                <Screen platform={3} list={webImages} />
                <Screen platform={3} list={webImages} />
                <Screen platform={3} list={webImages} />
                <Screen platform={3} list={webImages} />
                <Screen platform={3} list={webImages} />
                <Screen platform={3} list={webImages} />
                <Screen platform={3} list={webImages} />
              </div>
            ) : (
              <Stream />
            )}
          </>
        ) : (
          <Collections />
        )}

        <div
          className={cn(
            'duration-500 w-[110%] h-[100%] transition-all z-40 overflow-y-scroll pt-40',
            webScreenOpen
              ? 'backdrop-blur-xl fixed bg-[#0D1018]/70 block'
              : 'backdrop-blur hidden'
          )}
          onClick={() => {
            setWebScreenOpen(false);
          }}
        >
          {webScreenOpen && (
            <div
              className={cn(
                ' duration-1000 transition-all flex flex-col w-[80%] lg:w-[75%] mx-auto',
                webScreenOpen
                  ? 'scale-100'
                  : 'scale-90'
              )}
            >
              <div className="my-8 flex items-center text-white z-50">
                <img
                  className="h-[48px] rounded-2xl bg-slate-500"
                  src="/images/assets/appicon.svg"
                />
                <div className="ml-4">
                  <span className="text-[32px] font-medium">Hollister</span>
                  <span className="block text-[16px] text-[#8F94A1]">
                    Fashion & Fitness
                  </span>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 lg:gap-[60px] gap-10 grid-cols-1 z-50">
                <Screen platform={3} list={webImages} />
                <Screen platform={3} list={webImages} />
                <Screen platform={3} list={webImages} />
                <Screen platform={3} list={webImages} />
                <Screen platform={3} list={webImages} />

              </div>
            </div>
          )}
        </div>

      </main>
    </>
  );
};
export default Page;

import { ReactElement, useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import Screen from "../../components/screen";
import cn from "../../components/helpers";
import Navigator from "../../components/navigator";
import TimedUpgrade from "../../components/modals/timedUpgrade";
import Collections from "../collection";

const Page: NextPage = () => {
  const [platform, setPlatform] = useState<string>("IOS");

  const [tabStream, setTabStream] = useState<boolean>(true);



  const [streamOpen, setStreamOpen] = useState<string>("stream");

  const [screenOpen, setScreenOpen] = useState<boolean>(false);
  const [webScreenOpen, setWebScreenOpen] = useState<boolean>(false);



  const webImages = [
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/65692a13-8749-4ccf-8f94-8b62e99d0788.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/ba2780b8-ce7f-4d65-8e18-f6358d544733.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/9d105252-4222-483a-b90d-d4f898e41bd0.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/992731cb-7023-4058-af52-0cd1fad83bea.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/26e8ddc8-fd7f-4364-9a79-950dedb84d3a.png"
  ]
  const mobileImages = [
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/5064be39-8584-4bfc-ad7e-b9d0a06cd5b9.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/619/42855630-fe26-46ae-b248-e09a62f8b8d6.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/731/5769262d-f575-438f-884a-200cef298f6e.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/728/545daa87-efdc-4f92-a970-4ded077805a8.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/e237b8fa-192f-47ad-ac6b-370330b5ba38.png"
  ]
  return (
    <>
      {/* <TimedUpgrade /> */}
      <Navigator />

      <header className="w-full flex justify-between fixed items-center text-white mt-8 px-10 z-10">
        <div className="text-2xl">
          <span className="font-semibold">
            dipz<span className="font-light">in</span>
            <span className="text-orange-500">.</span>
          </span>
        </div>

        <div className="w-[250px] bg-[#1B2132] rounded-[40px] flex items-center px-1 text-sm font-light py-[8px]">
          <div
            onClick={() => {
              setPlatform("IOS");
            }}
            className={`${platform == "IOS" && "bg-slate-700"
              }  py-[3px] px-[12px] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
          >
            <span>IOS</span>
          </div>
          <div
            onClick={() => {
              setPlatform("Android");
            }}
            className={`${platform == "Android" && "bg-slate-700"
              }  py-[3px] px-[12px] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
          >
            <span>Android</span>
          </div>
          <div
            onClick={() => {
              setPlatform("Web");
            }}
            className={`${platform == "Web" && "bg-slate-700"
              }  py-[3px] px-[12px] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
          >
            <span>Web</span>
          </div>
        </div>

        <div className="w-[65px] h-[35px] bg-slate-300 rounded-full flex items-center justify-center text-sm font-normal text-slate-800">
          <a href="/auth">Try it!</a>
        </div>
      </header>

      <main className="w-full flex flex-col items-center">
        <div className="lg:w-[75%] max-w-[75%] mt-[110px] rounded-[42px]">
          <img
            className="h-auto w-full"
            src="/images/assets/banner.svg"
            alt="banner"
          />
        </div>

        <div className="w-[75%] flex mt-10 mb-[25px]">
          <a className="cursor-pointer flex items-center">
            <span
              onClick={() => {
                setStreamOpen("stream");
              }}
              className={` ${streamOpen == "stream"
                ? "text-white text-[3rem] font-light"
                : "text-gray-400 text-[2.5rem] opacity-70 font-light"
                } transform transition duration-500 `}
            >
              Stream
            </span>
            {streamOpen == "stream" && (
              <img
                className="ml-3 transform duration-[600ms] hover:rotate-90"
                src="/images/assets/refresh.svg"
              />
            )}
          </a>
          <a className="cursor-pointer flex items-center">
            <span
              onClick={() => {
                setStreamOpen("collection");
              }}
              className={` ${streamOpen == "collection"
                ? "text-white text-[3rem] font-light"
                : "text-gray-400 text-[2.5rem] opacity-70 font-light"
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
            {platform == "Web" ? (
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
              <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-6 lg:gap-5 gap-5 mb-10 grid-cols-2">
                <div
                  className="flex justify-center items-center relative group/item cursor-pointer"
                  onClick={() => {
                    setScreenOpen(true);
                  }}
                >
                  <Screen platform={1} list={mobileImages} />
                </div>
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
              </div>
            )}
          </>
        ) : (
          <Collections />
        )}


        <div
          className={cn(
            ' duration-500 w-[110%] h-[100%] transition-all z-40 overflow-y-scroll pt-40',
            screenOpen
              ? 'backdrop-blur-xl fixed bg-[#0D1018]/70 block'
              : 'backdrop-blur hidden'
          )}
          onClick={() => {
            setScreenOpen(false);
          }}
        >
          {screenOpen && (
            <div
              className={cn(
                'duration-1000 transition-all flex flex-col w-[80%] lg:w-[75%] mx-auto',
                screenOpen
                  ? 'scale-100'
                  : 'scale-90'
              )}
            >
              <div className="flex my-8 items-center text-white z-50">
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
              <div className="grid lg:grid-cols-5 lg:gap-10 gap-10 grid-cols-2 ml-auto mr-auto z-50">
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
                <Screen platform={1} list={mobileImages} />
              </div>
            </div>
          )}
        </div>



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

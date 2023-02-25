import Link from "next/link";
import Router from "next/router";
import React, { useContext } from "react";
import { GlobalContext } from "../lib/globalContext";

const Header = () => {
  const globalContext = useContext(GlobalContext);
  const platform = globalContext?.platform;
  const show = globalContext?.show;
  const single = globalContext?.single;

  const getPlatform = (platform_id: any) => {
    let platform;
    switch (platform_id) {
      case 1:
        platform = "android";
        break;
      case 2:
        platform = "ios";
        break;
      case 3:
        platform = "web";
        break;
    }
    return platform;
  };

  return (
    <header className="w-full flex justify-between fixed items-center text-white mt-8 px-5 lg:px-10 z-10 top-0 cursor-pointer">
      <span
        onClick={() => {
          Router.push("/");
        }}
        className="text-lg lg:text-2xl"
      >
        <span className="font-semibold">
          dipz<span className="font-light">in</span>
          <span className="text-orange-500">.</span>
        </span>
      </span>

      {show && (
        <div className="bg-[#1B2132] rounded-[40px] flex items-center p-2  lg:text-sm text-xs font-light space-x-4">
          {globalContext?.availablePlatforms.map((platformAvailable, index) => (
            <div
              onClick={() => {
                if (!single) {
                  globalContext.setPlatform(platformAvailable.id);
                } else {
                  Router.push(
                    {
                      pathname: "/application/[platform]/[slug]",
                      query: {
                        platform: getPlatform(platformAvailable.id),
                        slug: Router.query.slug,
                      },
                    },
                    undefined,
                    { shallow: false }
                  );
                }
              }}
              key={index}
              className={`${
                platform == platformAvailable.id && "bg-slate-700"
              }  py-[0.3rem] px-[0.7rem] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
            >
              <span className="uppercase">{platformAvailable.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="w-[65px] h-[35px] bg-slate-300 rounded-full flex items-center justify-center md:text-sm text-xs font-normal text-slate-800">
        <Link href="/access" shallow>Try it!</Link>
      </div>
    </header>
  );
};

export default Header;

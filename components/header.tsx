import React, { useContext } from 'react'
import { GlobalContext } from '../lib/globalContext'

const Header = () => {

  const globalContext = useContext(GlobalContext)
  const platform = globalContext?.platform
  console.log('platform', platform)

  return (
    <header className="w-full flex justify-between fixed items-center text-white mt-8 px-5 lg:px-10 z-10">
      <div className="text-lg lg:text-2xl">
        <span className="font-semibold">
          dipz<span className="font-light">in</span>
          <span className="text-orange-500">.</span>
        </span>
      </div>

      {platform && (
        <div className="lg:w-[250px] bg-[#1B2132] rounded-[40px] flex items-center py-2  lg:text-sm text-xs font-light">
          <div
            onClick={() => {
              globalContext.setPlatform("ios");
            }}
            className={`${platform == "ios" && "bg-slate-700"
              }  py-[0.3rem] px-[0.7rem] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
          >
            <span>IOS</span>
          </div>
          <div
            onClick={() => {
              globalContext.setPlatform("android");
            }}
            className={`${platform == "android" && "bg-slate-700"
              }  py-[0.3rem] px-[0.7rem] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
          >
            <span>Android</span>
          </div>
          <div
            onClick={() => {
              globalContext.setPlatform("web");
            }}
            className={`${platform == "web" && "bg-slate-700"
              }  py-[0.3rem] px-[0.7rem] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
          >
            <span>Web</span>
          </div>
        </div>
      )}

      <div className="w-[65px] h-[35px] bg-slate-300 rounded-full flex items-center justify-center md:text-sm text-xs font-normal text-slate-800">
        <a href="/auth">Try it!</a>
      </div>
    </header>
  )
}

export default Header
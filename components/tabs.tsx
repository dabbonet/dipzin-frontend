import React from 'react'
import clsx from 'clsx'

type Tab = {
  tabs: string[]
  currentTab: number
  setCurrentTab: (tab: number) => void

}


const tabs = ({ tabs, currentTab, setCurrentTab }: Tab) => {
  return (
    <div>
      <div className="flex mx-2 mt-2 rounded-md bg-gray-100 relative tabs">
        {tabs.map((tab) => (
          <button
            className={clsx(
              "tabs-item relative z-10 py-1 my-2 ml-2 text-center rounded-md w-full text-sm cursor-pointer select-none focus:outline-none",
              {
                tab === "light"
                  }
                )}
        onClick={() => {
          setCurrentTab(currentTab)
        }}
              >
        Light
      </button>
            )}


      <span
        className={clsx("tab-item-animate rounded-md bg-white", {
          active: app === "system"
        })}
      ></span>
    </div>
    </div >
  )
}

export default tabs
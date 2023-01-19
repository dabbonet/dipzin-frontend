import React, { useEffect } from 'react'
import clsx from 'clsx'

type Tab = {
  tabs: string[]
  currentTab: string
  setCurrentTab: (tab: string) => void

}


const Tabs = ({ tabs, currentTab, setCurrentTab }:Tab) => {

    return (
      <>
        <div className="w-[250px] bg-[#1B2132] rounded-[40px] flex items-center px-1 text-base font-light py-2">
            {tabs.map((tab, index) => (
                  <button
                    onClick={() => {
                        setCurrentTab(tab);
                    }}
                    className={`${currentTab == tab && "bg-slate-700"
                      }  py-[3px] px-[12px] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
                  >
                    <span>{tab}</span>
                  </button>
                  
                ))}
          
        </div>
      </>
    );
  };

  export default Tabs;
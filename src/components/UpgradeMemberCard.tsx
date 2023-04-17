import React, { useEffect, useState } from "react";
import Icons from "./Icons";
import { cn } from "@/lib/utils";
import { useDialog } from "@/context/useDialog";

function time_convert(num) {
  const totalSeconds = Math.floor(num / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds}`;
}

const UpgradeMemberCard = () => {
  const { setVisible, setTimes, setIncremental, counter, visible } = useDialog();

  useEffect(() => {
    setIncremental(true)
    setVisible(true)
  }, [])

  if (!visible) return
  return (
    <div>
      <div className=" bg-slate-900 rounded-3xl p-10 flex flex-col gap-5">
        <div className=" flex justify-between items-start">
          <div className=" flex gap-14 flex-wrap items-center">
            <button className=" bg-orange-600 text-slate-100 rounded-lg py-2 px-6">
              Unlock More!
            </button>
          </div>
          <div>
            {time_convert(counter)}
          </div>
          <button>
            {/* <Icons.XCircle className={cn('w-6 h-6', activeButton ? 'text-slate-100 hover:text-slate-300' : 'text-slate-700')} /> */}
          </button>
        </div>
        <h3 className=" text-slate-200 text-2xl font-medium">
          Upgrade and get access to exclusive features
        </h3>

        <div className=" flex gap-14 flex-wrap">
          <div className=" flex gap-2">
            <img src="/images/assets/Vector.svg" alt="" />
            <p className=" text-white font-medium text-lg">
              Download in Bulk
            </p>
          </div>
          <div className="flex gap-2">
            <img src="/images/assets/Vector.svg" alt="" />
            <p className=" text-white font-medium text-lg">
              Download in Bulk
            </p>
          </div>
        </div>

        <div className=" flex gap-14 flex-wrap">
          <div className=" flex gap-2">
            <img src="/images/assets/Vector.svg" alt="" />
            <p className=" text-white font-medium text-lg">
              Download in Bulk
            </p>
          </div>
          <div className=" flex gap-2">
            <img src="/images/assets/Vector.svg" alt="" />
            <p className=" text-white font-medium text-lg">
              Download in Bulk
            </p>
          </div>
        </div>

        <img
          src="/images/assets/banner.png"
          className=" rounded-2xl"
          alt=""
        />
      </div>
    </div>
  )
};

export { UpgradeMemberCard };
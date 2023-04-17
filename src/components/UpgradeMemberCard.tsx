import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Icons from "./Icons";
const UpgradeMemberCard = () => {
  const [activeButton, setActiveButton] = useState(false);
  const [removeComp, setRemoveComp] = useState(false);
  const handleClose = () => {
    if (activeButton) {
      setRemoveComp(true);
    }
  };
  const renderTime = ({ remainingTime }) => {
    return <div className=" text-orange-600 text-5xl">{remainingTime}</div>;
  };
  return (
    !removeComp && (
      <div>
        <div className=" bg-slate-900 rounded-3xl p-10 flex flex-col gap-5">
          <div className=" flex justify-between items-start">
            <div className=" flex gap-14 flex-wrap items-center">
              <CountdownCircleTimer
                duration={10}
                colors="#FB923C"
                isPlaying
                strokeWidth={5}
                children={renderTime}
                onComplete={() => setActiveButton(true)}
              />
              <button className=" bg-orange-600 text-slate-100 rounded-lg py-2 px-6">
                Unlock More!
              </button>
            </div>
            <button onClick={handleClose}>
              <Icons.XCircle className={cn(activeButton) } />
            </button>
          </div>
          <h3 className=" text-slate-200 text-2xl font-medium">
            Upgrade and get access to exclusive features
          </h3>
          <div className=" flex gap-14 flex-wrap">
            <div className=" flex gap-2">
              <img src="/images/assets/Vector.svg" alt="" />
              <p className=" text-white font-medium text-3xl">
                Download in Bulk
              </p>
            </div>
            <div className=" flex gap-2">
              <img src="/images/assets/Vector.svg" alt="" />
              <p className=" text-white font-medium text-3xl">
                Download in Bulk
              </p>
            </div>
          </div>
          <div className=" flex gap-14 flex-wrap">
            <div className=" flex gap-2">
              <img src="/images/assets/Vector.svg" alt="" />
              <p className=" text-white font-medium text-3xl">
                Download in Bulk
              </p>
            </div>
            <div className=" flex gap-2">
              <img src="/images/assets/Vector.svg" alt="" />
              <p className=" text-white font-medium text-3xl">
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
  );
};

export default UpgradeMemberCard;

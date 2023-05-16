import React, { useEffect, useState } from "react";
import Icons from "./Icons";
import { cn } from "@/lib/utils";
import { useDialog } from "@/context/useDialog";
import SparkleButton from "@/ui/SparkleButton";
import AccessComponent from "./AccessComponent";
import { toast } from "react-hot-toast";
import { setToken, SignIn, verifyOtp } from "@/lib/auth";
import OtpAccessComponent from "./OtpAccessComponent";
import { useRouter } from "next/navigation";

function formatTime(seconds: number): string {
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${secs}s`;
}


export const AccessOrUpgradeCard = () => {
  if (localStorage.getItem('token')) { 
    return  <UpgradeMemberCard/>
  }
  return <div className=" fixed w-full h-full inset-0 bg-opacity-20 bg-gradient-to-tr from-[#0D1018] to-[] backdrop-blur-[30px]  flex justify-center items-center z-50">
    <div className=" w-fit h-fit bg-slate-900 bg-opacity-60 rounded-2xl px-16 py-20">
      <AccessCard/>
    </div>
  </div>
}


const AccessCard = () => {
  
  

  return <AccessComponent/>
}








const UpgradeMemberCard = () => {
  const [show, setShow] = useState<boolean>(false)
  const { counter, visible } = useDialog();

  useEffect(() => {
    visible && setShow(visible)
  }, [visible])

  if (!show) return
  return (
    <div className="w-[100%] h-[100%] fixed inset-0 bg-opacity-50 bg-[#0D1018] backdrop-blur-xl  flex justify-center items-center z-50">
      <div className="max-w-2xl bg-slate-900 rounded-3xl p-10 flex flex-col gap-5">
        <div className="flex justify-between items-start">

          <div className="flex space-x-4">
            <h1 className="text-orange-500 text-3xl">
              Please Wait {formatTime(counter)} <b className="text-white mx-4">or</b>
            </h1>
            <div className=" flex gap-14 flex-wrap items-center">
              <SparkleButton href="/pricing">
                Unlock More!
              </SparkleButton>
            </div>
          </div>

          <button
            onClick={() => {
              if (!visible) setShow(false)
            }}
            className={cn(visible ? 'text-slate-700 pointer-events-none' : 'text-slate-100 hover:text-orange-500')}
          >
            <Icons.XCircle className='w-6 h-6' />
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


'use client'
import React, { FC, useEffect, useRef, useState } from "react";
import Icons from "./Icons";
import { cn } from "@/lib/utils";
import { useDialog } from "@/context/useDialog";
import SparkleButton from "@/ui/SparkleButton";
import AccessComponent from "./AccessComponent";
import { getUser } from "@/lib/auth";


function formatTime(seconds: number): string {
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${secs}s`;
}


export const AccessOrUpgradeCard = () => {
  const [isUserAuth, setisUserAuth] = useState(false)
  useEffect(() => {
    async function isUserAuthenticated() {
      if (await getUser()) { 
        setisUserAuth(true);
      }
    }
    isUserAuthenticated()
  }, [])
  if (isUserAuth) { 
    return  <UpgradeMemberCard/>
  }
  return <AccessCard />
    
}


const AccessCard = () => {
  const ref = useRef()
  const [show, setShow] = useState<boolean>(false)
  const { visibleNoAuth } = useDialog();
  useEffect(() => {
    if (visibleNoAuth) {
      setShow(true);
    }else{
      setShow(false);
    }
  }, [visibleNoAuth])
  let in_dom = document.body.contains(ref.current);
  let observer = new MutationObserver(()=> {
    if (document.body.contains(ref.current)) {
        if (!in_dom) {
            console.log("element inserted");
        }
        in_dom = true;
    } else if (in_dom) {
        in_dom = false;
        window.location.reload()
    }
  });
  observer.observe(document.body, {childList: true});
  if (!show) return
  return (
    <div ref={ref} className=" fixed w-full h-full inset-0 bg-opacity-20 bg-gradient-to-tr from-[#0D1018] to-[] backdrop-blur-[30px]  flex justify-center items-center z-50">
      <div className=" w-fit h-fit bg-slate-950 bg-opacity-60 rounded-2xl px-16 py-20">
        <AccessComponent />
      </div>
    </div>
  )
  
}








const UpgradeMemberCard = ({ }) => {
  const ref = useRef()
  const [show, setShow] = useState<boolean>(false)
  const { counter, visible , setCounter } = useDialog();

  useEffect(() => {
    visible && setShow(visible)
  }, [visible])

  const onCloseFunction = () => {
    const baseCounter = 5
    if (!visible) {
      setShow(false)
      setCounter(baseCounter)
    } 
  }
  let in_dom = document.body.contains(ref.current);
  let observer = new MutationObserver(()=> {
    if (document.body.contains(ref.current)) {
        if (!in_dom) {
            console.log("element inserted");
        }
        in_dom = true;
    } else if (in_dom) {
        in_dom = false;
        window.location.reload()
    }
  });
  observer.observe(document.body, {childList: true});
  if (!show) return
  return (
    <div ref={ref} className="w-[100%] h-[100%] fixed inset-0 bg-opacity-50 bg-[#0D1018] backdrop-blur-xl  flex justify-center items-center z-50">
      <div className="max-w-2xl bg-slate-900 rounded-3xl  flex flex-col gap-5">
        <img
          src="/images/assets/banner.png"
          className=" rounded-2xl"
          alt=""
        />

        <h3 className=" text-slate-200 text-2xl font-medium px-10">
          Upgrade and get access to exclusive features
        </h3>
        <div className=" px-10">
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
        </div>

        <div className="flex justify-between items-start px-10">
          <div className="flex space-x-4">
            <span className="text-[#C9FFED] text-sm">
              Invite to Dipzin 💰
            </span>
          </div>

          <button
            onClick={onCloseFunction}
            className={cn(visible ? 'bg-opacity-60' : ' bg-opacity-100' , ' py-2 px-12 bg-gradient-to-tr from-[#14F3C5] to-[#00B390] rounded-lg !bg-opacity-10')}
          >
            Continue in {formatTime(counter)}
          </button>

        </div>

      </div>
    </div>
  )
};


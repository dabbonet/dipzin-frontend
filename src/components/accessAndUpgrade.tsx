'use client'
import React, { useEffect, useRef, useState } from "react";
import { useDialog } from "@/context/useDialog";
import AccessComponent from "./AccessComponent";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
function formatTime(seconds: number): string {
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${secs}s`;
}

export const AccessOrUpgradeCard = () => {
  const { user } = useAuth()
  const { title } = useDialog()
  if (user) {
    return <UpgradeMemberCard title={title} />
  }
  return <AccessCard />

}

const AccessCard = () => {
  const ref = useRef()
  const [show, setShow] = useState<boolean>(false)
  const { visibleNoAuth, setVisibleNoAuth } = useDialog();
  useEffect(() => {
    if (visibleNoAuth) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [visibleNoAuth])
  if (!show) return
  return (
      <AnimatePresence>
        <div ref={ref} className=" fixed w-full h-full inset-0 bg-opacity-20 bg-gradient-to-tr from-[#0D1018] to-[] backdrop-blur-[30px]  flex justify-center items-center z-[100]">
          <div className=" w-fit h-fit bg-slate-900 bg-opacity-60 rounded-2xl px-16 py-20 z-[1000]">
            <AccessComponent />
          </div>
          <motion.div
            onClick={() => setVisibleNoAuth(false)}
            className={
              "w-[100%] h-[100%] fixed top-0 bg-transparent"
            }
          ></motion.div>
        </div>
      </AnimatePresence>
  )

}

export const UpgradeMemberCard = ({ title }) => {
  const [show, setShow] = useState<boolean>(false)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const { counter, visible, setCounter } = useDialog();

  useEffect(() => {
    visible && setShow(visible)
  }, [visible])
  let timer;
  let timeInMillSeconds = 1000
  const onPressButton = () => {
    timer = setTimeout(() => {
      if (timeInMillSeconds === 1000) {
        const baseCounter = 5
        setCounter(baseCounter)
        setShow(false)
        return clearTimeout(timer)
      }
    }, 1000)
  }
  const onLeaveButton = () => {
    clearTimeout(timer)
  }
  const CloseButton = () => {
    if (counter === 0) {
      return <button
        className=" button-trans"
        onMouseDown={onPressButton}
        onMouseUp={onLeaveButton}
      >
        Press & Hold to Close
      </button>
    }
    return <button
      className=' bg-gradient-to-tr text-slate-800 from-[#14F3C5] to-[#00B390] pointer-events-none rounded-lg py-2 px-12'
    >
      Continue in {formatTime(counter)}
    </button>
  }
  const onShowIviteDialog = () => {
    const baseCounter = 5
    setCounter(baseCounter)
    setShow(false)
    setShowInviteDialog(true)
  }
  if (!show) {
    if (showInviteDialog) {
      return <InviteDialog />
    }
    return
  }

  if (!show) return
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
      >

        <div className="w-[100%] h-[100%] fixed inset-0 bg-opacity-50 bg-[#0D1018] backdrop-blur-xl  flex justify-center items-center z-[100]">
          <div className="max-w-3xl bg-slate-900 rounded-3xl  flex flex-col gap-5">
            {/* image */}
            <img
              src="/images/assets/banner.png"
              className=" rounded-2xl"
              alt=""
            />
            {/* header */}
            <div className=" px-10">
              <h3 className=" text-slate-200 text-2xl font-medium mb-2">
                {title}
              </h3>
              <p className=" text-slate-300 text-base">To Continue using your free trial of our premium features, please upgrade to our premium package.</p>
            </div>
            {/* features and price */}
            <div className=" p-4 mx-10 flex bg-slate-800 rounded-2xl items-center gap-x-9 flex-row">
              {/* price */}
              <div className=" bg-[#37FFCF]  rounded-xl py-2 px-4">
                <div className=" w-fit flex flex-col items-center" >
                  <p className=" text-xs text-[#007160] font-medium">Starts at</p>
                  <strong className=" text-[#00342E] font-medium text-2xl">$ 6 /mo</strong>
                  <p className="text-xs text-[#007160] font-medium">billed at $72/yr </p>
                </div>
              </div>
              {/* features */}
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                <div className=" flex items-center gap-2">
                  <img src="/images/assets/check-new-branding.svg" alt="" />
                  <p className=" text-sm">Unlimited Search and Filters</p>
                </div>
                <div className=" flex items-center gap-2">
                  <img src="/images/assets/check-new-branding.svg" alt="" />
                  <p className=" text-sm">Unlimited Collections</p>
                </div>
                <div className=" flex items-center gap-2">
                  <img src="/images/assets/check-new-branding.svg" alt="" />
                  <p className=" text-sm">Bulk Downloads</p>
                </div>
                <div className=" flex items-center gap-2">
                  <img src="/images/assets/check-new-branding.svg" alt="" />
                  <p className=" text-sm">Prioritized Support</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center px-10 mb-8">
              <div className="flex space-x-4">
                <button onClick={onShowIviteDialog} className="text-[#C9FFED] text-sm">
                  Invite to Dipzin 💰
                </button>
              </div>
              <div className=" flex gap-x-4">
                <Link href='/pricing' className=" text-[#C9FFED] text-sm py-2 px-12 bg-transparent border-solid border border-[#C9FFED] rounded-lg">Unlock More!</Link>
                <CloseButton />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
};

const InviteDialog = () => {
  const [inputData] = useState('https://dipzin.com/referra3/username')
  const [closeDialog, setCloseDialog] = useState(false)
  const copyInputData = () => {
    navigator.clipboard.writeText(inputData)
  }
  const skipDialog = () => {
    setCloseDialog(true)
  }
  if (closeDialog) return
  return <div className="w-[100%] h-[100%] fixed inset-0 bg-opacity-50 bg-[#0D1018] backdrop-blur-xl  flex justify-center items-center z-50">
    <div className="max-w-3xl bg-slate-900 rounded-3xl  flex flex-col gap-5 px-32 py-10 items-center ">
      {/* image */}
      <img src="/images/assets/frame-2500.svg" alt="" className=" w-40 h-40" />
      <div className=" flex flex-col items-center mb-4">
        <h1 className=" text-slate-200 text-4xl font-medium mb-2">Invite and get <span className=" text-[#14F3C5]">$20</span> discount</h1>
        <p className=" text-slate-300 text-base text-center">To Continue using your free trial of our premium features, please upgrade to our premium package.</p>
      </div>
      <div className=" w-full relative">
        <input type="text" value={inputData} className=" w-full py-3 px-4 rounded-lg text-sm bg-slate-800 text-[#C9FFED] border border-solid border-[#475569]" />
        <input onClick={copyInputData} type="submit" value='copy' className="text-[#00342E] bg-gradient-to-tr from-[#14F3C5] to-[#00B390] py-1 px-3 rounded-md absolute top-[6px] right-2 cursor-pointer" />
      </div>
      <div className=" w-1/2 ml-auto flex justify-between items-center mt-9">
        <button className=" text-[#C9FFED]" onClick={skipDialog}>skip</button>
        <span>or social share</span>
      </div>
    </div>
  </div>
}


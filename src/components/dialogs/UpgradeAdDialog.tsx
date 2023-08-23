import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { useDialog } from "@/context/useDialog";
import Link from "next/link";

function formatTime(seconds: number): string {
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${secs}s`;
}

const UpgradeAdDialog = ({ title }:{ title?:any }) => {
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
                {title || 'Upgrade and get access to exclusive features'}
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
                {/* <button onClick={onShowIviteDialog} className="text-[#C9FFED] text-sm">
                  Invite to Dipzin 💰
                </button> */}
              </div>
              <div className=" flex gap-x-4">
                <Link href='/pricing' className=" text-[#C9FFED] text-sm py-2 px-12 bg-transparent border-solid border border-[#C9FFED] rounded-lg">Unlock More!</Link>
                {/* <CloseButton /> */}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
};

export default UpgradeAdDialog
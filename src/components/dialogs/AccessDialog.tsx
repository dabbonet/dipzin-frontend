import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion";
import AccessComponent from "../AccessComponent";
import { useDialog } from "@/context/useDialog";

const AccessDialog = () => {

const {hideDialog} = useDialog();

  return (
      <div className=" fixed w-full h-full inset-0 bg-slate-950/40 backdrop-blur-[30px]  flex justify-center items-center z-[100]">
        <div className=" w-fit h-fit bg-slate-950/90 rounded-2xl px-16 py-20 z-[1000]">
          <AccessComponent />
        </div>
        <motion.div
          onClick={hideDialog}
          className={
            "w-[100%] h-[100%] fixed top-0 bg-transparent"
          }
        ></motion.div>
      </div>
  )

}

export default AccessDialog
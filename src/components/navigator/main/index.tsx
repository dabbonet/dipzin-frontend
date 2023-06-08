'use client'
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import GuestNavigator from "./guest";
import MainNavigator from "./main";
import { useAuth } from "@/lib/auth";
import { usePathname } from "next/navigation";

const notAllowShowNavigatioPaths = ['/access', '/access/otp' , '/profile/step-1','/profile/step-2','/profile/step-3','/account']

const Navigator = ({ type }: any) => {
  const pathName = usePathname()
  const { user, loading } = useAuth();
  useEffect(() => {
    console.log("user:", user)
  }, [user])
  
  if(notAllowShowNavigatioPaths.includes(pathName)) return
  return (
    <motion.div
      // initial={{ y: 200 }}
      // animate={{ y: 0 }}
      // transition={{ type: "spring", stiffness: 100 }}
      className="fixed w-full left-0 bottom-0 flex justify-center z-40"
    >
      {!loading && user &&
        <MainNavigator type={type} />
      }

      {!loading && !user &&
        <GuestNavigator />
      }

    </motion.div>
  );
};

export default Navigator;

'use client'
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import GuestNavigator from "./guest";
import MainNavigator from "./main";
import { useAuth } from "@/lib/auth";


const Navigator = ({ type }: any) => {
  const { user, loading } = useAuth();


  return (
    <motion.div
      // initial={{ y: 200 }}
      // animate={{ y: 0 }}
      // transition={{ type: "spring", stiffness: 100 }}
      className=""
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

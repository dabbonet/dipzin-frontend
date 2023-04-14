import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import GuestNavigator from "./guest";
import MainNavigator from "./main";

const Navigator = ({ type }: any) => {
  return (
    <motion.div
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed w-full bottom-0 flex justify-center z-40"
    >

      <MainNavigator type={type} />

      {/* <GuestNavigator /> */}

    </motion.div>
  );
};

export default Navigator;

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import GuestNavigator from "./guest";
import MainNavigator from "./main";

const Navigator = () => {
  const session = useSession();

  return (
    <motion.div
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed w-full bottom-0 flex justify-center z-40"
    >
      {session ? (
        <MainNavigator />
      ) : (
        <GuestNavigator />
      )}
    </motion.div>
  );
};

export default Navigator;

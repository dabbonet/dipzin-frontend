'use client'
import { motion } from "framer-motion";
import GuestNavigator from "./guest";
import MainNavigator from "./main";
import { useAuth } from "@/lib/auth";
import { useNavigator } from "@/context/useNavigatiorContext";
import { cn } from "@/lib/utils";


const Navigator = ({ type }: any) => {
  const { user, loading } = useAuth();
  const { activeView } = useNavigator()

  return (
    <motion.div
      // initial={{ y: 200 }}
      // animate={{ y: 0 }}
      // transition={{ type: "spring", stiffness: 100 }}
      className=""
    >
      <MainNavigator type={type} />
    </motion.div>
  );
};
export default Navigator;

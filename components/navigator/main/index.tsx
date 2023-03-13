import { motion } from "framer-motion";
import { useSession } from "@supabase/auth-helpers-react";
import GuestNavigator from "./guest";
import MainNavigator from "./main";

const Navigator = ({ type }: any) => {
  const session = useSession();

  return (
    <motion.div
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed w-full bottom-0 flex justify-center z-40"
    >
      {session ? (
        <MainNavigator type={type} />
      ) : (
        <GuestNavigator />
      )}
    </motion.div>
  );
};

export default Navigator;

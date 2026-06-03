"use client";

import { useQuery } from "@/app/(explorer)/_hooks/useQuery";
import { capitalizeFirstLetter } from "@/utils/StringUtils";
import { useSession } from "next-auth/react";
import React from "react";
import { motion } from "framer-motion";

const PanelHeader: React.FC = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const { query } = useQuery();

  // initial query to condition that the Welcome message only shows if the user is on the initial landing panel
  const structuredQuery = {
    pattern: "screens",
    platform: "ios",
  };
  const normalizedQuery = {
    pattern: query.pattern,
    platform: query.platform,
  };

  if (
    status === "loading" ||
    status === "unauthenticated" ||
    JSON.stringify(normalizedQuery) !== JSON.stringify(structuredQuery)
  ) {
    return null;
  }

  return (
    <motion.div
      className="w-full h-fit flex items-center justify-between gap-3 mt-4 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-2xl sm:text-[2.5rem] font-semibold text-slate-300 flex flex-wrap items-center">
        Welcome, {capitalizeFirstLetter(user?.name ?? "")}
      </h1>
    </motion.div>
  );
};

export default PanelHeader;

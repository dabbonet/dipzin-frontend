"use client";
import { usePlatform } from "@/context/usePlatforms";
import React, { useEffect } from "react";
import Stream from "../Stream";
import { Toaster } from "react-hot-toast";

const AndroidHome = () => {
  const { setSelected } = usePlatform();
  useEffect(() => {
    setSelected(1);
  }, []);
  return (
    <div className="max-w-[92%] mx-auto ">
      <Stream />
      <Toaster position="top-center" />
    </div>
  );
};

export default AndroidHome;

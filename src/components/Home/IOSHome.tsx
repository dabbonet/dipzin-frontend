"use client";
import React, { useEffect } from "react";
import Stream from "../Stream";
import { Toaster } from "react-hot-toast";
import { usePlatform } from "@/context/usePlatforms";

const IOSHome = () => {
  const { setSelected } = usePlatform();
  useEffect(() => {
    setSelected(2);
  }, []);
  return (
    <div className="max-w-[92%] mx-auto">
      <Stream />
      <Toaster position="top-center" />
    </div>
  );
};

export default IOSHome;

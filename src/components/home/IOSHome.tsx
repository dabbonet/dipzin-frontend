"use client";
import { usePlatform } from "@/context/usePlatforms";
import React, { useEffect } from "react";
import { Stream } from ".";
import { Toaster } from "react-hot-toast";

const IOSHome = () => {
  const { setSelected } = usePlatform();

  useEffect(() => {
    setSelected(2); // Assuming 2 is the ID for the iOS platform
  }, [setSelected]);
  return (
    <>
      <div className="max-w-[92%] mx-auto">
        <Stream />
        <Toaster position="top-center" />
      </div>
    </>
  );
};

export default IOSHome;

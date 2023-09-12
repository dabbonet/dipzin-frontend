'use client'
import Stream from "@/components/Stream";
import { usePlatform } from "@/context/usePlatforms";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"

export default function Home() {
  const { setSelected } = usePlatform();
  useEffect(()=>{
    setSelected(1)
  },[])
  return (
    <div className="max-w-[92%] mx-auto ">
      <Stream />
      <Toaster position="top-center" />
    </div>
  );
}
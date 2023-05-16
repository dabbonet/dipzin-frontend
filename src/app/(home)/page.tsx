'use client'
import Stream from "@/components/Stream";
import { AccessOrUpgradeCard } from "@/components/accessAndUbgrade";
import { Toaster } from "react-hot-toast"
import { useDialog } from "@/context/useDialog";
import { useEffect } from "react";

export default function Home() {
  const {setTimes} = useDialog()
  useEffect(() => {
    setTimes(10)
  }, [])
  
  return (
    <>
      <Stream />
      <Toaster position="top-center" />
      <AccessOrUpgradeCard />
    </>
  );
}
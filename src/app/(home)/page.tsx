'use client'
import Stream from "@/components/Stream";
import { UpgradeMemberCard } from "@/components/UpgradeMemberCard";
import { Toaster } from "react-hot-toast"

export default function Home() {

  return (
    <>
      <Stream />
      <Toaster position="top-center" />
      <UpgradeMemberCard />
    </>
  );
}
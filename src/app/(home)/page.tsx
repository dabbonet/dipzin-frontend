'use client'
import Banner from "@/components/Banner";
import HomeNavigator from "@/components/HomeNavigator";
import Stream from "@/components/Stream";
import { Toaster } from "react-hot-toast"

export default function Home() {
  return (
    <>
      <Banner />
      <HomeNavigator />
      <Stream />
      <Toaster position="top-center" />
    </>
  );
}
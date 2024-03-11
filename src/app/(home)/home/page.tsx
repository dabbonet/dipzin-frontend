"use client";

import { Stream } from "@/components/home";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="max-w-[92%] mx-auto">
      {/* <Banner />
      <HomeNavigator /> */}
      <Stream />
      <Toaster position="top-center" />
    </div>
  );
}

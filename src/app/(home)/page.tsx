'use client'
import Stream from "@/components/Stream";
import { Toaster } from "react-hot-toast";

export default async function Home() {

  return (
    <>
      <Stream />
      <Toaster />
    </>
  );
}
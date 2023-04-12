'use client'
import Stream from "@/components/Stream";
import { Toaster } from 'sonner'


export default async function Home() {

  return (
    <>
      <Stream />
      <Toaster position="top-center" />
    </>
  );
}
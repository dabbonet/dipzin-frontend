'use client'
import Stream from "@/components/Stream";
import { Component } from "@/components/accessAndUbgrade";
import { useDialog } from "@/context/useDialog";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"

export default function Home() {
  const {setTimes} = useDialog()
  useEffect(() => {
    setTimes(10)
  })
  return (
    <>
      <Stream />
      <Toaster position="top-center" />
      <Component />
    </>
  );
}
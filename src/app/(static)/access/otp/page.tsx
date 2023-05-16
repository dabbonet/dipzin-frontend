"use client";
import { SignIn, setToken, verifyOtp } from "@/lib/auth";
import { useSearchParams, useRouter } from "next/navigation";
import {  useState } from "react";
import OtpAccessComponent from "@/components/OtpAccessComponent";
import { FC } from "react";
import { toast, Toaster } from "react-hot-toast";

const Otp: FC = () => {
  
  return <OtpAccessComponent />
};

export default Otp;

"use client";
import { SignIn, setToken, verifyOtp } from "@/lib/auth";
import { useSearchParams, useRouter } from "next/navigation";
import {  useEffect, useState , FC} from "react";
import OtpAccessComponent from "@/components/OtpAccessComponent";
import { toast } from "react-hot-toast";

const Otp: FC = () => {

  
  return <OtpAccessComponent />

};

export default Otp;

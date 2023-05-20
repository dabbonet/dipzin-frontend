"use client";
import { SignIn, setToken, verifyOtp } from "@/lib/auth";
import { useSearchParams, useRouter } from "next/navigation";
import {  useEffect, useState , FC} from "react";
import OtpAccessComponent from "@/components/OtpAccessComponent";
import { toast } from "react-hot-toast";

const Otp: FC = () => {

  const otpStringLength = 6
  const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");
    const [otp, setOtp] = useState<number>();
    const [failedMessage, setFailedMessage] = useState(false);
    const [disabelButton, setDisabelButton] = useState(true);
    useEffect(() => {
      const otpAsStrnig = `${otp}`
      if (otpAsStrnig.length === otpStringLength ) {
        setDisabelButton(false);
      } else {
        
        setDisabelButton(true);
      }
    }, [otp])

  
  return <OtpAccessComponent />

};

export default Otp;

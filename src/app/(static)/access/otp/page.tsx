"use client";
import { SignIn, setToken, verifyOtp } from "@/lib/auth";
import { useSearchParams, useRouter } from "next/navigation";
import {  useEffect, useState , FC} from "react";
import OtpAccessComponent from "@/components/OtpAccessComponent";
import { toast } from "react-hot-toast";

const Otp: FC = () => {
  const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");
    const [otp, setOtp] = useState<number>();
    const [failedMessage, setFailedMessage] = useState(false);
    const [disabelButton, setDisabelButton] = useState(true);
    useEffect(() => {
      const otpAsStrnig = `${otp}`
      console.log(otpAsStrnig)
      if (otpAsStrnig.length === 6) {
        console.log(otpAsStrnig.length)
        setDisabelButton(false);
      } else {
        
        setDisabelButton(true);
      }
    }, [otp])
  
  const handleClick = async () => {
    setDisabelButton(true);
    setFailedMessage(false);
    const data = await verifyOtp(email, otp);
    const { token } = await data.json();
    if (token) {
      setToken(token);
      if (data.status === 200) {
        router.push("/");
      } else {
        router.push("/account");
      }
    } else {
      toast.error("invalid code , you can resend after 30 seconds", {
        style: {
          backgroundColor: "orange",
          color: "white",
        },
      });
      setTimeout(() => {
        setFailedMessage(true);
        setDisabelButton(false);
      }, 30000);
    }
  };

  const handleResend = async () => {
    SignIn(email);
    setFailedMessage(false);
  };
  return <OtpAccessComponent handleResend={handleResend} setOtp={setOtp} handleClick={handleClick} failedMessage={failedMessage} disabelButton={disabelButton} />
};

export default Otp;

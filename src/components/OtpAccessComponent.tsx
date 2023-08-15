"use client";

import { useDialog } from "@/context/useDialog";
import { setToken, SignIn, useAuth, verifyOtp } from "@/lib/auth";
import { Button } from "@nextui-org/react";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthCode from "react-auth-code-input";
import { toast } from "react-hot-toast";
type props = {
  email?: string;
}
const OtpAccessComponent = ({ email }: props) => {
  const path = usePathname()
  const [otp, setOtp] = useState<number>();
  const [failedMessage, setFailedMessage] = useState(false);
  const [disabelButton, setDisabelButton] = useState(false);

  const { setChecker } = useAuth()
  const searchParams = useSearchParams();
  const { setVisibleNoAuth } = useDialog()
  const emailString = searchParams.get("email") || email;
  const router = useRouter();
  const handleResend = async () => {
    SignIn({ email });
    setFailedMessage(false);
  };
  const submitOtpAndEmail = async () => {
    setDisabelButton(true);
    setFailedMessage(false);
    const data = await verifyOtp(emailString, otp);
    const { token } = await data.json();
    if (token) {
      setChecker(true)
      setToken(token);
      if (data.status === 200) {
        router.push("/");
      } else {
        router.push("/profile/profile-informations");
      }
      if (path !== '/access/otp') setVisibleNoAuth(false);
    } else {
      toast.error("invalid code , you can resend after 30 seconds", {
        style: {
          backgroundColor: "orange",
          color: "white",
        },
      });
      setFailedMessage(true);
      setTimeout(() => {
        setFailedMessage(false);
        setDisabelButton(false);
      }, 5000);
    }
  };
  const ResendCodeButton = () => {
      return <div className=" mt-8">
        invalid code
        <Button className="text-aqua-600 bg-transparent" isDisabled={failedMessage === false} onPress={handleResend}>
          Resend Code
        </Button>
      </div>
  }
  const changeCodeInput = (e: string) => {
    setOtp(+e)
  }
  const SubmitOtpAndEmailButton = () => {
    if (disabelButton) {
      return <button
        className='w-full py-5 px-3 rounded-xl mt-6 font-semibold text-lg text-white cursor-not-allowed pointer-events-none bg-aqua-600/80'
        type="submit"
        onClick={submitOtpAndEmail}
      >
        Submit
      </button>
    }
    return <button
      className='w-full py-5 px-3 rounded-xl mt-6 font-semibold text-lg text-white bg-gradient-to-br from-aqua-600 to-aqua-500 hover:to-aqua-400'
      type="submit"
      onClick={submitOtpAndEmail}
    >
      Submit
    </button>
  }
  return (
    <div className="mx-auto w-full max-w-xl subpixel-antialiased">
      <h1 className="font-bold text-white lg:text-5xl text-3xl">
        Account Verification
      </h1>
      <p className="text-black-200 font-light mt-4 lg:text-base text-sm">
        Please enter the otp number sent to <b>{emailString}</b>.
      </p>
      <AuthCode
        allowedCharacters="numeric"
        containerClassName="flex mt-4 space-x-4"
        inputClassName="w-[56px] h-[56px] xl:w-[82px] xl:h-[82px] rounded-xl flex items-center justify-center text-center font-medium text-[28px] mx-auto bg-slate-800 text-slate-200 outline-0 border-2 border-transparent focus:border-aqua-500"
        onChange={(e) => changeCodeInput(e)}
        placeholder="_"
        ariaLabel="Enter your OTP"
      />
      <SubmitOtpAndEmailButton />
      <ResendCodeButton />
    </div>
  );
}
export default OtpAccessComponent
"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Button } from "@nextui-org/react";
import AuthCode from "react-auth-code-input";
import { toast } from "react-hot-toast";

import { useAuth, SignIn, setToken, verifyOtp } from "@/lib/auth";
import { useDialog } from "@/context/useDialog";

type OTPProps = {
  email?: string;
};

const OTP: React.FC<OTPProps> = ({ email }) => {
  const [otp, setOtp] = useState<number>();
  const [failedMessage, setFailedMessage] = useState<boolean>(false);
  const [disabelButton, setDisabelButton] = useState<boolean>(false);
  const path = usePathname();
  const router = useRouter();

  const { setChecker } = useAuth();
  const searchParams = useSearchParams();
  const { showDialog, DIALOG_ENUM } = useDialog();
  const emailString = searchParams.get("email") || email;

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
      setChecker(true);
      setToken(token);
      if (data.status === 200) {
        router.push("/");
      } else {
        router.push("/profile/profile-informations");
      }
      if (path !== "/access/otp")
        showDialog(DIALOG_ENUM.ACCESS, "Login to use this features");
    } else {
      toast.error("invalid code, you can resend after 30 seconds", {
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

  return (
    <div className="w-full max-w-xl mx-auto subpixel-antialiased">
      <h1 className="text-3xl font-bold text-white lg:text-5xl">
        Account Verification
      </h1>
      <p className="mt-4 text-sm font-light text-black-200 lg:text-base">
        Please enter the otp number sent to <b>{emailString}</b>.
      </p>
      <AuthCode
        allowedCharacters="numeric"
        containerClassName="flex mt-4 space-x-4"
        inputClassName="w-[56px] h-[56px] transition-all xl:w-[82px] xl:h-[82px] rounded-xl flex items-center justify-center text-center font-medium text-[28px] mx-auto bg-slate-800 text-slate-200 outline-0 border-2 border-transparent focus:border-aqua-500"
        onChange={(e) => setOtp(+e)}
        placeholder="_"
        ariaLabel="Enter your OTP"
      />
      <Button
        type="submit"
        onClick={submitOtpAndEmail}
        className={`w-full h-fit px-3 py-5 mt-6 text-lg font-semibold text-white rounded-xl transition-all 
        ${
          disabelButton
            ? "cursor-not-allowed pointer-events-none bg-aqua-600/80"
            : " bg-gradient-to-br from-aqua-600 to-aqua-500 hover:to-aqua-400"
        }
          `}
        isDisabled={disabelButton}
      >
        Submit
      </Button>

      <div className="mt-8">
        invalid code
        <Button
          onPress={handleResend}
          isDisabled={failedMessage === false}
          className="bg-transparent text-aqua-600"
        >
          Resend Code
        </Button>
      </div>
    </div>
  );
};
export default OTP;

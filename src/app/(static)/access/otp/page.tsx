"use client";
import { SignIn, setToken, verifyOtp } from "@/lib/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { FC, useState } from "react";
import AuthCode from "react-auth-code-input";
import { toast, Toaster } from "react-hot-toast";

const Otp: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState<number>();
  const [failedMessage, setFailedMessage] = useState(false);
  const [disabelButton, setDisabelButton] = useState(false)


  // TODO: Verify otp with email
  const handleClick = async () => {
    const data = verifyOtp(email, otp);
    data.then((res) => {
      if (res.token) {
        setToken(res.token);
        router.push("/");
      } else {
        toast.error("invalid code , you can resend after 30 seconds", {
          style: {
            backgroundColor: "orange",
            color: "white",
          },
        });
        setFailedMessage(true);
        setDisabelButton(true)
        setTimeout(() => {
          setDisabelButton(false)
        }, 30000);
      }
    });
  };

  const handleResend = async () => {
    SignIn(email);
    setFailedMessage(false);
  };

  return (
    <div className="mx-auto w-full max-w-xl subpixel-antialiased">
      <Toaster position="top-center" />
      <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-300 lg:text-5xl text-3xl">
        Account Verification
      </h1>
      <p className="text-slate-600 dark:text-white font-light mt-4 lg:text-base text-sm">
        Please enter the otp number sent to <b>{email}</b>.
      </p>
      <AuthCode
        allowedCharacters="numeric"
        containerClassName="flex mt-4 "
        inputClassName="w-[56px] h-[56px] xl:w-[82px] xl:h-[82px] rounded-xl flex items-center justify-center text-center font-medium text-[28px] mx-auto bg-slate-300 text-slate-800 dark:bg-slate-800 dark:text-slate-200 outline-0 border-2 border-transparent focus:border-orange-500"
        onChange={(e) => setOtp(+e)}
        placeholder="_"
        ariaLabel="Enter your OTP"
      />
      <button
        className={`w-full py-5 px-3 rounded-xl mt-6 font-semibold text-lg text-white bg-gradient-to-br from-orange-600 to-amber-600 hover:to-amber-500 ${disabelButton && ' cursor-not-allowed pointer-events-none'}`}
        type="submit"
        onClick={handleClick}
      >
        Submit
      </button>
      {failedMessage && (
        <div className=" mt-8">
          invalid code
          <button className=" ml-1 text-orange-600" onClick={handleResend}>
            Resend Code
          </button>
        </div>
      )}
    </div>
  );
};

export default Otp;

"use client";
import React, { useState } from "react";
import Icons from "@/components/icons/Icons";
import { toast } from "react-hot-toast";
import { SignIn } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";
import OTP from "./OTP";
import { invetaionAndReferralTokens } from "@/lib/tokens";

const LoginOrSignup: React.FC = () => {
  const path = usePathname();
  const [email, setEmail] = useState("");
  const [disableProcess, setDisableProcess] = useState(false);
  const [showOtpCard, setShowOtpCard] = useState(false);
  const router = useRouter();
  const SubmitEmailButton = () => {
    let buttonStyle =
      " bg-gradient-to-br from-aqua-600 to-aqua-500 hover:to-aqua-400";
    if (disableProcess) {
      buttonStyle = "bg-aqua-600/80 cursor-none pointer-events-none";
    }
    return (
      <button
        type="submit"
        onClick={submitEmail}
        className={`w-full py-5 px-3 rounded-xl mt-6 font-bold text-lg tracking-wide text-aqua-950 ${buttonStyle}`}
      >
        Send code
      </button>
    );
  };
  const submitEmail = async () => {
    setDisableProcess(true);
    const regextMatchEmail =
      /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

    if (!email.match(regextMatchEmail)) {
      setTimeout(() => {
        setDisableProcess(false);
      }, 2000);
      return toast.error("please enter a valid email", {
        duration: 2000,
      });
    }

    const { referralToken, invitationToken } = invetaionAndReferralTokens();
    const res = await SignIn({ email, referralToken, invitationToken });

    if (res) {
      if (path === "/access") {
        router.push(`/access/otp?email=${email}`);
      } else {
        setShowOtpCard(true);
      }
    } else {
      setDisableProcess(false);
      return toast.error("Something Went wrong");
    }
  };
  const handleChange = (event: any) => {
    setEmail(event.target.value);
  };

  if (showOtpCard) return <OTP email={email} />;
  return (
    <div className="mx-auto subpixel-antialiased">
      <h1 className="font-bold h-auto !leading-normal bg-clip-text  lg:text-5xl text-3xl">
        Log in or Signup
      </h1>
      <p className="text-sm font-light text-black-200 lg:text-base mb-7">
        Welcome! Please enter your email.
      </p>

      <div className="flex flex-col w-full mx-auto mt-4 space-y-3 font-medium xl:flex-row xl:space-y-0 xl:space-x-3">
        <a
          href="/api/user/connect?provider=google"
          className="flex items-center px-4 py-4 space-x-2 tracking-wider border w-max rounded-2xl bg-slate-900 hover:bg-slate-800 dark:border-aqua-500 "
        >
          <Icons.GoogleIcon />
          <p>Continue with Google</p>
        </a>
        <a
          href="/api/user/connect?provider=facebook"
          className="flex items-center px-4 py-4 space-x-2 tracking-wider border w-max rounded-2xl bg-slate-900 hover:bg-slate-800 dark:border-aqua-500 "
        >
          <Icons.FacebookIcon />
          <p>Continue with Facebook</p>
        </a>
      </div>

      <div className="flex flex-row justify-center my-8 w-[75%] mx-auto">
        <span className="absolute rounded-full bg-slate-950/50 text-slate-400">
          OR
        </span>
        <div className="w-[50%] mt-3 h-px bg-slate-400 dark:bg-slate-700"></div>
      </div>

      <input
        type="email"
        name="email"
        className="subpixel-antialiased h-14 text-sm rounded-lg  outline-none block w-full md:pl-6 pl-3 p-2.5 tracking-wider bg-slate-300 text-slate-800  placeholder-slate-600 ring-1 ring-transparent focus:ring-aqua-500 dark:bg-slate-800 dark:placeholder-slate-500 dark:text-slate-300 "
        placeholder="Email Address"
        onChange={(e) => handleChange(e as React.ChangeEvent)}
      />
      <SubmitEmailButton />
    </div>
  );
};

export default LoginOrSignup;

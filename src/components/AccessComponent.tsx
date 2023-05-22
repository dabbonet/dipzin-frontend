"use client";
import React, {  useState } from "react";
import Icons from "@/components/Icons";
import { toast } from "react-hot-toast";
import { SignIn } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";
import OtpAccessComponent from "./OtpAccessComponent";


const AccessComponent = () => {

  const path = usePathname()
  const [email, setEmail] = useState("");
  const [disableProcess, setDisableProcess] = useState(false);
  const [showOtpCard, setShowOtpCard] = useState(false)
  const router = useRouter();
  const SubmitEmailButton = () => {
    let buttonStyle = ' bg-gradient-to-br from-orange-600 to-amber-600 hover:to-amber-500'
    if (disableProcess) {
      buttonStyle = 'bg-gray-500 cursor-none pointer-events-none'
    }
    return <button
    type="submit"
    onClick={submitEmail}
    className= {`w-full py-5 px-3 rounded-xl mt-6 font-bold text-lg tracking-widest text-white ${buttonStyle}`}
  >
    Send code
  </button>
  }
  const submitEmail = async () => {
    setDisableProcess(true);
    const regextMatchEmail =
      /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

    if (!email.match(regextMatchEmail)) {
      setTimeout(() => {
        setDisableProcess(false);
      }, 2000);
      return toast.error("please enter a valid email", {
        style: {
          backgroundColor: "orange",
          color: "white",
        },
        duration: 2000,
      });
    }
    const res = await SignIn(email);
    if (res) {
      if (path === '/access') {
        router.push(`/access/otp?email=${email}`);
      } else {
        setShowOtpCard(true)
      }
    } else {
      setDisableProcess(false);
      return toast.error("Something Went wrong");
    }
  };
    const handleChange = (event: any) => {
      setEmail(event.target.value);
    };
    if (showOtpCard) return <OtpAccessComponent email={email}  />
    return (
      <div className="mx-auto subpixel-antialiased ">
        <h1 className="font-bold h-auto !leading-normal bg-clip-text  lg:text-5xl text-3xl">
          Log in to your account
        </h1>
        <p className=" text-[#D8D3C0] dark:text-white font-light lg:text-base text-sm mb-7">
          Welcome! Please enter your details.
        </p>
  
        <div className="flex flex-col xl:flex-row mt-4 w-full space-y-3 xl:space-y-0 xl:space-x-3 mx-auto font-medium">
          <a
            href="/api/user/connect?provider=google"
            className="w-max flex  items-center tracking-wider space-x-2 px-4 py-4 rounded-2xl border bg-slate-900 hover:bg-slate-800 dark:border-orange-500 "
          >
            <Icons.GoogleIcon />
            <p>Continue with Google</p>
          </a>
          <a
            href="/api/user/connect?provider=facebook"
            className="w-max flex items-center tracking-wider space-x-2 px-4 py-4 rounded-2xl border bg-slate-900 hover:bg-slate-800 dark:border-orange-500 "
          >
            <Icons.FacebookIcon />
            <p>Continue with Facebook</p>
          </a>
        </div>
  
        <div className="flex flex-row justify-center my-8 w-[75%] mx-auto">
          <span className="absolute  text-slate-400">OR</span>
          <div className="w-[50%] mt-3 h-px bg-slate-400 dark:bg-slate-700"></div>
        </div>
  
        <input
          type="email"
          name="email"
          className="subpixel-antialiased h-14 text-sm rounded-lg  outline-none block w-full md:pl-6 pl-3 p-2.5 tracking-wider bg-slate-300 text-slate-800  placeholder-slate-600 focus:ring-orange-500 dark:bg-slate-800 dark:placeholder-slate-500 dark:text-slate-300 "
          placeholder="Email Address"
          onChange={(e) => handleChange(e as React.ChangeEvent)}
        />
        <SubmitEmailButton/>
      </div>
    );
};

export default AccessComponent;

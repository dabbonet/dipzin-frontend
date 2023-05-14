import React, { useEffect, useState } from "react";
import Icons from "./Icons";
import { cn } from "@/lib/utils";
import { useDialog } from "@/context/useDialog";
import SparkleButton from "@/ui/SparkleButton";
import AccessComponent from "./AccessComponent";
import { toast } from "react-hot-toast";
import { setToken, SignIn, verifyOtp } from "@/lib/auth";
import OtpAccessComponent from "./OtpAccessComponent";
import { useRouter } from "next/navigation";

function formatTime(seconds: number): string {
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${secs}s`;
}


export const Component = () => {
  if (localStorage.getItem('token')) { 
    return  <UpgradeMemberCard/>
  }
  return <div className=" fixed w-full h-full inset-0 bg-opacity-20 bg-gradient-to-tr from-[#0D1018] to-[] backdrop-blur-[30px]  flex justify-center items-center z-50">
    <div className=" w-fit h-fit bg-slate-900 bg-opacity-60 rounded-2xl px-16 py-20">
      <AccessCard/>
    </div>
  </div>
}


const AccessCard = () => {
  // global variable for email
  const [email, setEmail] = useState("");
  // about otp card
  const [showOtpCard, setShowOtpCard] = useState(false)
  const [otp, setOtp] = useState<number>();
  const [failedMessage, setFailedMessage] = useState(false);
  const [disabelButton, setDisabelButton] = useState(false);
  const router = useRouter();
  const handleResend = async () => {
    SignIn(email);
    setFailedMessage(false);
  };
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
  // about access
  const [disableProcess, setDisableProcess] = useState(false);
  const handleChange = (event: any) => {
    setEmail(event.target.value);
  };
  const handleSubmit = async () => {
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
      setShowOtpCard(true);
    } else {
      setDisableProcess(false);
      return toast.error("Something Went wrong");
    }
  };
  if (showOtpCard) return <OtpAccessComponent email={email} setOtp={setOtp} failedMessage={failedMessage} handleClick={handleClick} handleResend={handleResend} disabelButton={disabelButton} />
  return <AccessComponent handleChange={handleChange} disableProcess={disableProcess} handleSubmit={handleSubmit} />
}








const UpgradeMemberCard = () => {
  const [show, setShow] = useState<boolean>(false)
  const { counter, visible } = useDialog();

  useEffect(() => {
    visible && setShow(visible)
  }, [visible])

  if (!show) return
  return (
    <div className="w-[100%] h-[100%] fixed inset-0 bg-opacity-50 bg-[#0D1018] backdrop-blur-xl  flex justify-center items-center z-50">
      <div className="max-w-2xl bg-slate-900 rounded-3xl p-10 flex flex-col gap-5">
        <div className="flex justify-between items-start">

          <div className="flex space-x-4">
            <h1 className="text-orange-500 text-3xl">
              Please Wait {formatTime(counter)} <b className="text-white mx-4">or</b>
            </h1>
            <div className=" flex gap-14 flex-wrap items-center">
              <SparkleButton href="/pricing">
                Unlock More!
              </SparkleButton>
            </div>
          </div>

          <button
            onClick={() => {
              if (!visible) setShow(false)
            }}
            className={cn(visible ? 'text-slate-700 pointer-events-none' : 'text-slate-100 hover:text-orange-500')}
          >
            <Icons.XCircle className='w-6 h-6' />
          </button>

        </div>

        <h3 className=" text-slate-200 text-2xl font-medium">
          Upgrade and get access to exclusive features
        </h3>

        <div className=" flex gap-14 flex-wrap">
          <div className=" flex gap-2">
            <img src="/images/assets/Vector.svg" alt="" />
            <p className=" text-white font-medium text-lg">
              Download in Bulk
            </p>
          </div>
          <div className="flex gap-2">
            <img src="/images/assets/Vector.svg" alt="" />
            <p className=" text-white font-medium text-lg">
              Download in Bulk
            </p>
          </div>
        </div>

        <div className=" flex gap-14 flex-wrap">
          <div className=" flex gap-2">
            <img src="/images/assets/Vector.svg" alt="" />
            <p className=" text-white font-medium text-lg">
              Download in Bulk
            </p>
          </div>
          <div className=" flex gap-2">
            <img src="/images/assets/Vector.svg" alt="" />
            <p className=" text-white font-medium text-lg">
              Download in Bulk
            </p>
          </div>
        </div>

        <img
          src="/images/assets/banner.png"
          className=" rounded-2xl"
          alt=""
        />
      </div>
    </div>
  )
};


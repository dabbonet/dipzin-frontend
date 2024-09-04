"use client"

import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
// import { SignIn, signInFacebook, signInGoogle } from "./actions/sign-in-provider";
import { Input } from "@/components/Shared/input";
import { Button } from "@/components/Shared/button";
import { SignIn } from "./actions/sign-in-provider";
import { useToast } from "@/components/Shared/toaster";
import { useRouter } from "next/navigation";
// import { redirect } from 'next/navigation'
// import { useToast } from "@/components/Shared/toaster";

type FormValues = {
  email: string;
};
// const { referralToken, invitationToken } = invetaionAndReferralTokens()
const AccessModal = () => {
  const router = useRouter()
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (FormData) => {
    await SignIn(FormData.email, "", "");
    toast({
      variant: "success",
      title: "Success",
      // description: "There was a problem with your request.",

    })
    router.push(`/access/otp?email=${encodeURIComponent(FormData.email)}`);
  }

  return (
    <div className="bg-[#000] p-16 rounded-[20px] flex flex-col gap-10 text-white font-outfit ">
      <div className="space-y-[26px] ">
        <div className="space-y-3">
          <h1 className="font-semibold lg:text-[40px] text-3xl">
            Log in to your account
          </h1>
          <p className="text-[#D8D3C0] lg:text-lg text-sm">
            Welcome! Please enter your email.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row  space-y-3 xl:space-y-0 xl:space-x-3  ">
          <form>

            <Button
          // href="/api/user/connect?provider=google"
              type="submit"
              variant="strocked"
              size="3xl"
              className="w-full flex gap-[16px] items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <g clip-path="url(#clip0_2094_38057)">
                  <path d="M23.7682 12.8761C23.7682 12.0604 23.7021 11.2402 23.561 10.4377H12.2422V15.0587H18.7239C18.455 16.5491 17.5907 17.8675 16.3252 18.7052V21.7036H20.1922C22.463 19.6136 23.7682 16.527 23.7682 12.8761Z" fill="white" />
                  <path d="M12.2391 24.6004C15.4756 24.6004 18.205 23.5378 20.1936 21.7035L16.3266 18.7052C15.2507 19.4371 13.8618 19.8516 12.2435 19.8516C9.11291 19.8516 6.45849 17.7395 5.50607 14.8999H1.51562V17.9908C3.55274 22.043 7.70192 24.6004 12.2391 24.6004Z" fill="white" />
                  <path d="M5.50082 14.8998C4.99816 13.4095 4.99816 11.7957 5.50082 10.3053V7.21436H1.51478C-0.187219 10.6051 -0.187219 14.6 1.51478 17.9908L5.50082 14.8998Z" fill="white" />
                  <path d="M12.2391 5.34927C13.9499 5.32281 15.6034 5.96658 16.8425 7.14828L20.2685 3.72223C18.0991 1.68511 15.2198 0.565143 12.2391 0.600418C7.70192 0.600418 3.55274 3.15783 1.51562 7.21442L5.50166 10.3054C6.44967 7.46134 9.1085 5.34927 12.2391 5.34927Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_2094_38057">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.599609)" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </Button>
          </form>

          <form>

            <Button
          // href="/api/user/connect?provider=google"
              type="submit"
              variant="strocked"
              size="3xl"
              className="w-full flex gap-[16px] items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_2094_38060)">
                  <path d="M17.3901 13.3981L18.0513 9.08738H13.9154V6.29126C13.9154 5.11194 14.4932 3.96116 16.3456 3.96116H18.226V0.291262C18.226 0.291262 16.5195 0 14.8879 0C11.4816 0 9.25516 2.06447 9.25516 5.80194V9.08738H5.46875V13.3981H9.25516V23.8188C10.7992 24.0604 12.3713 24.0604 13.9154 23.8188V13.3981H17.3901Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_2094_38060">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Facebook
            </Button>
          </form>

        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-[3px] w-[130px] mx-auto">
        <span className="bg-gray-700 h-px w-full" />
        <p className="text-gray-700">OR</p>
        <span className="bg-gray-700 h-px w-full" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          className="w-full h-[64px] "
          placeholder="Email"
          state={errors.email?.type === "pattern" ? "error" : "default"}
          helpText={errors.email?.message ? errors.email.message : ""}
          {...register("email", {
            required: true,
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
              message: "Invalid email address",
            },

          })}
        />

        <Button
          type="submit"
          size="3xl"
          className="w-full"
        >
          Send Code
        </Button>
      </form>
      {/* <form className="space-y-6">
        <Input
          className="w-[500px]"
          helpText=""
          label="Email"
          placeholder="Enter your email"
          state="default"
        />
        <Button
          type="submit"
          size="3xl"
          className="w-full"
        >
          Send Code
        </Button>
      </form> */}
    </div>
  )
}

export default AccessModal;

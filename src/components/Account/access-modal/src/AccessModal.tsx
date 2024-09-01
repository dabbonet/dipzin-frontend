import { Button } from "@/components/Shared/button";
import { Input } from "@/components/Shared/input";
import { Logo } from "@/components/UI/logo";
import React from "react";

const AccessModal = () => (
  <div className="bg-slate-900 p-16 rounded-[20px] flex flex-col gap-10 text-white font-outfit">
    <div className="space-y-[26px]">
      <div className="space-y-3">
        <h1 className="font-semibold lg:text-[40px] text-3xl">
          Log in to your account
        </h1>
        <p className="text-[#D8D3C0] lg:text-lg text-sm">
          Welcome! Please enter your email.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row w-full space-y-3 xl:space-y-0 xl:space-x-3">
        <Button
          href="/api/user/connect?provider=google"
          variant="strocked"
          size="3xl"
          className="w-full"
        >
          <Logo.Google />
          Continue with Google
        </Button>
        <Button
          href="/api/user/connect?provider=facebook"
          variant="strocked"
          size="3xl"
          className="w-full"
        >
          <Logo.Facebook />
          Continue with Facebook
        </Button>
      </div>
    </div>

    <div className="flex flex-row items-center justify-center gap-[3px] w-[130px] mx-auto">
      <span className="bg-gray-700 h-px w-full" />
      <p className="text-gray-700">OR</p>
      <span className="bg-gray-700 h-px w-full" />
    </div>

    <form className="space-y-6">
      <Input placeholder="enter your Email" label="email" className="h-20" />
      <Button
        type="submit"
        size="3xl"
        className="w-full"
      >
        Send Code
      </Button>
    </form>
  </div>
);

export default AccessModal;

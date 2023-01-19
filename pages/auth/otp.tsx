import type { ReactElement } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";

import OTPForm from "./otpform";

const OTP = () => {
  return (
    <div className="mx-auto w-full max-w-xl subpixel-antialiased">
      <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-200 to-orange-600 lg:text-5xl text-3xl">
        Account Verification
      </h1>
      <p className="text-white font-light mt-4 lg:text-base text-sm">
        Please enter the otp number sent to your email.
      </p>
      <OTPForm />
    </div>
  );
};

export default OTP;

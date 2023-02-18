import { useRouter } from "next/router";
import type { ReactElement } from "react";
import AuthLayout from "../../components/auth/AuthLayout";

import OTPForm from "./otpform";

const OTP = () => {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-xl subpixel-antialiased">
      <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-200 to-orange-600 lg:text-5xl text-3xl">
        Account Verification
      </h1>
      <p className="text-white font-light mt-4 lg:text-base text-sm">
        Please enter the otp number sent to {router.query.email}.
      </p>
      <OTPForm sendEmail={router.query.email} />
    </div>
  );
};

OTP.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default OTP;

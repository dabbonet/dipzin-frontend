"use client";

import AuthCode from "react-auth-code-input";



const OtpAccessComponent = ({email , setOtp , disabelButton , handleClick , failedMessage , handleResend}) => {
    
  
    // TODO: Verify otp with email
    
    return (
      <div className="mx-auto w-full max-w-xl subpixel-antialiased">
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
          className={`w-full py-5 px-3 rounded-xl mt-6 font-semibold text-lg text-white ${
            disabelButton ? " cursor-not-allowed pointer-events-none bg-gray-500" : ' bg-gradient-to-br from-orange-600 to-amber-600 hover:to-amber-500'
          }`}
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
}

export default OtpAccessComponent
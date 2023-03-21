'use client'
import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react'
import AuthCode from 'react-auth-code-input';

interface otpProps {

}

const otp: FC<otpProps> = ({ }) => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email')
    const [otp, setOtp] = useState<string>('');

    // TODO: Send OTP to server to verify

    return (
        <div className="mx-auto w-full max-w-xl subpixel-antialiased">
            <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-200 to-orange-600 lg:text-5xl text-3xl">
                Account Verification
            </h1>
            <p className="text-white font-light mt-4 lg:text-base text-sm">
                Please enter the otp number sent to <b>{email}</b>.
            </p>
            <AuthCode
                allowedCharacters='numeric'
                containerClassName="flex mt-4 "
                inputClassName="w-[56px] h-[56px] xl:w-[82px] xl:h-[82px] bg-slate-800 rounded-xl flex items-center justify-center text-center text-slate-200 font-medium text-[28px] mx-auto"
                onChange={(e) => setOtp(e)}
                placeholder="_"
                ariaLabel="Enter your OTP"
            />
            <button
                className="w-full py-5 px-3 rounded-xl mt-6 font-semibold text-lg text-white bg-gradient-to-br from-orange-600 to-amber-600 hover:to-amber-500"
                type="submit"
            >
                Submit
            </button>
        </div>)
}

export default otp
'use client'
import Icons from "@/components/Icons";
import { useRouter } from 'next/navigation';
import { FC, useState } from "react";

const Access: FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const handleSubmit = async () => {
        //TODO: Send email to user and go to OTP page
        router.push(`/access/otp?email=${email}`)

        console.log(email)
    }
    return (
        <div className="mx-auto w-full subpixel-antialiased">
            <div className="mx-auto w-[70%] max-w-2xl subpixel-antialiased">
                <h1 className="font-bold h-auto !leading-normal text-transparent  bg-clip-text  bg-gradient-to-r from-orange-600 to-amber-300 lg:text-5xl text-3xl">
                    Log in or sign up
                </h1>
                <p className="text-slate-600 dark:text-white font-light lg:text-base text-sm mb-7">
                    Welcome! Please enter your details.
                </p>

                <div className="flex flex-col xl:flex-row mt-4 w-full space-y-3 xl:space-y-0 xl:space-x-3 mx-auto font-medium">
                    <a
                        href="#"
                        className="w-full flex items-center tracking-wider space-x-2 px-7 py-4 rounded-2xl border border-slate-900 dark:border-orange-500 text-slate-800 dark:text-white hover:bg-slate-500/10 hover:text-orange-500"
                    >
                        <Icons.GoogleIcon />
                        <span>Continue with Google</span>
                    </a>
                    <a
                        href="#"
                        className="w-full flex items-center tracking-wider space-x-2 px-7 py-4 rounded-2xl border border-slate-900 dark:border-orange-500 text-slate-800  dark:text-white hover:bg-slate-500/10 hover:text-orange-500"
                    >
                        <Icons.FacebookIcon />
                        <span>Continue with Facebook</span>
                    </a>
                </div>

                <div className="flex flex-row justify-center my-8 w-[75%] mx-auto">
                    <span className="absolute px-4 bg-slate-300 rounded-full text-slate-900 dark:bg-slate-900 dark:text-gray-500">or</span>
                    <div className="w-full mt-3 h-px bg-slate-400 dark:bg-slate-700"></div>
                </div>


                <input
                    type="email"
                    name="email"
                    className="subpixel-antialiased h-14 text-sm rounded-lg border-2 outline-none block w-full pl-6 pr-32 p-2.5 tracking-wider bg-slate-300 text-slate-800 border-slate-400/20 placeholder-slate-600 focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-800 dark:placeholder-slate-500 dark:text-slate-300 dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full py-5 px-3 rounded-xl mt-6 font-bold text-lg tracking-widest text-white bg-gradient-to-br from-orange-600 to-amber-600 hover:to-amber-500"
                >
                    Send code
                </button>
            </div>
        </div>
    )
}

export default Access
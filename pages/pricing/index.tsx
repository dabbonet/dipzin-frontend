import { ReactElement, useState, useRef, useEffect } from "react";
import { NextPage } from "next";

const Page: NextPage = () => {

    const [platform, setPlatform] = useState<any>("IOS");

    const [timerBlur, setTimerBlur] = useState<boolean>(true);

    const [countdown, setCountdown] = useState(15);
    const timerId = useRef<any>();

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev - 0.5)
        }, 1000)
    }, [])

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerId.current);
            setTimerBlur(false);
        }
    }, [countdown])

    const handlePlateformUp = () => {
        if (platform == "IOS") {
            setPlatform("Android");
        } else if (platform == "Android") {
            setPlatform("Web");
        } else if (platform == "Web") {
            setPlatform("IOS");
        }
    }

    return (
        <>
            <main className="w-full flex flex-col items-center text-white">
                <div className="flex flex-col text-start w-[75%] mt-[120px] mb-[100px]">
                    <span className="text-orange-500 font-semibold text-[16px] mb-1">Beta Pricing</span>
                    <span className="text-[64px] mb-2">Simple, transparent pricing</span>
                    <span className="text-[20px] text-slate-300">We believe Untitled should be accessible to all companies, no matter the size.</span>
                </div>
                {/* Pricing tabs */}
                <div className="p-3 bg-slate-800 rounded-full flex sm:rounded-3xl sm:flex-col sm:space-y-4 lg:space-x-4 md:space-x-4 items-center">
                    <div className="px-4 h-[45px] bg-slate-900 flex justify-center items-center rounded-full">
                        <span className="font-semibold text-slate-200 text-[20px]">MONTHLY</span>
                    </div>
                    <div className="px-4 h-[45px] bg-orange-500 flex justify-center items-center rounded-full">
                        <span className="font-semibold text-slate-200 text-[20px]">QUARTERLY</span>
                        <div className="h-7 bg-orange-200 flex justify-center items-center rounded-full px-3 ml-5 mr-auto">
                            <span className="text-orange-700 font-semibold text-[14px]">Save 35%</span>
                        </div>
                    </div>
                    <div className="px-4 h-[45px] bg-slate-900 flex justify-center items-center rounded-full">
                        <span className="font-semibold text-slate-200 text-[20px]">ANNUALLY</span>
                        <div className="h-7 bg-emerald-200 grid justify-center items-center rounded-full px-3 ml-5 mr-auto">
                            <span className="text-emerald-700 font-semibold text-[14px]">Save 35%</span>
                        </div>
                    </div>
                </div>
                {/* Pricing cards */}
                <div className=" grid grid-cols-3 gap-5 my-12 gap-x-10 sm:grid-cols-1">
                    {/* Free sub */}
                    <div className="w-[445px] h-auto py-7 px-7 bg-slate-800 rounded-[50px] flex flex-col">
                        <span className="font-medium text-[28px] mb-3">Free</span>
                        <span className="font-medium text-[19px] text-slate-300">Great for freelancers</span>
                        <span className="font-semibold text-[70px] ">0 <span className="font-semibold text-[46px] text-slate-300">$</span></span>
                        <span className="font-medium text-[18px] text-slate-300">Monthely</span>
                        <div className="ml-3 mt-5 mb-7">
                            <div className="flex items-center mb-2">
                                <span className="mr-2"><img src="/images/assets/check.svg" alt="check" /></span>
                                <span className="font-medium text-[19px] ml-1">Download & Copy PNGs</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="mr-2"><img src="/images/assets/check.svg" alt="check" /></span>
                                <span className="font-medium text-[19px] ml-1">3 Collections</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="mr-2"><img src="/images/assets/check.svg" alt="check" /></span>
                                <span className="font-medium text-[19px] ml-1">Limited Search & Filters</span>
                            </div>

                        </div>
                        <div className="flex mt-auto items-center justify-center w-[100%] h-[52px] bg-[#0B1321] mx-auto rounded-[26px]">
                            <span>Get Started</span>
                        </div>
                    </div>
                    {/* Monthly sub */}
                    <div className="w-[445px] h-auto py-7 px-7 bg-slate-800 rounded-[50px] flex flex-col">
                        <span className="font-medium text-[28px] mb-3">Personal</span>
                        <span className="font-medium text-[19px] text-slate-300">Great for freelancers</span>
                        <span className="font-semibold text-[70px] ">3.99 <span className="font-semibold text-[46px] text-slate-300">$</span></span>
                        <span className="font-medium text-[18px] text-slate-300">Quarterly</span>
                        <div className="ml-3 mt-5 mb-7">
                            <div className="flex items-center mb-2">
                                <span className="mr-2"><img src="/images/assets/check.svg" alt="check" /></span>
                                <span className="font-medium text-[19px] ml-1">Download in bulk</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="mr-2"><img src="/images/assets/check.svg" alt="check" /></span>
                                <span className="font-medium text-[19px] ml-1">Select and Copy</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="mr-2"><img src="/images/assets/check.svg" alt="check" /></span>
                                <span className="font-medium text-[19px] ml-1">Unlimited Collections</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="mr-2"><img src="/images/assets/check.svg" alt="check" /></span>
                                <span className="font-medium text-[19px] ml-1">Unlimited Search & Filters</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-[100%] h-[52px] bg-[#0B1321] mx-auto rounded-[26px]">
                            <span>Get Started</span>
                        </div>
                    </div>
                    {/* Team sub */}
                    <div className="w-[445px] h-auto py-7 px-7 bg-slate-800 rounded-[50px] flex flex-col">
                        <span className="font-medium text-[28px] mb-3">Personal</span>
                        <span className="font-medium text-[19px] text-slate-300">Great for freelancers</span>
                        <span className="font-semibold text-[70px] leading-none">Coming Soon</span>
                        <div className="ml-3 mt-5 mb-7">
                            <div className="flex items-center mb-2">
                                <span className="mr-2"><img src="/images/assets/check.svg" alt="check" /></span>
                                <span className="font-medium text-[19px] ml-1">Team Collectionos</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="mr-2"><img src="/images/assets/check.svg" alt="check" /></span>
                                <span className="font-medium text-[19px] ml-1">Team Admin</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="mr-2"><img src="/images/assets/check.svg" alt="check" /></span>
                                <span className="font-medium text-[19px] ml-1">Centralised Billing</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="mr-2"><img src="/images/assets/check.svg" alt="check" /></span>
                                <span className="font-medium text-[19px] ml-1">Seat-based Pricing</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-[100%] h-[52px] bg-[#0B1321] mx-auto rounded-[26px]">
                            <span>Get Started</span>
                        </div>
                    </div>

                </div>

                <div className="w-[75%] text-white grid grid-cols-4 gap-4 items-stretch place-content-around sm:grid-cols-1 sm:justify-items-center">
                    <div className="flex flex-col sm:w-full">
                        <span className="font-semibold text-3xl break-all">Plan Comparison</span>
                        <span className="text-slate-400">Find your best subscription.</span>
                    </div>
                    <div className="flex flex-col sm:w-[33.33%]">
                        <span className="font-semibold text-2xl">Free</span>
                        <span className="text-xl">Free</span>
                        <div className="flex items-center justify-center bg-orange-500 mx-auto rounded-[10px] mt-5 px-4 py-3 ml-0">
                            <span>Get Started</span>
                        </div>

                    </div>
                    <div className="flex flex-col sm:w-[33.33%]">
                        <span className="font-semibold text-2xl">Personal</span>
                        <span className="text-xl">$49 <span className="text-slate-400">/month</span></span>
                        <div className="flex items-center justify-center bg-orange-500 rounded-[10px] mx-auto mt-5 px-4 py-3 ml-0">
                            <span>Get Started</span>
                        </div>

                    </div>
                    <div className="flex flex-col sm:w-[33.33%]">
                        <span className="font-semibold text-2xl">Team</span>
                        <span className="text-xl">Coming Soon...</span>
                        <div className="flex items-center justify-center bg-orange-500 mx-auto rounded-[10px] mt-5 px-4 py-3 ml-0">
                            <span>Get Started</span>
                        </div>

                    </div>
                </div>

            </main>

        </>
    );
}
export default Page;
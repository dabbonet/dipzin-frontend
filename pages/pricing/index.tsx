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
            {timerBlur && (
                <div className="w-[100%] h-[100%] fixed bg-opacity-50 bg-[#0D1018] backdrop-blur-xl  flex justify-center items-center z-50">
                    <div className="w-[40%] h-auto bg-slate-900 rounded-3xl border-[1px] border-slate-600 p-10 text-white flex flex-col">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <span className="text-orange-400 text-[48px] mr-10">00:{countdown}</span>
                                <span className="h-[60%] bg-gradient-to-b from-orange-500 to-orange-600 flex justify-center items-center p-5 rounded-xl font-medium text-[14px]">Unlock More!</span>
                            </div>
                            <span className="mt-2" onClick={() => { setTimerBlur(false) }}><img src="/images/assets/close.svg" /></span>
                        </div>

                        <span className="text-[24px] font-medium">Upgrade and get access to exclusive features</span>

                        <div className="mt-5 text-[18px] mb-8">
                            <div>
                                <div className="flex mb-2 items-center ">
                                    <span className="mr-2"><img src="/images/assets/check.svg" alt="check" /></span>
                                    <span>Download in bulk</span>
                                    <span className="mr-2 ml-11"><img src="/images/assets/check.svg" alt="check" /></span>
                                    <span>Unlimited Collections</span>
                                </div>
                                <div className="flex">
                                    <span className="mr-2"><img src="/images/assets/check.svg" alt="check" /></span>
                                    <span>Select and Copy</span>
                                    <span className="mr-2 ml-12"><img src="/images/assets/check.svg" alt="check" /></span>
                                    <span>Unlimited Search & Filters</span>
                                </div>
                            </div>
                        </div>
                        <img className="h-auto w-full mt-auto" src="/images/assets/banner.svg" alt="banner" />
                    </div>
                </div>
            )}

            <header className="w-full flex justify-between fixed items-center text-white mt-8 px-10 z-40">
                <div className="text-2xl"><span className="font-semibold">dipz<span className="font-light">in</span><span className="text-orange-500">.</span></span></div>
                <div className="w-[65px] h-[35px] bg-slate-300 rounded-full flex items-center justify-center text-sm font-normal text-slate-800"><span>Try it!</span></div>
            </header>

            <main className="w-full flex flex-col items-center text-white">
                <div className="flex flex-col text-start w-[75%] mt-[120px] mb-[100px]">
                    <span className="text-orange-500 font-semibold text-[16px] mb-1">Beta Pricing</span>
                    <span className="text-[64px] mb-2">Simple, transparent pricing</span>
                    <span className="text-[20px] text-slate-300">We believe Untitled should be accessible to all companies, no matter the size.</span>
                </div>

                <div className="w-[930px] h-[60px] bg-slate-800 rounded-2xl flex items-center">
                    <div className="w-[20%] h-[70%] bg-white rounded-xl ml-3 mr-auto"></div>
                    <div className="w-[20%] h-[70%] bg-white rounded-xl ml-auto mr-auto"></div>
                    <div className="w-[20%] h-[70%] bg-white rounded-xl ml-auto mr-3"></div>
                </div>

                <div className=" grid grid-cols-2 gap-5 my-12 gap-x-10">
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
                        <div className="flex mt-auto items-center justify-center w-[100%] h-[42px] bg-[#0B1321] mx-auto rounded-[26px]">
                            <span>Get Started</span>
                        </div>
                    </div>

                    <div className="w-[445px] h-auto py-7 px-7 bg-slate-800 rounded-[50px] flex flex-col">
                        <span className="font-medium text-[28px] mb-3">Subscription</span>
                        <span className="font-medium text-[19px] text-slate-300">Great for freelancers</span>
                        <span className="font-semibold text-[70px] ">6.99 <span className="font-semibold text-[46px] text-slate-300">$</span></span>
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
                        <div className="flex items-center justify-center w-[100%] h-[42px] bg-[#0B1321] mx-auto rounded-[26px]">
                            <span>Get Started</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <span>Features</span>
                    <span>Beautiful analytics to grow smarter</span>
                    <span>Powerful, self-serve product and growth analytics to help you convert, </span>
                    <span>engage, and retain more users. Trusted by over 4,000 startups. </span>
                </div>
                <div className="grid grid-cols-3 gap-5 ">

                </div>
                <div className="flex flex-col">
                    <span>Features</span>
                    <span>Beautiful analytics to grow smarter</span>
                    <span>Powerful, self-serve product and growth analytics to help you convert, </span>
                    <span>engage, and retain more users. Trusted by over 4,000 startups. </span>
                </div>
            </main>

        </>
    );
}
export default Page;
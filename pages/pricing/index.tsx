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
                    <div className="w-[40%] h-[50%] bg-slate-900 rounded-3xl border-[1px] border-slate-600 p-10 text-white flex flex-col">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <span className="text-orange-400 text-[48px] mr-10">00:{countdown}</span>
                                <span className="h-[60%] bg-gradient-to-b from-orange-500 to-orange-600 flex justify-center items-center p-5 rounded-xl font-medium text-[14px]">Unlock More!</span>
                            </div>
                            <span className="mt-2" onClick={() => { setTimerBlur(false) }}><img src="/images/assets/close.svg" /></span>
                        </div>

                        <span className="text-[24px] font-medium">Upgrade and get access to exclusive features</span>

                        <div className="mt-5 text-[18px]">
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
                <div className="w-[180px] h-[35px] bg-[#1B2132] rounded-3xl flex items-center justify-between pl-3 pr-3 text-sm font-light">
                    <span>Paltform <span className="font-normal">{platform}</span></span>
                    <div className="cursor-pointer" onClick={handlePlateformUp}>
                        <img className="mb-1 cursor-pointer" src="/images/assets/moveup.svg" />
                        <img src="/images/assets/movedown.svg" />
                    </div>
                </div>
                <div className="w-[65px] h-[35px] bg-slate-300 rounded-full flex items-center justify-center text-sm font-normal text-slate-800"><span>Try it!</span></div>
            </header>

            <main className="w-full flex flex-col items-center text-white">
                <div className="flex flex-col">
                    <span>Beta Pricing</span>
                    <span>Simple, transparent pricing</span>
                </div>
            </main>

        </>
    );
}
export default Page;
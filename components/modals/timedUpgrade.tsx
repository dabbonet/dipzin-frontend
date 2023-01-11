import React, { useEffect, useRef, useState } from 'react'

const TimedUpgrade = () => {
    const [countdown, setCountdown] = useState(15);
    const [timerBlur, setTimerBlur] = useState<boolean>(true); //true on deploy//
    const timerId = useRef<any>();

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown((prev) => prev - 0.5);
        }, 1000);
    }, []);

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerId.current);
            setTimerBlur(false);
        }
    }, [countdown]);

    const formattedCountdown = countdown.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });

    return (
        <>
            {timerBlur && (
                <div className="w-[100%] h-[100%] fixed bg-opacity-50 bg-[#0D1018] backdrop-blur-xl  flex justify-center items-center z-50">
                    <div className="w-[40%] h-auto bg-slate-900 rounded-3xl border-[1px] border-slate-600 p-10 text-white flex flex-col">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <span className="w-[150px] text-orange-400 text-[48px] mr-10">
                                    00:{formattedCountdown}
                                </span>
                                <span className="h-[60%] bg-gradient-to-b from-orange-500 to-orange-600 flex justify-center items-center p-5 rounded-xl font-medium text-[14px]">
                                    Unlock More!
                                </span>
                            </div>
                            <span
                                className="mt-2"
                                onClick={() => {
                                    setTimerBlur(false);
                                }}
                            >
                                <img src="/images/assets/close.svg" />
                            </span>
                        </div>

                        <span className="text-[24px] font-medium">
                            Upgrade and get access to exclusive features
                        </span>

                        <div className="mt-5 text-[18px] mb-8">
                            <div>
                                <div className="flex mb-2 items-center ">
                                    <span className="mr-2">
                                        <img src="/images/assets/check.svg" alt="check" />
                                    </span>
                                    <span>Download in bulk</span>
                                    <span className="mr-2 ml-11">
                                        <img src="/images/assets/check.svg" alt="check" />
                                    </span>
                                    <span>Unlimited Collections</span>
                                </div>
                                <div className="flex">
                                    <span className="mr-2">
                                        <img src="/images/assets/check.svg" alt="check" />
                                    </span>
                                    <span>Select and Copy</span>
                                    <span className="mr-2 ml-12">
                                        <img src="/images/assets/check.svg" alt="check" />
                                    </span>
                                    <span>Unlimited Search & Filters</span>
                                </div>
                            </div>
                        </div>
                        <img
                            className="h-auto w-full mt-auto"
                            src="/images/assets/banner.svg"
                            alt="banner"
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default TimedUpgrade
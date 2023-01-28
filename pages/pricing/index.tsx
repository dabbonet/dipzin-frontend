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

                <div className="w-[930px] py-3 bg-slate-800 rounded-2xl flex items-center">
                    <div className="px-10 h-[45px] bg-slate-900 flex justify-center items-center rounded-xl ml-3 mr-auto">
                        <span className="font-semibold text-slate-200 text-[20px]">MONTHLY</span>
                    </div>
                    <div className="pl-10 pr-5 h-[45px] bg-orange-500 flex justify-center items-center rounded-xl ml-auto mr-auto">
                        <span className="font-semibold text-slate-200 text-[20px]">QUARTERLY</span>
                        <div className="h-7 bg-orange-200 flex justify-center items-center rounded-lg px-3 ml-5 mr-auto">
                            <span className="text-orange-700 font-semibold text-[14px]">Save 35%</span>
                        </div>
                    </div>
                    <div className="pl-10 pr-5 h-[45px] bg-slate-900 flex justify-center items-center rounded-xl ml-auto mr-3">
                        <span className="font-semibold text-slate-200 text-[20px]">ANNUALLY</span>
                        <div className="h-7 bg-emerald-200 flex justify-center items-center rounded-lg px-3 ml-5 mr-auto">
                            <span className="text-emerald-700 font-semibold text-[14px]">Save 35%</span>
                        </div>
                    </div>
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
                        <div className="flex mt-auto items-center justify-center w-[100%] h-[52px] bg-[#0B1321] mx-auto rounded-[26px]">
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
                        <div className="flex items-center justify-center w-[100%] h-[52px] bg-[#0B1321] mx-auto rounded-[26px]">
                            <span>Get Started</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-[75%] mt-10 mb-10">
                    <span className="text-orange-500 font-semibold text-[16px] mb-3">Features</span>
                    <span className="text-[36px] mb-3">Beautiful analytics to grow smarter</span>
                    <span className="text-[#949DAD] text-[20px]">Powerful, self-serve product and growth analytics to help you convert, </span>
                    <span className="text-[#949DAD] text-[20px]">engage, and retain more users. Trusted by over 4,000 startups. </span>
                </div>

                <div className="grid grid-cols-3 gap-y-[80px] gap-x-[80px] mx-[12.5%] my-12">

                    <div>
                        <div className="mb-5"><img src="/images/assets/priconone.svg" /></div>
                        <span className="font-medium text-[20px] flex my-2.5">Share team inboxes</span>
                        <span className="text-[16px] text-[#667085]">Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.</span>
                        <span className="block text-[16px] text-orange-500 mt-5">Learn more</span>
                    </div>
                    <div>
                        <div className="mb-5"><img src="/images/assets/pricon2.svg" /></div>
                        <span className="font-medium text-[20px] flex my-2.5">Deliver instant answers</span>
                        <span className="text-[16px] text-[#667085]">An all-in-one customer service platform that helps you balance everything your customers need to be happy.</span>
                        <span className="block text-[16px] text-orange-500 mt-5">Learn more</span>
                    </div>
                    <div>
                        <div className="mb-5"><img src="/images/assets/pricon3.svg" /></div>
                        <span className="font-medium text-[20px] flex my-2.5">Manage your team with reports</span>
                        <span className="text-[16px] text-[#667085]">Measure what matters with Untitled’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.</span>
                        <span className="block text-[16px] text-orange-500 mt-5">Learn more</span>
                    </div>
                    <div>
                        <div className="mb-5"><img src="/images/assets/pricon4.svg" /></div>
                        <span className="font-medium text-[20px] flex my-2.5">Connect with customers</span>
                        <span className="text-[16px] text-[#667085]">Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.</span>
                        <span className="block text-[16px] text-orange-500 mt-5">Learn more</span>
                    </div>
                    <div>
                        <div className="mb-5"><img src="/images/assets/pricon5.svg" /></div>
                        <span className="font-medium text-[20px] flex my-2.5">Connect the tools you already use</span>
                        <span className="text-[16px] text-[#667085]">Explore 100+ integrations that make your day-to-day workflow more efficient and familiar. Plus, our extensive developer tools.</span>
                        <span className="block text-[16px] text-orange-500 mt-5">Learn more</span>
                    </div>
                    <div>
                        <div className="mb-5"><img src="/images/assets/pricon6.svg" /></div>
                        <span className="font-medium text-[20px] flex my-2.5">Our people make the difference</span>
                        <span className="text-[16px] text-[#667085]">We’re an extension of your customer service team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.</span>
                        <span className="block text-[16px] text-orange-500 mt-5">Learn more</span>
                    </div>

                </div>

                <div className="flex flex-col w-[75%] mt-10 mb-10">
                    <span className="text-orange-500 font-semibold text-[16px] mb-3">Features</span>
                    <span className="text-[36px] mb-3">Beautiful analytics to grow smarter</span>
                    <span className="text-[#949DAD] text-[20px]">Powerful, self-serve product and growth analytics to help you convert, </span>
                    <span className="text-[#949DAD] text-[20px]">engage, and retain more users. Trusted by over 4,000 startups. </span>
                </div>

            </main>

        </>
    );
}
export default Page;
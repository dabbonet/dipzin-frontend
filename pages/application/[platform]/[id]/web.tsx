import { ReactElement, useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import Screen from "./screen"

const Web: NextPage = () => {
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

            <main className="w-full flex flex-col items-center">


                <div className="flex w-[100%] h-[25%] mt-[100px] mb-[65px] items-center text-white z-10">
                    <img className="h-[40%] w-[4.8%] ml-[13%] rounded-2xl bg-slate-500" src="/images/assets/appicon.svg" />
                    <div className="ml-12">
                        <span className="text-[32px] font-medium">Hollister</span>
                        <span className="block text-[16px] text-[#8F94A1]">Fashion & Fitness</span>
                    </div>
                    <div className="ml-auto flex flex-col items-center">
                        <span className="text-[32px] font-medium">342</span>
                        <span className="block text-[16px] text-[#8F94A1]">Screen</span>
                    </div>
                    <div className="ml-[100px] mr-[13%] flex flex-col items-center">
                        <span className="text-[32px] font-medium">3</span>
                        <span className="block text-[16px] text-[#8F94A1]">Language</span>
                    </div>
                </div>

                <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-4 lg:gap-5 gap-5 mb-10 grid-cols-2">
                    <div className="flex justify-center items-center relative group/item cursor-pointer">
                        <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-105">
                            <img className="h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src='https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Ff13a9dc3-c068-45ee-bc54-2796ead3a7b8.png&w=1920&q=85' />
                            <div className="absolute w-[100%] bottom-3 flex justify-start items-center drop-shadow-xl opacity-0 transform transition duration-500 group-hover/item:opacity-100 z-20" >
                                <img className="h-[15%] w-[15%] ml-[4%] rounded-full" src="/images/assets/appicon.svg" />
                                <div className="text-white">
                                    <span className="ml-2 text-[15px] font-semibold">Hollister</span>
                                    <span className="block text-[10px] font-light ml-2">Fashion & Fitness</span>
                                </div>
                                <img className="ml-auto mr-[4%] h-[10%] w-[10%]" src="/images/assets/screenzome.svg" />
                            </div>
                            <div className="absolute bottom-0 w-[100%] h-[30%] bg-gradient-to-t from-black opacity-80 z-10 invisible transform transition duration-500 group-hover/item:visible"></div>
                        </div>
                    </div>

                    <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F34dc8866-c38e-4a8c-80f2-52d50a0d3fd1.png&w=1920&q=85" />
                    <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F025b9446-7ba2-4567-b3ae-3a9cdd604dd8.png&w=1920&q=85" />
                    <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Ff13a9dc3-c068-45ee-bc54-2796ead3a7b8.png&w=1920&q=85" />
                    <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Fd3c96840-0733-4599-8050-23cadfd1787b.png&w=1280&q=85" />
                    <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Ff13a9dc3-c068-45ee-bc54-2796ead3a7b8.png&w=1920&q=85" />
                    <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F4afcb257-a0ad-46bf-af8d-f8ba116a90f1.png&w=1280&q=85" />
                    <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Ff13a9dc3-c068-45ee-bc54-2796ead3a7b8.png&w=1920&q=85" />
                    <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F025b9446-7ba2-4567-b3ae-3a9cdd604dd8.png&w=1920&q=85" />
                    <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Ff13a9dc3-c068-45ee-bc54-2796ead3a7b8.png&w=1920&q=85" />
                    <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Fd3c96840-0733-4599-8050-23cadfd1787b.png&w=1280&q=85" />

                </div>

            </main>
        </>
    );
}
export default Web;
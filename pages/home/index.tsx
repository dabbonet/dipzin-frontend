import { ReactElement, useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import Screen from "./screen"

const Page: NextPage = () => {
    const [platform, setPlatform] = useState<any>("IOS");

    const [tabStream, setTabStream] = useState<boolean>(true);
    const [timerBlur, setTimerBlur] = useState<boolean>(true);

    const [screenOpen, setScreenOpen] = useState<boolean>(false);
    const [webScreenOpen, setWebScreenOpen] = useState<boolean>(false);

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
                    <div className="w-[40%] h-[50%] bg-slate-900 rounded-3xl border-[1px] border-slate-700 p-10 text-white flex flex-col">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <span className="text-orange-400 text-[48px] mr-10 w-[110px]">00:{countdown}</span>
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

            <header className="w-full flex justify-between fixed items-center text-white mt-8 px-10 z-10">
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

                <div className="lg:w-[75%] max-w-[75%] mt-18 mt-[90px] rounded-[42px]" >
                    <img className="h-auto w-full" src="/images/assets/banner.svg" alt="banner" />
                </div>

                <div className="min-w-[75%] flex mt-10 mb-[55px] items-end">
                    <a onClick={() => { setTabStream(true) }} className="cursor-pointer flex items-center"><span className="text-white text-5xl font-light">Stream</span><img className="ml-3 transorm duration-[600ms] hover:rotate-90" src="/images/assets/refresh.svg" /></a>
                    <a onClick={() => { setTabStream(false) }} className="cursor-pointer"><span className="text-gray-400 text-4xl ml-12 opacity-70 font-light">Collections</span></a>
                </div>

                {tabStream ? (
                    <>
                        {platform == "Web" ? (
                            <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-4 lg:gap-5 gap-5 mb-10 grid-cols-2">
                                <div className="flex justify-center items-center relative group/item cursor-pointer" onClick={() => { setWebScreenOpen(true) }}>
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
                        ) : (
                            <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-6 lg:gap-5 gap-5 mb-10 grid-cols-2">
                                <div className="flex justify-center items-center relative group/item cursor-pointer" onClick={() => { setScreenOpen(true) }}>
                                    <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-105">
                                        <img className="h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src='https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/e237b8fa-192f-47ad-ac6b-370330b5ba38.png' />
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
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/5064be39-8584-4bfc-ad7e-b9d0a06cd5b9.png" />
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/619/42855630-fe26-46ae-b248-e09a62f8b8d6.png" />
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/731/5769262d-f575-438f-884a-200cef298f6e.png" />
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/728/545daa87-efdc-4f92-a970-4ded077805a8.png" />
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/e237b8fa-192f-47ad-ac6b-370330b5ba38.png" />
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/5064be39-8584-4bfc-ad7e-b9d0a06cd5b9.png" />
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/731/5769262d-f575-438f-884a-200cef298f6e.png" />
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/619/42855630-fe26-46ae-b248-e09a62f8b8d6.png" />
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/728/545daa87-efdc-4f92-a970-4ded077805a8.png" />
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/e237b8fa-192f-47ad-ac6b-370330b5ba38.png" />
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/5064be39-8584-4bfc-ad7e-b9d0a06cd5b9.png" />
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/731/5769262d-f575-438f-884a-200cef298f6e.png" />
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/619/42855630-fe26-46ae-b248-e09a62f8b8d6.png" />
                                <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/728/545daa87-efdc-4f92-a970-4ded077805a8.png" />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-4 lg:gap-5 gap-5 mb-10 grid-cols-1">
                        <div className="relative mb-7">
                            <div className="grid lg:grid-cols-3 lg:gap-4 bg-slate-800 rounded-2xl p-3  mr-4 ml-4">
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                            </div>
                            <div className="text-white flex flex-col mt-5 pl-5">
                                <span className="font-medium mb-1 text-xl">Collection Name</span>
                                <span className="font-light">Modified: <span className="font-medium">1m ago</span></span>
                            </div>
                        </div>
                        <div className="relative mb-7">
                            <div className="grid lg:grid-cols-3 lg:gap-4 bg-slate-800 rounded-2xl p-3  mr-4 ml-4">
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                            </div>
                            <div className="text-white flex flex-col mt-5 pl-5">
                                <span className="font-medium mb-1 text-xl">Collection Name</span>
                                <span className="font-light">Modified: <span className="font-medium">1m ago</span></span>
                            </div>
                        </div>
                        <div className="relative mb-7">
                            <div className="grid lg:grid-cols-3 lg:gap-4 bg-slate-800 rounded-2xl p-3  mr-4 ml-4">
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                            </div>
                            <div className="text-white flex flex-col mt-5 pl-5">
                                <span className="font-medium mb-1 text-xl">Collection Name</span>
                                <span className="font-light">Modified: <span className="font-medium">1m ago</span></span>
                            </div>
                        </div>
                        <div className="relative mb-7">
                            <div className="grid lg:grid-cols-3 lg:gap-4 bg-slate-800 rounded-2xl p-3  mr-4 ml-4">
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                            </div>
                            <div className="text-white flex flex-col mt-5 pl-5">
                                <span className="font-medium mb-1 text-xl">Collection Name</span>
                                <span className="font-light">Modified: <span className="font-medium">1m ago</span></span>
                            </div>
                        </div>
                        <div className="relative mb-7">
                            <div className="grid lg:grid-cols-3 lg:gap-4 bg-slate-800 rounded-2xl p-3  mr-4 ml-4">
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                                <img className="h-full w-full rounded-xl" src="/images/assets/collappicon.svg" />
                            </div>
                            <div className="text-white flex flex-col mt-5 pl-5">
                                <span className="font-medium mb-1 text-xl">Collection Name</span>
                                <span className="font-light">Modified: <span className="font-medium">1m ago</span></span>
                            </div>
                        </div>
                    </div>
                )}

                {screenOpen && (
                    <div className="w-[110%] h-[100%] fixed bg-opacity-50 bg-[#0D1018] backdrop-blur-xl z-40 flex flex-col overflow-y-scroll" onClick={() => { setScreenOpen(false) }}>
                        <div className="flex w-[100%] h-[25%] mt-5 mb-3 items-center text-white z-50">
                            <img className="h-[40%] ml-[13%] rounded-2xl bg-slate-500" src="/images/assets/appicon.svg" />
                            <div className="ml-12">
                                <span className="text-[32px] font-medium">Hollister</span>
                                <span className="block text-[16px] text-[#8F94A1]">Fashion & Fitness</span>
                            </div>
                        </div>
                        <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-5 lg:gap-10 gap-10 grid-cols-2 ml-auto mr-auto z-50">
                            <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/e237b8fa-192f-47ad-ac6b-370330b5ba38.png" />
                            <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/5064be39-8584-4bfc-ad7e-b9d0a06cd5b9.png" />
                            <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/619/42855630-fe26-46ae-b248-e09a62f8b8d6.png" />
                            <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/731/5769262d-f575-438f-884a-200cef298f6e.png" />
                            <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/728/545daa87-efdc-4f92-a970-4ded077805a8.png" />
                        </div>
                    </div>
                )}

                {webScreenOpen && (
                    <div className="w-[110%] h-[100%] fixed bg-opacity-50 bg-[#0D1018] backdrop-blur-xl z-40 flex flex-col overflow-y-scroll" onClick={() => { setWebScreenOpen(false) }}>
                        <div className="flex w-[100%] h-[25%] mt-[60px] mb-[60px] items-center text-white z-50">
                            <img className="h-[110%] ml-[12.8%] rounded-2xl bg-slate-500" src="/images/assets/appicon.svg" />
                            <div className="ml-12">
                                <span className="text-[32px] font-medium">Hollister</span>
                                <span className="block text-[16px] text-[#8F94A1]">Fashion & Fitness</span>
                            </div>
                        </div>
                        <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-2 lg:gap-[60px] gap-10 grid-cols-1 ml-auto mr-auto z-50 mb-10">
                            <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Ff13a9dc3-c068-45ee-bc54-2796ead3a7b8.png&w=1920&q=85" />
                            <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F4afcb257-a0ad-46bf-af8d-f8ba116a90f1.png&w=1280&q=85" />
                            <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Ff13a9dc3-c068-45ee-bc54-2796ead3a7b8.png&w=1920&q=85" />
                            <Screen src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F025b9446-7ba2-4567-b3ae-3a9cdd604dd8.png&w=1920&q=85" />
                        </div>
                    </div>
                )}


            </main>
        </>
    );
}
export default Page;
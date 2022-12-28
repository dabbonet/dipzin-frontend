import { ReactElement, useState } from "react";
import { NextPage } from "next";
import Screen from "./screen"

const Page: NextPage = () => {
    const [platform, setPlatform] = useState<any>("IOS");

    const [tabStream, setTabStream] = useState<boolean>(false);

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
                    <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-6 lg:gap-5 gap-5 mb-10 grid-cols-2">

                        <Screen src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/e237b8fa-192f-47ad-ac6b-370330b5ba38.png" />
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

                <div className="w-[100%] h-[100%] fixed bg-opacity-60 bg-[#0D1018] backdrop-blur-xl  flex justify-center items-center">
                    <div className="w-[40%] h-[50%] bg-slate-900 rounded-3xl border-[1px] border-slate-600 p-10 text-white">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <span className="text-orange-400 text-[48px] mr-10">00:05</span>
                                <span className="h-[60%] bg-gradient-to-b from-orange-500 to-orange-600 flex justify-center items-center p-5 rounded-xl font-medium text-[14px]">Unlock More!</span>
                            </div>
                            <span className="mt-2"><img src="/images/assets/close.svg" /></span>
                        </div>

                        <span>Upgrade and get access to exclusive features</span>

                        <div>
                            <div>
                                <div>
                                    <span>icon</span>
                                    <span>Download in bulk</span>
                                    <span>icon</span>
                                    <span>Unlimited Collections</span>
                                </div>
                                <div>
                                    <span>icon</span>
                                    <span>Select and Copy</span>
                                    <span>icon</span>
                                    <span>Unlimited Search & Filters</span>
                                </div>
                            </div>

                        </div>

                        <img className="h-auto w-full" src="/images/assets/banner.svg" alt="banner" />
                    </div>
                </div>

            </main>
        </>
    );
}
export default Page;
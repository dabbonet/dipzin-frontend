import { ReactElement, useState } from "react";
import { NextPage } from "next";
const Page: NextPage = () => {
    const [platform, setPlatform] = useState<any>("IOS");

    const handlePlateformUp = () => {
        if(platform == "IOS"){
            setPlatform("Android");
        } else if(platform == "Android"){
            setPlatform("Web");
        } else if(platform == "Web"){
            setPlatform("IOS");
        }
    } 

    const handlePlateformDown = () => {
        if(platform == "Web"){
            setPlatform("Android");
        } else if(platform == "Android"){
            setPlatform("IOS");
        } else if(platform == "IOS"){
            setPlatform("Web");
        }
    } 

    return (
        <>
            <header className="w-full flex justify-between fixed items-center text-white mt-8 px-10 z-10">
                <div className="text-2xl"><span className="font-normal">dipz<span className="font-light">in</span><span className="text-orange-500">.</span></span></div>
                <div className="w-[180px] h-[35px] bg-[#1B2132] rounded-3xl flex items-center justify-between pl-3 pr-3 text-sm font-light">
                    <span>Paltform <span className="font-normal">{platform}</span></span>
                    <div>
                        <img onClick={handlePlateformUp} className="mb-1 cursor-pointer" src="/images/assets/moveup.svg" />
                        <img onClick={handlePlateformDown} className="cursor-pointer" src="/images/assets/movedown.svg" />
                    </div>
                </div>
                <div className="w-[65px] h-[35px] bg-slate-300 rounded-full flex items-center justify-center text-sm font-normal text-slate-800"><span>Try it!</span></div>
            </header>

            <main className="w-full flex flex-col items-center">

                <div className="lg:w-[75%] max-w-[75%] mt-18 mt-[90px] rounded-[42px]" >
                    <img className="h-auto w-full" src="/images/assets/banner.svg" alt="banner" />
                </div>

                <div className="min-w-[75%] flex mt-10 mb-[55px] items-end">
                    <a className="cursor-pointer flex items-center"><span className="text-white text-5xl font-light">Stream</span><img className="ml-3 transorm duration-[600ms] hover:rotate-90" src="/images/assets/refresh.svg" /></a>
                    <a className="cursor-pointer"><span className="text-gray-400 text-4xl ml-12 opacity-70 font-light">Collections</span></a>
                </div>

                <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-6 lg:gap-5 gap-5 mb-10 grid-cols-2">

                    <div className="flex justify-center items-center relative">
                        <div className="rounded-2xl overflow-hidden min-720:gap-16 sm:gap-5 transform transition duration-500 hover:scale-105">
                            <img className="h-full w-full border-[2px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F4cd2000b-5712-461b-ac15-79d29aae7bf6.png&w=360&q=85" />
                            <div className="absolute w-[100%] top-8 flex justify-center drop-shadow-xl">
                                <img className="h-[50%] w-full" src="/images/assets/addpng.svg" />
                                <img src="/images/assets/addcopy.svg" />
                                <img src="/images/assets/addcollection.svg" />
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-center items-center">
                        <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-105">
                            <img className="h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F6b24531a-10b9-46d8-a5fa-1a87233430cf.png&w=720&q=85" />
                        </div>
                    </div>

                    <div className="flex justify-center items-center relative">
                        <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-105">
                            <img className="h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Fece20f10-696c-432b-a2e9-d22116e20344.png&w=1440&q=85" />
                            <div className="absolute w-[100%] top-4 flex justify-center drop-shadow-xl">
                                <img className=" h-[30%] w-[30%] transform transition duration-500 hover:scale-110 cursor-pointer" src="/images/assets/addpng.svg" />
                                <img className=" h-[30%] w-[30%] transform transition duration-500 hover:scale-110 cursor-pointer" src="/images/assets/addcopy.svg" />
                                <img className=" h-[30%] w-[30%] transform transition duration-500 hover:scale-110 cursor-pointer" src="/images/assets/addcollection.svg" />
                            </div>
                            <div className="absolute w-[100%] bottom-5 flex justify-start drop-shadow-xl" >
                                <img className="h-[20%] w-[25%] ml-[4%] rounded-full" src="/images/assets/appicon.svg" />
                                <div className="text-white">
                                    <span className="ml-1 text-[16px] font-semibold">Hollister</span>
                                    <span className="block text-[8px] font-light ml-1">Fashion & Fitness</span>
                                </div>
                                <img className="ml-auto mr-[4%] h-[20%] w-[25%]" src="/images/assets/screenzome.svg" />

                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-105">
                            <img className="h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F4cd2000b-5712-461b-ac15-79d29aae7bf6.png&w=360&q=85" />
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-110">
                            <img className="h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F6b24531a-10b9-46d8-a5fa-1a87233430cf.png&w=720&q=85" />
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-110">
                            <img className="h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-white" src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Fece20f10-696c-432b-a2e9-d22116e20344.png&w=1440&q=85" />
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-110">
                            <img className="h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-white" src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Fece20f10-696c-432b-a2e9-d22116e20344.png&w=1440&q=85" />
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-110">
                            <img className="h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F4cd2000b-5712-461b-ac15-79d29aae7bf6.png&w=360&q=85" />
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-110">
                            <img className="h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F6b24531a-10b9-46d8-a5fa-1a87233430cf.png&w=720&q=85" />
                        </div>
                    </div>




                </div>
            </main>
        </>
    );
}
export default Page;
import { NextPage } from "next";
const Page: NextPage = () => {
    return (
        <>
            <header className="w-full flex justify-between fixed items-center text-white mt-8 px-10">
                <div className="text-2xl"><span className="font-normal">dipz<span className="font-light">in</span><span className="text-orange-500">.</span></span></div>
                <div className="w-[150px] h-[35px] bg-[#1B2132] rounded-3xl flex items-center justify-start pl-3 text-sm font-light"><span>Paltform <span className="font-bold">IOS</span></span></div>
                <div className="w-[65px] h-[35px] bg-slate-300 rounded-full flex items-center justify-center text-sm font-normal text-slate-800"><span>Try it!</span></div>
            </header>

            <main className="w-full flex flex-col items-center">
                <div className="max-w-[75%] 2xl:h-[365px] mt-18 mt-[90px] rounded-[42px]" >
                    <img className="h-full w-full" src="/images/assets/banner.svg" alt="banner" />
                </div>
                <div className="min-w-[75%] flex mt-10 mb-[55px] items-end">
                    <a className="cursor-pointer flex items-center"><span className="text-white text-5xl font-light">Stream</span><img className="ml-3" src="/images/assets/refresh.svg" /></a>
                    <a className="cursor-pointer"><span className="text-gray-400 text-4xl ml-12 opacity-70 font-light">Collections</span></a>
                </div>

                <div className="w-[75%] grid grid-cols-6 gap-16 lg:gap-5 md:gap-5 mb-10">

                    <div className="flex justify-center items-center">
                    <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-110">
                            <img className="h-full w-full border-[2px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F4cd2000b-5712-461b-ac15-79d29aae7bf6.png&w=360&q=85" />
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                    <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-110">
                            <img className="h-full w-full border-[2px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2F6b24531a-10b9-46d8-a5fa-1a87233430cf.png&w=720&q=85" />
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-110">
                            <img className="h-full w-full border-[2px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Fece20f10-696c-432b-a2e9-d22116e20344.png&w=1440&q=85" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-110">
                            <img className="h-full w-full border-[2px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src="https://mobbin.com/_next/image?url=https%3A%2F%2Fujasntkfphywizsdaapi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcontent%2Fapp_screens%2Fece20f10-696c-432b-a2e9-d22116e20344.png&w=1440&q=85" />
                        </div>
                    </div>
                    
                   
                </div>
            </main>
        </>
    );
}
export default Page;
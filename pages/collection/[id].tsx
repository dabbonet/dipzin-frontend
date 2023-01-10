import { ReactElement, useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import Screen from "../../components/screen";

const Page: NextPage = () => {

    return (
        <>

            <div className="fixed right-10 top-[350px] w-[95px] h-[317px] py-1 bg-slate-900/30 border border-slate-800 rounded-2xl flex flex-col justify-between">
                <div className="w-[82px] h-[70px] m-auto rounded-xl bg-slate-800 hover:border-[2.5px] hover:border-slate-700 cursor-pointer"></div>
                <div className="w-[82px] h-[70px] m-auto rounded-xl bg-slate-800 hover:border-[2.5px] hover:border-slate-700 cursor-pointer"></div>
                <div className="w-[82px] h-[70px] m-auto rounded-xl bg-slate-800 hover:border-[2.5px] hover:border-slate-700 cursor-pointer"></div>
                <div className="w-[82px] h-[70px] m-auto rounded-xl bg-slate-800 hover:border-[2.5px] hover:border-slate-700 cursor-pointer"></div>
            </div>

            <main className="w-full flex flex-col items-center">
                <div className="flex w-[100%] h-[25%] mt-[100px] mb-[65px] items-center text-white z-10">
                    <img className="w-16 h-auto ml-[13%]" src="/images/assets/privateCollection.svg" />
                    <div className="ml-6">
                        <span className="text-[32px] font-medium">Collection Name</span>
                        <span className="block text-[16px] text-[#8F94A1]">Modified: 1m ago</span>
                    </div>

                </div>
                <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-6 lg:gap-5 gap-5 mb-10 grid-cols-2">
                    <div className="flex justify-center items-center relative group/item cursor-pointer">
                        <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-105">
                            <img className="h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src='https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/e237b8fa-192f-47ad-ac6b-370330b5ba38.png' />
                            <div className="absolute w-[100%] top-4 flex justify-center drop-shadow-xl ">
                                <img className=" h-[25%] w-[25%] transform transition duration-500 hover:scale-110 cursor-pointer opacity-0 group-hover/item:opacity-100" src="/images/assets/addpng.svg" />
                                <img className=" h-[25%] w-[25%] transform transition duration-500 hover:scale-110 cursor-pointer opacity-0 group-hover/item:opacity-100" src="/images/assets/addcopy.svg" />
                                <img className=" h-[25%] w-[25%] transform transition duration-500 hover:scale-110 cursor-pointer opacity-0 group-hover/item:opacity-100" src="/images/assets/addcollection.svg" />
                            </div>
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

            </main>
        </>
    );
}
export default Page;
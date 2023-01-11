import { ReactElement, useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import Screen from "../../components/screen";
import clsx from "clsx";
import Tabs from "../../components/tabs";
import CollectionSideNavigator from "../../components/navigator/main/side";


const Page: NextPage = () => {
    // const tabs=['tab 1', 'tab 2', 'tab3'];
    const [currentTab,setCurrentTab] = useState('Personal');
    
    return (
        <>
            <header className="w-full flex justify-between fixed items-center text-white mt-8 px-10 z-10">
                <div className="text-2xl">
                <a href="/home" className="font-semibold">
                    dipz<span className="font-light">in</span>
                    <span className="text-orange-500">.</span>
                </a>
                </div>

                <div className="w-[65px] h-[35px] bg-slate-300 rounded-full flex items-center justify-center text-sm font-normal text-slate-800">
                <a href="/auth">Try it!</a>
                </div>
            </header>
            <CollectionSideNavigator />

            <main className="w-full flex flex-col items-center">
                <div className="flex w-[75%] h-[25%] mt-[100px] mb-[65px] items-center text-white z-10">
                    <img className="w-16 h-auto" src="/images/assets/privateCollection.svg" />
                    <div className="ml-6">
                        <span className="text-[32px] font-medium">Collection Name</span>
                        <span className="block text-[16px] text-[#8F94A1]">Modified: 1m ago</span>
                    </div>
                    <div className="ml-auto flex flex-col items-center">
                        <Tabs
                            tabs={["Personal", "Community"]}
                            currentTab={currentTab}
                            setCurrentTab={setCurrentTab}
                        />
                    </div>
                    
                </div>
                <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-6 lg:gap-5 mb-10 grid-cols-2">
                    <Screen platform={0} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/5064be39-8584-4bfc-ad7e-b9d0a06cd5b9.png"  />
                    <Screen platform={0} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/619/42855630-fe26-46ae-b248-e09a62f8b8d6.png" />
                    <Screen platform={0} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/731/5769262d-f575-438f-884a-200cef298f6e.png" />
                    <Screen platform={0} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/728/545daa87-efdc-4f92-a970-4ded077805a8.png" />
                    <Screen platform={0} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/e237b8fa-192f-47ad-ac6b-370330b5ba38.png" />
                    <Screen platform={0} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/5064be39-8584-4bfc-ad7e-b9d0a06cd5b9.png" />
                    <Screen platform={0} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/731/5769262d-f575-438f-884a-200cef298f6e.png" />
                    <Screen platform={0} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/619/42855630-fe26-46ae-b248-e09a62f8b8d6.png" />
                    <Screen platform={0} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/728/545daa87-efdc-4f92-a970-4ded077805a8.png" />
                    <Screen platform={0} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/e237b8fa-192f-47ad-ac6b-370330b5ba38.png" />
                    <Screen platform={0} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/5064be39-8584-4bfc-ad7e-b9d0a06cd5b9.png" />
                    <Screen platform={0} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/731/5769262d-f575-438f-884a-200cef298f6e.png" />
                    <Screen platform={0} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/619/42855630-fe26-46ae-b248-e09a62f8b8d6.png" />
                    <Screen platform={1} src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/728/545daa87-efdc-4f92-a970-4ded077805a8.png" />

                </div>

            </main>
        </>
    );
}
export default Page;
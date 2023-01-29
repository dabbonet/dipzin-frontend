import Screen from "../../../components/screen";
import { ReactElement, useState, useRef, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

interface Props {
  app: any;
}

const Mobile = ({ app }: Props) => {
  const toIconUrl = (pathname: string) =>
    process.env.NEXT_PUBLIC_SUPABASE_URL +
    "/storage/v1/object/public/application/icons/" +
    pathname;
  const toStorageUrl = (pathname: string) =>
    process.env.NEXT_PUBLIC_SUPABASE_URL +
    "/storage/v1/object/public/application/screens/" +
    app.id +
    "/" +
    pathname;

  if (!app) {
    return null;
  }

  const [save, setSave] = useState<any>(false);

  useEffect(() => {
    console.log(app);
  }, []);

  return (
    <>
      <div className="fixed right-10 top-[35%] w-[100px] py-2.5 bg-slate-900/30 border border-slate-800 rounded-2xl flex flex-col justify-between z-50">
        <div className="w-[82px] h-[70px] mb-3 p-2 m-auto rounded-xl bg-[#0B1321] border-[3px] border-[#0B1321] hover:border-slate-700 cursor-pointer">
          <img className="ml-auto mb-3" src="/images/assets/like.svg" />
          <span className="text-white text-[12px] mt-auto">Like App</span>
        </div>
        <div
          onClick={() => {
            window.open(app.storelink, "_blank", "noreferrer");
          }}
          className="w-[82px] h-[76px] mb-3 p-2 m-auto rounded-xl bg-[#0B1321] border-[3px] border-[#0B1321] hover:border-slate-700 cursor-pointer"
        >
          <img className="ml-auto" src="/images/assets/apple.svg" />
          <span className="text-white text-[12px] mt-auto">App Store</span>
        </div>
        <div
          onClick={() => {
            setSave(!save);
          }}
          className={`relative w-[82px] h-[70px] p-2 m-auto rounded-xl mb-3 bg-[#0B1321] border-[3px] border-[#0B1321] hover:border-slate-700 cursor-pointer`}
        >
          <img className="ml-auto mb-3" src="/images/assets/save.svg" />
          <span className="text-white text-[12px] mt-auto relative">Save</span>
          {save && (
            <div className="absolute top-0 right-[100px] bg-slate-900 py-[16px] w-[250px] z-50 px-3 rounded-xl">
              <div className="flex items-center py-[6px] hover:bg-slate-800 rounded-lg mb-2 cursor-pointer">
                <img
                  src="/images/assets/publicIcon.svg"
                  className="mx-1 mr-2"
                />
                <span className="font-medium text-slate-100 text-[12px] mr-2">
                  Public Collection 2
                </span>
              </div>
              <div className="flex items-center py-[6px] hover:bg-slate-800 rounded-lg mb-2 cursor-pointer">
                <img
                  src="/images/assets/publicIcon.svg"
                  className="mx-1 mr-2"
                />
                <span className="font-medium text-slate-100 text-[12px] mr-2">
                  Public Collection 2
                </span>
              </div>
              <div className="flex items-center py-[6px] hover:bg-slate-800 rounded-lg mb-2 cursor-pointer">
                <img
                  src="/images/assets/privateIcon.svg"
                  className="mx-1 mr-2"
                />
                <span className="font-medium text-slate-100 text-[12px] mr-2">
                  Private Collection
                </span>
              </div>
              <span className="flex items-center justify-center py-2 bg-slate-800 rounded-2xl font- text-[12px] mt-3 text-slate-100">
                Create Collection
              </span>
            </div>
          )}
        </div>
        <div
          onClick={async () => {
            await navigator.clipboard.writeText(location.href);
          }}
          className="w-[82px] h-[76px] mb-0 p-2 m-auto rounded-xl bg-[#0B1321] border-[3px] border-[#0B1321] hover:border-slate-700 cursor-pointer"
        >
          <img className="ml-auto" src="/images/assets/copyLink2.svg" />
          <span className="text-white text-[12px] mt-auto">Copy Link</span>
        </div>
      </div>

      <main className="w-full flex flex-col items-center">
        <div className="flex w-[100%] h-[25%] mt-[100px] mb-[65px] items-center text-white z-10">
          <img
            className="h-[40%] w-[4.8%] ml-[13%] rounded-2xl bg-slate-500"
            src={toIconUrl(app.icon)}
          />
          <div className="ml-12">
            <span className="text-[32px] font-medium">{app.name}</span>
            <span className="block text-[16px] text-[#8F94A1]">
              {app.tagline}
            </span>
          </div>

          <div className="ml-auto flex flex-col text-right">
            <span className="text-[20px] font-medium">
              {app.app_category.name}
            </span>
            <span className="block text-[16px] text-[#8F94A1]">
              App Category
            </span>
          </div>
          <div className="ml-[100px] mr-[13%] flex flex-col text-right">
            <span className="text-[20px] font-medium">{app.copyright}</span>
            <span className="block text-[16px] text-[#8F94A1]">@copyright</span>
          </div>
        </div>
        <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-6 lg:gap-5 gap-5 mb-10 grid-cols-2">
          {app &&
            app.screen.map((screen: any) => {
              // console.log(screen.url)
              return (
                <Screen
                  platform={1}
                  key={screen.id}
                  src={toStorageUrl(screen.url)}
                />
              );
            })}
        </div>
      </main>
    </>
  );
};
export default Mobile;

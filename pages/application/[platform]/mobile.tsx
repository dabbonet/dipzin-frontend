import Screen from "../../../components/screen";

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

  return (
    <>
      <div className="fixed right-10 top-[35%] w-[100px] py-2.5 bg-slate-900/30 border border-slate-800 rounded-2xl flex flex-col justify-between z-50">
        <div className="w-[82px] h-[70px] mb-3 p-2 m-auto rounded-xl bg-slate-800 border-[3px] border-slate-800 hover:border-slate-700 cursor-pointer">
          <img className="ml-auto mb-3" src="/images/assets/like.svg" />
          <span className="text-white text-[12px] mt-auto">Like App</span>
        </div>
        <div className="w-[82px] h-[76px] mb-3 p-2 m-auto rounded-xl bg-slate-800 border-[3px] border-slate-800 hover:border-slate-700 cursor-pointer">
          <img className="ml-auto" src="/images/assets/apple.svg" />
          <span className="text-white text-[12px] mt-auto">App Store</span>
        </div>
        <div className="w-[82px] h-[70px] p-2 m-auto rounded-xl mb-3 bg-slate-800 border-[3px] border-slate-800 hover:border-slate-700 cursor-pointer">
          <img className="ml-auto mb-3" src="/images/assets/save.svg" />
          <span className="text-white text-[12px] mt-auto">Save</span>
        </div>
        <div className="w-[82px] h-[76px] p-2 m-auto rounded-xl bg-slate-800 border-[3px] border-slate-800 hover:border-slate-700 cursor-pointer">
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
          <div className="ml-auto flex flex-col items-center">
            <span className="text-[32px] font-medium">{app.screen.length}</span>
            <span className="block text-[16px] text-[#8F94A1]">Screen</span>
          </div>
          <div className="ml-[100px] mr-[13%] flex flex-col items-center">
            <span className="text-[32px] font-medium">1</span>
            <span className="block text-[16px] text-[#8F94A1]">Language</span>
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

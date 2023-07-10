"use client";
import { usePlatform } from "@/lib/platforms";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useEffect } from "react";

const PlatformSwitcher = () => {
  const { platforms, singleApp, selected, setSelected } = usePlatform();
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const slug = segments[3];
  const platform = segments[1]

  useEffect(()=>{
    if(!singleApp){
      const selectedPlatform = platforms.find(el => el.name.toUpperCase() === platform?.toUpperCase())
      setSelected(selectedPlatform?.id)
    }
  },[platform])
  if (platforms.length < 2) return null; // hide if there is no platforms
  const platformsUI = () => {
    return platforms.map((platformAvailable, index) => {
      let selectedBackGround
      if (selected === platformAvailable.id) {
        selectedBackGround = ' bg-slate-800'
      }
      const switchApps = () => {
        if (singleApp) {
          router.push(
            `/app/${platforms[index].name.toLowerCase()}/${slug}`
          );
        } else {
          setSelected(platformAvailable.id);
          router.push(`/${platformAvailable.name.toLocaleLowerCase()}`)
        }
      }
      return (
        <div
          onClick={switchApps}
          key={index}
          className={`${selectedBackGround}  py-[0.3rem] px-[0.7rem] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
        >
          <span className="uppercase">{platformAvailable.name}</span>
        </div>
      )
    })
  }

  return (
    <div className="bg-slate-950/95 rounded-[40px] flex items-center p-2  lg:text-sm text-xs font-light space-x-4">
      {platformsUI()}
    </div>
  );
};

export default PlatformSwitcher;

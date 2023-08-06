"use client";
import { useContentDiscovery } from "@/context/useContentDiscovery";
import { usePlatform } from "@/lib/platforms";
import { usePathname, useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useEffect } from "react";

const PlatformSwitcher = () => {
  const { platforms, singleApp, selected, setSelected } = usePlatform();
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const slug = segments[3];
  const platform = segments[1]
  useEffect(() => {
    if (['', 'apps'].includes(singleApp)) {
      const selectedPlatform = platforms.find(el => el.name.toUpperCase() === platform?.toUpperCase())
      setSelected(selectedPlatform?.id)
    }

  }, [platform]);

  if (platforms.length < 2) return null; // hide if there is no platforms
  const platformsUI = () => {
    return platforms.map((platformAvailable, index) => {
      let selectedBackGround
      if (selected === platformAvailable.id) {
        selectedBackGround = ' bg-slate-700'
      }
      const switchApps = () => {
        if (singleApp === 'apps') {
          router.push(
            `/app/${platforms[index].name.toLowerCase()}/${slug}`
          );
        } else if (singleApp === 'search') {
          setSelected(platformAvailable.id)
          router.push(`/search/${platformAvailable.name.toLowerCase()}${window.location.search}`)
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
    <div className="bg-slate-800 rounded-[40px] h-fit flex items-center md:p-2 p-1 lg:text-sm text-xs font-light gap-4 w-fit mx-auto">
      {platformsUI()}
    </div>
  );
};

export default PlatformSwitcher;

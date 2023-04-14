'use client'
import { usePlatform } from "@/lib/platforms";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";

const PlatformSwitcher = () => {
    const { platforms, singleApp, selected, setSelected } = usePlatform();
    const router = useRouter()
    const segments = useSelectedLayoutSegments();
    const slug = segments[2]

    if (platforms.length < 2) return null; // hide if there is no platforms
    return (
        <div className="bg-slate-950/95 rounded-[40px] flex items-center p-2  lg:text-sm text-xs font-light space-x-4">
            {platforms.map((platformAvailable, index) => (
                <div
                    onClick={() => {
                        if (!singleApp) {
                            setSelected(platformAvailable.id);
                        } else {
                            router.push(`/app/${platforms[index].name.toLowerCase()}/${slug}`)
                        }
                    }}
                    key={index}
                    className={`${selected == platformAvailable.id && "bg-slate-800"
                        }  py-[0.3rem] px-[0.7rem] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
                >
                    <span className="uppercase">{platformAvailable.name}</span>
                </div>
            ))}
        </div>
    )
}

export default PlatformSwitcher
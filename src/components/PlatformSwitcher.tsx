'use client'
import { GlobalContext } from "@/lib/globalContext";
import Router from "next/router";
import { useContext, useEffect } from "react";

const PlatformSwitcher = () => {
    const globalContext = useContext(GlobalContext);
    const platform = globalContext?.platform;
    const show = globalContext?.show;
    const single = globalContext?.single;

    const getPlatform = (platform_id: any) => {
        let platform;
        switch (platform_id) {
            case 1:
                platform = "android";
                break;
            case 2:
                platform = "ios";
                break;
            case 3:
                platform = "web";
                break;
        }
        return platform;
    };
    if (!show) return null;
    return (
        <div className="bg-[#1B2132] rounded-[40px] flex items-center p-2  lg:text-sm text-xs font-light space-x-4">
            {globalContext?.availablePlatforms.map((platformAvailable, index) => (
                <div
                    onClick={() => {
                        if (!single) {
                            globalContext.setPlatform(platformAvailable.id);
                        } else {
                            Router.push(
                                {
                                    pathname: "/application/[platform]/[slug]",
                                    query: {
                                        platform: getPlatform(platformAvailable.id),
                                        slug: Router.query.slug,
                                    },
                                },
                                undefined,
                                { shallow: false }
                            );
                        }
                    }}
                    key={index}
                    className={`${platform == platformAvailable.id && "bg-slate-700"
                        }  py-[0.3rem] px-[0.7rem] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
                >
                    <span className="uppercase">{platformAvailable.name}</span>
                </div>
            ))}
        </div>
    )
}

export default PlatformSwitcher
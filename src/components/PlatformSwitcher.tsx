'use client'
import { usePlatform } from "@/lib/platforms";
// import { GlobalContext } from "@/lib/globalContext";
import Router from "next/router";
import { useContext, useEffect } from "react";

const PlatformSwitcher = () => {
    const { platforms, singleApp, selected, setSelected } = usePlatform();

    if (platforms.length === 0) return null; // hide if there is no platforms
    return (
        <div className="bg-slate-950/95 rounded-[40px] flex items-center p-2  lg:text-sm text-xs font-light space-x-4">
            {platforms.map((platformAvailable, index) => (
                <div
                    onClick={() => {
                        if (!singleApp) {
                            setSelected(platformAvailable.id);
                        } else {
                            Router.push(
                                {
                                    pathname: "/application/[platform]/[slug]",
                                    query: {
                                        platform: 'ios',
                                        slug: Router.query.slug,
                                    },
                                },
                                undefined,
                                { shallow: false }
                            );
                        }
                    }}
                    key={index}
                    className={`${selected == platformAvailable.id && "bg-slate-700"
                        }  py-[0.3rem] px-[0.7rem] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
                >
                    <span className="uppercase">{platformAvailable.name}</span>
                </div>
            ))}
        </div>
    )
}

export default PlatformSwitcher
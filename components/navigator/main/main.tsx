import React, { useRef } from 'react'
import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { motion, useAnimationControls } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';
import { SingleScreen } from '../../screen/mobile';
import BlurImage from '../../screen/Image';
import Search from './search';
import Menu from './menu';
import Filters from './filters';

const MainNavigator = ({type}:any) => {
    const [userOpen, setUseropen] = useState<boolean>(false);
    const [cookies, setCookie, removeCookie] = useCookies();
    const router = useRouter();
    const session = useSession();

    const supabase = useSupabaseClient();
    const [user, setUser] = useState<any>({});
    const handeUser = async () => {
        const { data } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, website, full_name");

        // console.log(data?.find((e) => e.id == session?.user.id)?.username);
        let u = data?.find((e) => e.id == session?.user.id);
        setUser(u);
        // console.log(session?.user.id);
    };

    const handelLogOut = async () => {
        removeCookie("JWT");
        await supabase.auth.signOut();
        router.push("/access");
    };

    useEffect(() => {
        if(session){
        handeUser();
        }
    }, [session]);


    const navControls = useAnimationControls()
    const [navOpen, setNavOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)
    useEffect(() => {
        if(navOpen){
            navControls.start({
                transition: { type: "spring", duration: 1 }
            })
        }else{
            navControls.start({
                transition: { type: "spring", bounce:0.01, duration: 0.5 }
            })
        }
    }, [navOpen])


    // Logic to handle if user clicks outside of the navigator
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
          function handleClickOutside(event:any) {
            if (ref.current && !ref.current.contains(event.target)) {
                if(menuOpen || navOpen){
                    setMenuOpen(false)
                    setNavOpen(false)
                }
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref, menuOpen, navOpen]);
      }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);



    const [search, setSearch] = useState<string>("");

  return (
    <div className="fixed bottom-12 w-full flex justify-center">
        <motion.div layout className='relative flex items-end' ref={wrapperRef}>
            {/* User Avatar area */}
            <motion.div
                layout="position"
                className="w-[45px] h-[45px] rounded-full mr-4 mb-2 cursor-pointer"
                onClick={() => {
                    setUseropen(!userOpen);
                }}
            >
                <div className="overflow-hidden w-[45px] h-[45px] rounded-full mr-2 relative cursor-pointer border-2 border-slate-200 bg-slate-900">
                    <img
                    className="w-full rounded-full"
                    src={user?.avatar_url || ""}
                    />
                </div>

                <div
                    className={`opacity-0 ${
                    userOpen ? "opacity-100 scale-[100%]" : "opacity-0 scale-0"
                    } transform-gpu transition duration-400 origin-bottom absolute bottom-[65px] left-[-120px] bg-slate-900/95  rounded-[16px] py-[18px] px-[20px] w-[260px] text-slate-100`}
                >
                    <div className="flex items-center mb-[20px]">
                    <div className="w-[32px] h-[32px] rounded-full mr-2 bg-slate-800">
                        <img
                        className="w-[100%] h-[100%] rounded-full"
                        src={user?.avatar_url || ""}
                        />
                    </div>
                    <div>
                        <span className="font-bold text-base w-full">
                        {user?.full_name}
                        </span>
                        <span className="block font-medium text-[12px] text-slate-400">
                        @{user?.username}
                        </span>
                    </div>
                    </div>
                    <div className="flex items-center text-white text-[14px] font-medium  px-3 py-[8px] rounded-[8px] mb-[8px] cursor-pointer transorm duration-[400ms] hover:bg-slate-700">
                    <img className="mr-3" src="/images/assets/usericon1.svg" />
                    <span
                        onClick={() => {
                        router.push("/profile");
                        }}
                    >
                        Account Settings
                    </span>
                    </div>
                    <div className="flex items-center text-white text-[14px] font-medium px-3 py-[8px] rounded-[8px] mb-[8px] cursor-pointer transorm duration-[400ms] hover:bg-slate-700">
                    <img className="mr-3" src="/images/assets/usericon2.svg" />
                    <span>membership</span>
                    </div>
                    <div
                    className="flex items-center text-white text-[14px] font-medium px-3 py-[8px] rounded-[8px] mb-[8px] cursor-pointer transorm duration-[400ms] hover:bg-slate-700"
                    onClick={handelLogOut}
                    >
                    <img className="mr-3" src="/images/assets/usericon3.svg" />
                    <span>Logout </span>
                    </div>
                </div>
            </motion.div>
            {/* Navigator Area */}
            <motion.div 
                layoutRoot
                className="relative w-full bg-slate-900/90 border-[0.5px] border-slate-500 rounded-2xl p-2 flex-col items-end text-slate-100 tracking-[.07rem] origin-bottom"
                animate={navControls}
                transition={{ type: "spring", duration: 1 }}
                >
                {navOpen && !menuOpen && (
                    <Search search={search}/>
                )}
                {menuOpen && (  
                    <Menu />
                )}
                {filterOpen && (
                    <Filters />
                )}

                <div className="flex">
                    <motion.div 
                        layout="position"
                        className="flex items-center bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-3xl px-7 mr-5 h-[48px]"
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                            setNavOpen(false);
                            setFilterOpen(false);
                        }}>
                        <span className="font-medium text-sm">Menu</span>
                        <span className="ml-2 w-4 h-4">
                        <img src="/images/assets/navmenuicon.svg" />
                        </span>
                    </motion.div>
                    <motion.div layout className="flex items-center h-[48px] w-[100%] bg-slate-800 rounded-full pl-7">
                        <motion.input
                            layout
                            className="appearance-none w-[20vw] h-[100%] bg-inherit border-[0px] outline-0"
                            placeholder="Search"
                            transition={{ duration: 0.4 }}
                            animate={{ width: navOpen ? "40vw" : "18vw" }}
                            onChange={(e) => {
                                if (e.target.value.length > 0){
                                    setSearch(e.target.value);
                                    setNavOpen(true);
                                    setMenuOpen(false);
                                    setFilterOpen(false);
                                }else{
                                    setNavOpen(false);
                                }
                            }}
                            onFocus={(e) => {
                                if (e.target.value.length > 0){
                                    setNavOpen(true);
                                    setMenuOpen(false);
                                    setFilterOpen(false);
                                }
                            }}
                        />
                        <motion.div 
                            layout="position" 
                            className="h-full flex items-center bg-slate-700 hover:bg-slate-600 cursor-pointer rounded-full px-6 ml-auto"
                            onClick={() => {
                                setFilterOpen(!filterOpen);
                                setNavOpen(false);
                                setMenuOpen(false);
                            }}>
                            <span className="font-medium text-sm">Fillter</span>
                            <span className="ml-2">
                                <img src="/images/assets/navmenuicon.svg" />
                            </span>
                        </motion.div>
                    </motion.div>
                </div>

            </motion.div>
        </motion.div>
  </div>
  )
}

export default MainNavigator



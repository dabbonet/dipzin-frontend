import { motion } from 'framer-motion';
import { useState } from 'react'

const Navigator = () => {

    const [userOpen, setUseropen] = useState<boolean>(false);
    return (
        <motion.div className="fixed w-full bottom-0 flex justify-center z-40">
            <div className="fixed bottom-12 h-[50px] flex items-center ">
                <div
                    className="w-[45px] h-[45px] rounded-full mr-4 relative cursor-pointer"
                    onClick={() => {
                        setUseropen(!userOpen);
                    }}
                >
                    <div className="overflow-hidden w-[45px] h-[45px] rounded-full mr-2 relative cursor-pointer border border-slate-400">
                        <img
                            className="w-full rounded-full"
                            src="https://picsum.photos/50/50"
                        />
                    </div>

                    <div
                        className={`opacity-0 ${userOpen ? "opacity-100 scale-[100%]" : "opacity-0 scale-0"
                            } transform-gpu transition duration-400 origin-bottom absolute bottom-[65px] left-[-120px] bg-slate-900/95  rounded-[16px] py-[18px] px-[20px] w-[260px] text-slate-100`}
                    >
                        <div className="flex items-center mb-[20px]">
                            <div className="w-[32px] h-[32px] rounded-full mr-2">
                                <img
                                    className="w-[100%] h-[100%] rounded-full"
                                    src="https://picsum.photos/50/50"
                                />
                            </div>
                            <div>
                                <span className="font-bold text-base w-full">Mohamed Hesham</span>
                                <span className="block font-medium text-[12px] text-slate-400">
                                    @flepooo
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center text-white text-[14px] font-medium  px-3 py-[8px] rounded-[8px] mb-[8px] cursor-pointer transorm duration-[400ms] hover:bg-slate-700">
                            <img className="mr-3" src="/images/assets/usericon1.svg" />
                            <span>Account Settings</span>
                        </div>
                        <div className="flex items-center text-white text-[14px] font-medium px-3 py-[8px] rounded-[8px] mb-[8px] cursor-pointer transorm duration-[400ms] hover:bg-slate-700">
                            <img className="mr-3" src="/images/assets/usericon2.svg" />
                            <span>membership</span>
                        </div>
                        <div className="flex items-center text-white text-[14px] font-medium px-3 py-[8px] rounded-[8px] mb-[8px] cursor-pointer transorm duration-[400ms] hover:bg-slate-700">
                            <img className="mr-3" src="/images/assets/usericon3.svg" />
                            <span>Logout </span>
                        </div>
                    </div>
                </div>
                <div className="py-2 bg-slate-900/90 border-[0.5px] border-slate-500 rounded-2xl px-2 flex items-center text-slate-100 tracking-[.07rem]">
                    <div className="flex items-center bg-slate-800 rounded-3xl px-7 h-[48px] mr-5">
                        <span className="font-medium text-sm">Menu</span>
                        <span className="ml-2 w-4 h-4">
                            <img src="/images/assets/navmenuicon.svg" />
                        </span>
                    </div>
                    <div className="flex items-center w-full bg-slate-800 rounded-3xl pl-7 h-[48px] ">
                        <motion.span className="font-medium text-sm ">
                            <motion.input
                                layout
                                className="appearance-none w-[20vw] h-[100%] bg-inherit border-[0px] outline-0 "
                                placeholder="Search"
                                whileFocus={{ width: "28vw" }}
                                transition={{ type: "spring", duration: 0.4 }}
                            />
                        </motion.span>
                        <div className="h-[100%] flex items-center bg-slate-700 rounded-3xl px-6 ml-auto">
                            <span className="font-medium text-sm">Fillter</span>
                            <span className="ml-2">
                                <img src="/images/assets/navmenuicon.svg" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Navigator
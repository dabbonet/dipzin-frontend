import { useState } from 'react'

const Navigator = () => {

    const [userOpen, setUseropen] = useState<boolean>(false);
    return (
        <div className="fixed w-[100%] bottom-0 flex justify-center z-40">
            <div className="fixed bottom-12 h-[50px] flex items-center ">
                <div
                    className="w-[45px] h-[45px] bg-slate-500 rounded-full mr-2 relative cursor-pointer"
                    onClick={() => {
                        setUseropen(!userOpen);
                    }}
                >
                    <div className="overflow-hidden w-[45px] h-[45px] bg-slate-500 rounded-full mr-2 relative cursor-pointer border border-slate-400">
                        <img
                            className="w-full rounded-full"
                            src="https://scontent.fcai19-8.fna.fbcdn.net/v/t39.30808-6/320855919_680352113764818_6821951812011273823_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ON4LQ6NfnoYAX8LbRm_&tn=y_jPnRv_0lLz8Bm4&_nc_ht=scontent.fcai19-8.fna&oh=00_AfC3qSqvMw5Mzr-YuictZqFSpAlZbXnW80x6pc2svjCiEQ&oe=63B49D05"
                        />
                    </div>

                    <div
                        className={`opacity-0 ${userOpen ? "opacity-100 scale-[80%]" : "opacity-0 scale-0"
                            } transform-gpu transition duration-400 origin-bottom absolute bottom-[65px] left-[-120px] bg-slate-900/95  rounded-[16px] py-[16px] px-[20px] w-[300px] text-white`}
                    >
                        <div className="flex items-center mb-[20px]">
                            <div className="w-[55px] h-[55px] bg-slate-500 rounded-full mr-2">
                                <img
                                    className="w-[100%] h-[100%] rounded-full"
                                    src="/images/assets/appicon.svg"
                                />
                            </div>
                            <div>
                                <span className="font-bold text-[16px]">Mohamed Hesham</span>
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
                <div className="w-[648px] py-2 bg-slate-900/90 border-[0.5px] border-slate-500 rounded-2xl px-2 flex items-center text-white scale-90">
                    <div className="flex items-center bg-slate-800 rounded-3xl px-7 h-[48px] mr-5">
                        <span className="font-semibold text-[14px]">Menu</span>
                        <span className="ml-2">
                            <img src="/images/assets/navmenuicon.svg" />
                        </span>
                    </div>
                    <div className="flex items-center w-[488px] bg-slate-800 rounded-3xl pl-7 h-[48px]">
                        <span className="font-semibold text-[14px]">
                            <input
                                className="appearance-none h-[100%] bg-inherit border-[0px] outline-0 w-[300px]"
                                placeholder="Search"
                            />
                        </span>
                        <div className="h-[100%] flex items-center bg-slate-700 rounded-3xl px-7 ml-auto">
                            <span className="font-semibold text-[14px]">Fillter</span>
                            <span className="ml-2">
                                <img src="/images/assets/navmenuicon.svg" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigator
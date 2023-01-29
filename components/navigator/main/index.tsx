import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const Navigator = () => {
  const [userOpen, setUseropen] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();

  const supabase = useSupabaseClient();
  const session = useSession();
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
    router.push("/auth");
  };

  useEffect(() => {
    handeUser();
  }, [session]);

  return (
    <motion.div
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed w-full bottom-0 flex justify-center z-40"
    >
      <div className="fixed bottom-12 h-[50px] flex items-center ">
        <div
          className="w-[45px] h-[45px] rounded-full mr-4 relative cursor-pointer"
          onClick={() => {
            setUseropen(!userOpen);
          }}
        >
          <div className="overflow-hidden w-[45px] h-[45px] rounded-full mr-2 relative cursor-pointer border-2 border-slate-200 bg-slate-900">
            <img className="w-full rounded-full" src={user?.avatar_url || ""} />
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
  );
};

export default Navigator;

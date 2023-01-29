import { ReactElement, useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import { motion } from "framer-motion";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  const handeUser = async () => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, website, full_name")
        .eq("id", session?.user.id)
        .single();

      if (data) {
        setUser(data);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handeUser();
  }, []);

  return (
    <>
      <main className="w-full flex flex-col items-center text-white py-12">
        <div className="w-[180px] h-[180px] bg-slate-700 flex justify-center items-center rounded-2xl border-[3px] border-slate-200 shadow-md overflow-hidden">
          <img className="z-[10]" src={user?.avatar_url} />
        </div>
        <span className="font-medium text-[40px] mt-10">{user?.full_name}</span>
        <span className="text-[20px] text-slate-400 mb-12">
          @{user?.username}
        </span>

        <div className="py-10 px-10 bg-slate-900 rounded-2xl w-[60%]">
          <span className="text-[20px]">Account Information</span>
          <span className="block text-[12px] text-slate-300  mt-1 mb-5">
            Here you can view and edit your account information
          </span>
          <div className="grid grid-cols-2 gap-y-10 gap-x-12 mb-5">
            <div>
              <span className="text-[16px] text-slate-400">Full Name</span>
              <br />
              <div className="w-[100%] h-[65px] bg-slate-800 mt-4 rounded-xl flex items-center px-5 text-slate-100 text-[15px]">
                {user?.full_name}
              </div>
            </div>
            <div>
              <span className="text-[16px] text-slate-400">Username</span>
              <br />
              <div className="w-[100%] h-[65px] bg-slate-800 mt-4 rounded-xl flex items-center px-5 text-slate-100 text-[15px]">
                @{user?.username}
              </div>
            </div>
            <div>
              <span className="text-[16px] text-slate-400">Email Address</span>
              <br />
              <div className="w-[100%] h-[65px] bg-slate-800 mt-4 rounded-xl flex items-center px-5 text-slate-100 text-[15px]">
                {session?.user.email}
              </div>
            </div>
            <div>
              <span className="text-[16px] text-slate-400">Role</span>
              <br />
              <div className="w-[100%] h-[65px] bg-slate-800 mt-4 rounded-xl flex items-center px-5 text-slate-100 text-[15px]">
                Product Designer
              </div>
            </div>
            <div>
              <span className="text-[16px] text-slate-400">Bio</span>
              <br />
              <div className="w-[100%] h-[65px] bg-slate-800 mt-4 rounded-xl flex items-center px-5 text-slate-100 text-[15px]">
                Product Designer
              </div>
            </div>
            <div>
              <span className="text-[16px] text-slate-400">Country</span>
              <br />
              <div className="w-[100%] h-[65px] bg-slate-800 mt-4 rounded-xl flex items-center px-5 text-slate-100 text-[15px]">
                United States
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 px-10 bg-slate-900 rounded-2xl w-[60%] mt-12">
          <div className="flex">
            <div>
              <span className="text-[20px]">Membership</span>
              <span className="block text-[12px] text-slate-300  mt-1 mb-5">
                Here you can view and edit your account information
              </span>
            </div>
            <div className="ml-auto">
              <div>Pricing Section</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Page;

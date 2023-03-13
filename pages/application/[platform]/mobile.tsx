// import Screen from "../../../components/screen";
import { ReactElement, useState, useRef, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import { saveAs } from "file-saver";
import _ from "lodash";
import BlurImage from "../../../components/screen/Image";
import { useRouter } from "next/router";
import Image from "next/image";

// import { log } from "console";

interface Props {
  app: any;
}

const Mobile = ({ app }: Props) => {
  const toIconUrl = (pathname: string) =>
    process.env.NEXT_PUBLIC_SUPABASE_URL +
    "/storage/v1/object/public/application/icons/" +
    pathname;
  const toStorageUrl = (pathname: string) =>
    process.env.NEXT_PUBLIC_SUPABASE_URL +
    "/storage/v1/object/public/application/screens/" +
    app.id +
    "/" +
    pathname;

  if (!app) {
    return null;
  }

  const supabase = useSupabaseClient();
  const session = useSession();

  const [liked, setLiked] = useState<boolean>(false);


  const checkLiked = async () => {
    try {
      const { data, error } = await supabase
        .from("liked_apps")
        .select("id")
        .eq("app_id", app.id)
        .eq("user_id", session?.user.id)
        .single();

      if (data) {
        //console.log(data.id);
        setLiked(true);
      } else {
        //console.log(error);
      }
    } catch (err) {
      //console.log(err);
    }
  };

  useEffect(() => {
    checkLiked();
    //console.log(app);
  }, [session, app]);

  const [openScreen, setOpenScreen] = useState(false);
  const [scUrl, setScUrl] = useState<any>("");


  return (
    <>
      <main className="w-full flex flex-col items-center">
        <div className="flex w-[100%] h-[25%] mt-[100px] mb-[65px] items-center text-white z-10">
          <img
            className="h-[40%] w-[4.8%] ml-[13%] rounded-2xl bg-slate-500"
            src={toIconUrl(app.icon)}
          />
          <div className="ml-12">
            <span className="text-[32px] font-medium">{app.name}</span>
            <span className="block text-[16px] text-[#8F94A1]">
              {app.tagline}
            </span>
          </div>

          <div className="ml-auto flex flex-col text-right">
            <span className="text-[20px] font-medium">
              {app.app_category.name}
            </span>
            <span className="block text-[16px] text-[#8F94A1]">
              App Category
            </span>
          </div>
          <div className="ml-[100px] mr-[13%] flex flex-col text-right">
            <span className="text-[20px] font-medium">{app.copyright}</span>
            <span className="block text-[16px] text-[#8F94A1]">@copyright</span>
          </div>
        </div>

        <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-6 lg:gap-5 gap-5 mb-10 grid-cols-2">
          {app &&
            app.screen.map((screen: any) => {
              // console.log(screen.url)
              return (
                <div
                  key={screen.id}
                  className="flex justify-center items-center relative group/item"
                >
                  <motion.div
                    layout
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div
                      className="w-full rounded-2xl overflow-hidden min-720:gap-16 "
                      onClick={() => {
                        setOpenScreen(true);
                        setScUrl(screen.url);
                      }}
                    >
                      <BlurImage platform={1} src={toStorageUrl(screen.url)} />
                    </div>
                  </motion.div>
                </div>
              );
            })}
        </div>
        <AnimatePresence>
          {openScreen && (
            <>
              <motion.div
                className="fixed w-full h-[100vh] backdrop-blur-md bg-slate-900/70 z-[100] flex items-center justify-center"
                onClick={() => setOpenScreen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.img
                  className="w-[400px] rounded-3xl bg-slate-800"
                  placeholder="blur"
                  width={428}
                  height={926}
                  alt="sreen"
                  src={toStorageUrl(scUrl)}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ y: 300 }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};
export default Mobile;

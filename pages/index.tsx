import { ReactElement, useState, useRef, useEffect, useContext } from "react";
import { NextPage } from "next";
import Screen from "../components/screen";
import clsx from "clsx";
import Navigator from "../components/navigator/main";
import TimedUpgrade from "../components/modals/timedUpgrade";
import { useQuery, useQueryClient } from "react-query";
import { AnimatePresence, motion } from "framer-motion";
import { GlobalContext } from "../lib/globalContext";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { formatInTimeZone } from "date-fns-tz";
import Stream from "./stream";

const Page: NextPage = () => {
  const globalContext = useContext(GlobalContext);
  const supabase = useSupabaseClient();
  const session = useSession();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const [addColl, setAddColl] = useState<boolean>(false);

  const [collName, setCollName] = useState<any>("");
  const [collDesc, setCollDesc] = useState<any>("");

  // const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const { data: currentUser, error } = await supabase.auth.getUser();
  //     if (error) {
  //       console.error(error);
  //       console.log("user", currentUser.user);
  //     } else {
  //       console.log("user", currentUser.user);
  //     }
  //   };
  //   fetchUser();

  // }, []);

  const [collectionGetted, setCollectionDetted] = useState<any>([]);
  const getCollections = async () => {
    try {
      const { data } = await supabase
        .from("collection")
        .select(
          "id, created_at, name, user_id, is_private, description, collection_app(*, application(icon)), collection_screen(*, screen(url))"
        )
        .eq("user_id", session?.user.id);

      if (data) {
        setCollectionDetted(data);
        console.log("coooloo : ", data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [newReq, setNewReq] = useState<boolean>(true);
  const platform = globalContext?.platform;


  // Platform Switcher settings and initializations
  useEffect(() => {
    globalContext?.setShow(true);
    globalContext?.setSingle(false);
    globalContext?.setAvailablePlatforms([
      {
        id: 2,
        name: "ios",
      },
      {
        id: 1,
        name: "android",
      },
      {
        id: 4,
        name: "web",
      },
    ]);
  }, []);

  //initialeze the platform
  // useEffect(() => {
  //   handeUser();
  //   getCollections();
  // }, [session, newReq]);

  const [streamOpen, setStreamOpen] = useState<string>("stream");
  const [webScreenOpen, setWebScreenOpen] = useState<boolean>(false);

  const [isPersonal, setIsPersonal] = useState<any>(true);
  
  const queryClient = useQueryClient();

  const [refetched, setRefetched] = useState<boolean>(false);
  const handleRefetch = async () => {
    setRefetched(true);
    await queryClient.resetQueries(
      {
        queryKey: ["stream"],
      },
      { throwOnError: true, cancelRefetch: true }
    );
    setRefetched(false);
  };

  const handleAddCollection = async () => {
    if (collName == "") {
      alert("add name first");
    } else {
      try {
        let uu = uuid();
        await supabase.from("collection").insert({
          id: uu,
          name: collName,
          user_id: session?.user.id,
          is_private: true,
          description: collDesc,
        });
        alert("added");
        setCollName("");
        setCollDesc("");
        setNewReq(!newReq);
        setAddColl(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      {/* <TimedUpgrade /> */}
      <Navigator />
      <main className="w-full flex flex-col items-center">
        <div className="lg:w-[75%] max-w-[75%] mt-[110px] rounded-[42px]">
          <img
            className="h-auto w-full"
            src="/images/assets/banner.png"
            alt="banner"
          />
        </div>

        <div className="lg:w-[75%] w-[85%] flex mt-10 mb-[25px]">
          <a className="cursor-pointer duration-500 flex items-center">
            <span
              onClick={() => {
                setStreamOpen("stream");
              }}
              className={` ${
                streamOpen == "stream"
                  ? "text-white lg:text-[3rem] text-[2rem] font-light"
                  : "text-gray-400 lg:text-[2.5rem] text-[1.5rem] opacity-70 font-light"
              } transform transition duration-500 `}
            >
              Stream
            </span>
            {streamOpen == "stream" && (
              <motion.div
                onClick={handleRefetch}
                whileHover={{ rotate: 90 }}
                whileTap={{
                  rotate: 360,
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                className="ml-3"
              >
                <img className=" w-8" src="/images/assets/refresh.svg" />
              </motion.div>
            )}
          </a>
          <a className="cursor-pointer flex items-center">
            <span
              onClick={() => {
                setStreamOpen("collection");
              }}
              className={` ${
                streamOpen == "collection"
                  ? "text-white lg:text-[3rem] text-[2rem] font-light"
                  : "text-gray-400 lg:text-[2.5rem] text-[1.5rem] opacity-70 font-light"
              } transform transition duration-500  ml-12 `}
            >
              Collections
            </span>
            {streamOpen == "collection" && (
              <img
                className="ml-3 transorm duration-[600ms] hover:rotate-90"
                src="/images/assets/refresh.svg"
              />
            )}
          </a>

          {streamOpen == "collection" && (
            <>
              <div
                onClick={() => {
                  setAddColl(true);
                }}
                className="flex items-center ml-auto cursor-pointer"
              >
                <img width={18} src="/images/assets/addcoll.svg" />
                <span className="ml-3 text-slate-300 font-semibold text-[14px]">
                  Add Collection
                </span>
              </div>

              <div className="h-[50px] my-auto ml-10 bg-[#1B2132] rounded-[40px] flex items-center px-3 text-white  lg:text-sm text-xs font-light space-x-4">
                <div
                  className={`${
                    isPersonal && "bg-slate-700"
                  } py-[0.3rem] px-[0.7rem] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
                >
                  <span
                    onClick={() => {
                      setIsPersonal(true);
                    }}
                    className="uppercase"
                  >
                    Personal
                  </span>
                </div>
                <div
                  className={`${
                    !isPersonal && "bg-slate-700"
                  } py-[0.3rem] px-[0.7rem] rounded-[16px] mx-auto cursor-pointer transform transition duration-400 hover:bg-slate-700`}
                >
                  <span
                    onClick={() => {
                      setIsPersonal(false);
                    }}
                    className="uppercase"
                  >
                    Community
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {addColl && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed flex items-center justify-center w-[99vw] h-[100vh] backdrop-blur-md z-40"
            >
              <div className="flex flex-col w-[550px] py-10 px-10 bg-slate-900 rounded-2xl">
                <span className="text-white text-[14px]">
                  Create a new collection
                </span>
                <hr className="mt-2 bg-slate-200 opacity-50" />
                <span className="text-white mt-7">Name</span>
                <input
                  type="text"
                  className="mt-5 rounded-lg bg-slate-800 border-slate-700 text-white"
                  value={collName}
                  onChange={(e) => setCollName(e.target.value)}
                />
                <span className="text-white mt-10">Description (optional)</span>
                <textarea
                  value={collDesc}
                  onChange={(e) => setCollDesc(e.target.value)}
                  className="mt-5 rounded-lg bg-slate-800 border-slate-700 text-white"
                />
                <div className="flex mt-10 text-white text-[14px]">
                  <span
                    onClick={handleAddCollection}
                    className="py-3 px-4 bg-orange-500 rounded-xl mr-5 cursor-pointer"
                  >
                    Create Collection
                  </span>
                  <span
                    onClick={() => {
                      setAddColl(false);
                    }}
                    className="py-3 px-4 bg-slate-500 rounded-xl mr-5 cursor-pointer"
                  >
                    Cancel
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {streamOpen == "stream" ? (
          <>
            <Stream refetched={refetched} />
          </>
        ) : (
          <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 lg:gap-5 gap-5 mb-10 grid-cols-1 pb-32">
            {isPersonal
              ? collectionGetted
                  .filter((dx: any) => dx.is_private == true)
                  .map((data: any) => {
                    return (
                      <motion.div
                        key={data.id}
                        className="w-full h-auto relative bg-slate-800 rounded-2xl p-5"
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.5 },
                        }}
                      >
                        <span
                          onClick={() => {
                            router.push("/collection/" + data.id);
                          }}
                          className=""
                        >
                          <div className="grid grid-cols-4 gap-1">
                            {/* <div className="row-span-4 col-span-2 flex space-x-2 bg-red-800">teste</div>
                          <div className="col-span-1 row-span-4 flex flex-col bg-yellow-800">tests</div> */}
                            <div className="row-span-4 col-span-3 flex space-x-3">
                              {data.collection_screen
                                .slice(0, 2)
                                .map((ico: any) => {
                                  return (
                                    <img
                                      className="w-[50%] h-min  rounded-xl"
                                      src={
                                        process.env.NEXT_PUBLIC_SUPABASE_URL +
                                        "/storage/v1/object/public/application/screens/" +
                                        ico.app_id +
                                        "/" +
                                        ico.screen.url
                                      }
                                    />
                                  );
                                })}
                            </div>
                            <div className="row-span-4 col-span-1 space-y-1 pl-2 lg:pl-4">
                              {data.collection_app
                                .slice(0, 4)
                                .map((ico: any) => {
                                  return (
                                    <img
                                      key={data.id}
                                      className="w-full h-min rounded-xl p-1"
                                      src={
                                        process.env.NEXT_PUBLIC_SUPABASE_URL +
                                        "/storage/v1/object/public/application/icons/" +
                                        ico.application.icon
                                      }
                                    />
                                  );
                                })}
                            </div>
                          </div>

                          <div className="flex flex-col mt-5 mb-2 pl-4 ">
                            <span className="font-medium mb-1 text-2xl text-slate-100">
                              {data.name}
                            </span>
                            <span className="font-light text-sm text-slate-300">
                              Modified:{" "}
                              <span className="font-medium">
                                {formatInTimeZone(
                                  data.created_at,
                                  "Europe/Paris",
                                  "dd-MM-yyyy"
                                )}
                              </span>
                            </span>
                          </div>
                        </span>
                      </motion.div>
                    );
                  })
              : collectionGetted
                  .filter((dx: any) => dx.is_private == false)
                  .map((data: any) => {
                    return (
                      <motion.div
                        className="w-full h-auto relative bg-slate-800 rounded-2xl p-5"
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.5 },
                        }}
                      >
                        <span
                          onClick={() => {
                            router.push("/collection/1");
                          }}
                          className=""
                        >
                          <div className="grid grid-cols-4 gap-1">
                            {/* <div className="row-span-4 col-span-2 flex space-x-2 bg-red-800">teste</div>
                          <div className="col-span-1 row-span-4 flex flex-col bg-yellow-800">tests</div> */}
                            <div className="row-span-4 col-span-3 flex space-x-3">
                              <img
                                className="w-[50%] h-min  rounded-xl"
                                src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/5064be39-8584-4bfc-ad7e-b9d0a06cd5b9.png"
                              />
                              <img
                                className="w-[50%] h-min rounded-xl"
                                src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/5064be39-8584-4bfc-ad7e-b9d0a06cd5b9.png"
                              />
                            </div>
                            <div className="row-span-4 col-span-1 space-y-1 pl-2 lg:pl-4">
                              <img
                                className="w-full h-min rounded-xl p-1"
                                src="/images/assets/collappicon.svg"
                              />
                              <img
                                className="w-full h-min rounded-xl p-1"
                                src="/images/assets/collappicon.svg"
                              />
                              <img
                                className="w-full h-min rounded-xl p-1"
                                src="/images/assets/collappicon.svg"
                              />
                              <img
                                className="w-full h-min rounded-xl p-1"
                                src="/images/assets/collappicon.svg"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col mt-5 mb-2 pl-4 ">
                            <span className="font-medium mb-1 text-2xl text-slate-100">
                              {data.name}
                            </span>
                            <span className="font-light text-sm text-slate-300">
                              Modified:{" "}
                              <span className="font-medium">
                                {data.created_at}
                              </span>
                            </span>
                          </div>
                        </span>
                      </motion.div>
                    );
                  })}
          </div>
        )}
      </main>
    </>
  );
};
export default Page;

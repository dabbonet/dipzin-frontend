import { ReactElement, useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import Screen from "../../components/screen";
import clsx from "clsx";
import Tabs from "../../components/tabs";
import CollectionSideNavigator from "../../components/navigator/main/side";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const Page: NextPage = () => {
  // const tabs=['tab 1', 'tab 2', 'tab3'];
  const [currentTab, setCurrentTab] = useState("Personal");
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const [id, setId] = useState(router.query.id);

  const [collectionGetted, setCollectionDetted] = useState<any>({
    name: "Loading ...",
    created_at: "Loading ...",
    is_private: "Loading ...",
    collection_screen: [],
  });

  const getCollections = async (idd: any) => {
    try {
      const { data } = await supabase
        .from("collection")
        .select(
          "id, created_at, name, user_id, is_private, description, collection_app(*, application(icon)), collection_screen(*, screen(url))"
        )
        .eq("id", idd)
        .single();

      if (data) {
        setCollectionDetted(data);
        console.log("coooloo : ", data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setId(router.query.id);
    getCollections(router.query.id);
    console.log(router.query.id);
  }, [router.query.id]);

  return (
    <>
      <CollectionSideNavigator />

      <main className="w-full flex flex-col items-center">
        <div className="flex w-[75%] h-[25%] mt-[100px] mb-[65px] items-center text-white z-10">
          {collectionGetted?.is_private ? (
            <img
              className="w-16 h-auto"
              src="/images/assets/privateCollection.svg"
            />
          ) : (
            <img className="w-16 h-auto" src="/images/assets/publicIcon.svg" />
          )}

          <div className="ml-6">
            <span className="text-[32px] font-medium">
              {collectionGetted.name}
            </span>
            <span className="block text-[16px] text-[#8F94A1]">
              Modified: {collectionGetted.created_at}
            </span>
          </div>
          <div className="ml-auto flex flex-col items-center">
            <Tabs
              tabs={["Personal", "Community"]}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
        </div>
        <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-6 lg:gap-5 mb-10 grid-cols-2">
          {collectionGetted.collection_screen.map((data: any) => {
            return (
              <Screen
                platform={1}
                src={
                  process.env.NEXT_PUBLIC_SUPABASE_URL +
                  "/storage/v1/object/public/application/screens/" +
                  data.app_id +
                  "/" +
                  data.screen.url
                }
              />
            );
          })}
        </div>
      </main>
    </>
  );
};
export default Page;

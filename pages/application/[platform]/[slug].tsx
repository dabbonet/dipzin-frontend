import Mobile from "./mobile";
import Web from "./web";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabase";
import React, { useContext, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { GlobalContext } from "../../../lib/globalContext";

interface Props {
  application: any;
}

const ApplicationPage = ({ application }: Props) => {
  const globalContext = useContext(GlobalContext);

  // //initialeze the platform
  useEffect(() => {
    globalContext?.setShow(false);
    handlePlatform(application);
  }, []);

  const handlePlatform = async (app: any) => {
    try {
      const { data, error } = await supabase
        .from("application")
        .select("*")
        .eq("slug", app.slug)
        .eq("is_published", true);

      if (
        (data &&
          data.length == 2 &&
          data[0].platform_id == 3 &&
          data[1].platform_id == 1) ||
        (data[0].platform_id == 1 && data[1].platform_id == 3)
      ) {
        console.log(data);
        const platforms = [
          {
            id: 1,
            name: "android",
          },
          {
            id: 3,
            name: "web",
          },
        ];
        globalContext?.setShow(true);
        globalContext?.setAvailablePlatforms(platforms);
        globalContext?.setPlatform(app.platform_id);
        globalContext?.setSingle(true);
      }

      if (
        (data &&
          data.length == 2 &&
          data[0].platform_id == 3 &&
          data[1].platform_id == 2) ||
        (data[0].platform_id == 2 && data[1].platform_id == 3)
      ) {
        console.log(data);
        const platforms = [
          {
            id: 2,
            name: "ios",
          },
          {
            id: 3,
            name: "web",
          },
        ];
        globalContext?.setShow(true);
        globalContext?.setAvailablePlatforms(platforms);
        globalContext?.setPlatform(app.platform_id);
        globalContext?.setSingle(true);
      }

      if (
        (data &&
          data.length == 2 &&
          data[0].platform_id == 1 &&
          data[1].platform_id == 2) ||
        (data[0].platform_id == 2 && data[1].platform_id == 1)
      ) {
        console.log(data);
        const platforms = [
          {
            id: 2,
            name: "ios",
          },
          {
            id: 1,
            name: "android",
          },
        ];
        globalContext?.setShow(true);
        globalContext?.setAvailablePlatforms(platforms);
        globalContext?.setPlatform(app.platform_id);
        globalContext?.setSingle(true);
      }

      if (data && data.length == 3) {
        console.log(data);
        const platforms = [
          {
            id: 2,
            name: "ios",
          },
          {
            id: 1,
            name: "android",
          },
          {
            id: 3,
            name: "web",
          },
        ];
        globalContext?.setShow(true);
        globalContext?.setAvailablePlatforms(platforms);
        globalContext?.setPlatform(app.platform_id);
        globalContext?.setSingle(true);
      }
    } catch (e) {
      //console.log(e);
    }
  };

  const router = useRouter();
  const platform = router.query.platform || "ios";

  switch (platform) {
    default:
      return "Not Found";
    case "android":
      return <Mobile app={application} />;
    case "ios":
      return <Mobile app={application} />;
    case "web":
      return <Web app={application} />;
  }
};

export default ApplicationPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const platform = context.params?.platform;
  const slug = context.params?.slug;

  let platform_id;
  switch (platform) {
    case "android":
      platform_id = 1;
      break;
    case "ios":
      platform_id = 2;
      break;
    case "web":
      platform_id = 3;
      break;
  }

  const { data: application, error } = await supabase
    .from("application")
    .select(`*, screen(*), app_category(*)`)
    .match({ slug: slug, platform_id: platform_id, is_published: true })
    .eq("screen.is_published", true)
    .order("id", { foreignTable: "screen", ascending: true })
    .single();

  return {
    props: {
      application: JSON.parse(JSON.stringify(application)),
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: application, error } = await supabase
    .from("application")
    .select("*")
    .eq("is_published", true);
  const paths = application?.map((application: any) => {
    let platform;
    switch (application.platform_id) {
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
    return {
      params: { slug: application.slug, platform: platform },
    };
  });

  if (paths) {
    return { paths, fallback: "blocking" };
  } else {
    return { paths: [], fallback: "blocking" };
  }
};

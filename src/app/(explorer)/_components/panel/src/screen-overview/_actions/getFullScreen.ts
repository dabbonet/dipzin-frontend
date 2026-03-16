"use server";

import QueryString from "qs";
import type { ScreenData } from "@/types/screen-types";

const cleanData = (data: any): Partial<ScreenData> => {
  const cleanedData: Partial<ScreenData> = {
    id: data.id,
  };

  if (data.app_full_page_screen.data) {
    cleanedData.full_page = {
      id: data.app_full_page_screen.data.id,
      hash: data.app_full_page_screen.data.full_screen.data.hash,
      ext: data.app_full_page_screen.data.full_screen.data.ext,
      width: data.app_full_page_screen.data.full_screen.data.width,
      height: data.app_full_page_screen.data.full_screen.data.height,
    };
  }

  return cleanedData;
};

export const getFullScreen = async (screenId: number): Promise<Partial<ScreenData>> => {
  try {
    const screenQuery = QueryString.stringify({
      fields: ["id"],
      populate: {
        app_full_page_screen: {
          populate: {
            full_screen: {
              fields: ["hash", "ext", "width", "height"]
            }
          }
        }
      },
    });

    const screenResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API}/screens/${screenId}?${screenQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!screenResponse.ok) {
      throw new Error("Failed to fetch screens");
    }

    const screenResult = await screenResponse.json();
    const screen = cleanData(screenResult.data);
    return screen;
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unexpected error occurred";
    throw new Error(error);
  }
};

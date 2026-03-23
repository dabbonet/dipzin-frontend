"use server";

import QueryString from "qs";
import type { ScreenData } from "@/types/screen-types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API || 'https://dipbk.fin.dabbo.net';

const cleanData = (data: any): Partial<ScreenData> => {
  const cleanedData: Partial<ScreenData> = {
    id: data.id,
  };

  // Safely check for nested data with null checks
  const fullPageData = data.app_full_page_screen?.data;
  const fullScreenData = fullPageData?.full_screen?.data;

  if (fullPageData && fullScreenData) {
    cleanedData.full_page = {
      id: fullPageData.id,
      hash: fullScreenData.hash,
      ext: fullScreenData.ext,
      width: fullScreenData.width,
      height: fullScreenData.height,
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
      `${API_BASE_URL}/screens/${screenId}?${screenQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!screenResponse.ok) {
      console.error(`[FullScreen] Error ${screenResponse.status} fetching screen ${screenId}`);
      throw new Error("Failed to fetch screens");
    }

    const screenResult = await screenResponse.json();
    
    if (!screenResult.data) {
      console.warn(`[FullScreen] No data for screen ${screenId}`);
      return { id: screenId };
    }
    
    const screen = cleanData(screenResult.data);
    return screen;
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unexpected error occurred";
    console.error(`[FullScreen] Error fetching screen ${screenId}:`, error);
    throw new Error(error);
  }
};

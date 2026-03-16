"use server";

import QueryString from "qs";

const cleanData = (data: any): any => ({
  id: data.id,
  name: data.name,
  video_url: data.video_url,
  order: data.order,
  flow_old_Id: data.flow_old_Id,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
  publishedAt: data.publishedAt,
  flow_screens: data.flow_screens.data.map((screenData: any) => ({
    id: screenData.id,
    screen: {
      id: screenData.screen.data.id,
      screen: {
        id: screenData.screen.data.screen.data.id,
        hash: screenData.screen.data.screen.data.hash,
        ext: screenData.screen.data.screen.data.ext,
        width: screenData.screen.data.screen.data.width,
        height: screenData.screen.data.screen.data.height,
      },
    },
  })),
  app: {
    id: data.app.data.id,
    name: data.app.data.name,
    slug: data.app.data.slug,
    tag_line: data.app.data.tag_line,
    platform: data.app.data.platform,
    icon: {
      url: data.app.data.icon.data.url,
      hash: data.app.data.icon.data.hash,
      ext: data.app.data.icon.data.ext,
    },
  },
});

export const getFlow = async (flowId: number): Promise<any> => {
  try {
    const flowQuery = QueryString.stringify({
      fields: ["*"],
      populate: {
        app: {
          fields: ["name", "tag_line", "platform"],
          populate: {
            icon: {
              fields: ["hash", "ext", "width", "height"],
            }
          }
        },
        flow_screens: {
          fields: ["id"],
          populate: {
            screen: {
              fields: ["id"],
              populate: {
                screen: {
                  fields: ["hash", "ext", "width", "height"],
                }
              }
            }
          }
        }
      }
    });

    const flowResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API}/flows/${flowId}?${flowQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!flowResponse.ok) {
      throw new Error("Failed to fetch flows");
    }

    const flowResult = await flowResponse.json();
    return cleanData(flowResult.data);
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unexpected error occurred";
    throw new Error(error);
  }
};

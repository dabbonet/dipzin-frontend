"use server";

import QueryString from "qs";

const cleanData = (data: any): any => ({
  id: data.id,
  name: data.attributes.name,
  video_url: data.attributes.video_url,
  order: data.attributes.order,
  flow_old_Id: data.attributes.flow_old_Id,
  createdAt: data.attributes.createdAt,
  updatedAt: data.attributes.updatedAt,
  publishedAt: data.attributes.publishedAt,
  flow_screens: data.attributes.flow_screens.data.map((screenData: any) => ({
    id: screenData.id,
    screen: {
      id: screenData.attributes.screen.data.id,
      screen: {
        id: screenData.attributes.screen.data.attributes.screen.data.id,
        hash: screenData.attributes.screen.data.attributes.screen.data.attributes.hash,
        ext: screenData.attributes.screen.data.attributes.screen.data.attributes.ext,
        width: screenData.attributes.screen.data.attributes.screen.data.attributes.width,
        height: screenData.attributes.screen.data.attributes.screen.data.attributes.height,
      },
    },
  })),
  app: {
    id: data.attributes.app.data.id,
    name: data.attributes.app.data.attributes.name,
    slug: data.attributes.app.data.attributes.slug,
    tag_line: data.attributes.app.data.attributes.tag_line,
    platform: data.attributes.app.data.attributes.platform,
    icon: {
      url: data.attributes.app.data.attributes.icon.data.attributes.url,
      hash: data.attributes.app.data.attributes.icon.data.attributes.hash,
      ext: data.attributes.app.data.attributes.icon.data.attributes.ext,
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

"use server";

import QueryString from "qs";
import type { ScreenData } from "@/types/screen-types";

const cleanData = (data: any): ScreenData => ({
  id: data.id,
  is_published: data.attributes.is_published,
  is_showcase: data.attributes.is_showcase,
  colors: data.attributes.colors,
  screen: {
    id: data.attributes.screen.data.id,
    hash: data.attributes.screen.data.attributes.hash,
    ext: data.attributes.screen.data.attributes.ext,
    width: data.attributes.screen.data.attributes.width,
    height: data.attributes.screen.data.attributes.height,
  },
  app: {
    id: data.attributes.app.data.id,
    name: data.attributes.app.data.attributes.name,
    slug: data.attributes.app.data.attributes.slug,
    tag_line: data.attributes.app.data.attributes.tag_line,
    platform: data.attributes.app.data.attributes.platform,
    icon: {
      hash: data.attributes.app.data.attributes.icon.data.attributes.hash,
      ext: data.attributes.app.data.attributes.icon.data.attributes.ext,
    },
  },
  tags: data.attributes.tags.data.map((tag: any) => ({
    id: tag.id,
    name: tag.attributes.name,
  })),
  components: data.attributes.components.data.map((component: any) => ({
    id: component.id,
    name: component.attributes.name,
  })),
});

export const getScreen = async (screenId: number): Promise<ScreenData> => {
  try {
    const screenQuery = QueryString.stringify({
      fields: ["id", "is_published", "is_showcase", "colors"],
      populate: {
        screen: {
          fields: ["hash", "ext", "width", "height"],
        },
        app: {
          fields: ["name", "slug", "tag_line", "platform"],
          populate: {
            icon: {
              fields: ["hash", "ext"]
            }
          }
        },
        tags: {
          fields: ["name", "id"],
        },
        components: {
          fields: ["name", "id"],
        },
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

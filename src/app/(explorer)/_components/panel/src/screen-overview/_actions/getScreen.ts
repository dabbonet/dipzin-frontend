"use server";

import QueryString from "qs";
import type { ScreenData } from "@/types/screen-types";

const cleanData = (data: any): ScreenData => ({
  id: data.id,
  is_published: data.is_published,
  is_showcase: data.is_showcase,
  colors: data.colors,
  screen: {
    id: data.screen.data.id,
    hash: data.screen.data.hash,
    ext: data.screen.data.ext,
    width: data.screen.data.width,
    height: data.screen.data.height,
  },
  app: {
    id: data.app.data.id,
    name: data.app.data.name,
    slug: data.app.data.slug,
    tag_line: data.app.data.tag_line,
    platform: data.app.data.platform,
    icon: {
      hash: data.app.data.icon.data.hash,
      ext: data.app.data.icon.data.ext,
    },
  },
  tags: data.tags.data.map((tag: any) => ({
    id: tag.id,
    name: tag.name,
  })),
  components: data.components.data.map((component: any) => ({
    id: component.id,
    name: component.name,
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

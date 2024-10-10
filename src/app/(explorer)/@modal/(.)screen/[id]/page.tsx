import React from "react";
import Modal from "./modal";
import ScreenOverview from "@/app/(explorer)/_components/panel/src/screen-overview";
import { getScreen } from "@/app/(explorer)/_actions/getScreen";

export default async function ScreenPage({
  params,
}: {
  params: { id: number; platform: string };
}) {
  const { id } = params;

  const screen = await getScreen(id)
  // const screen = {
  //   id,
  //   platform: "ios",
  //   is_published: true,
  //   is_showcase: false,
  //   colors: "#000000,#ffffff,#ff0000,#00ff00,#0000ff",
  //   screen: {
  //     id: 1,
  //     url: "https://placehold.co/300x650/black/white.png"
  //   },
  //   app: {
  //     id: 1,
  //     name: "Example App",
  //     slug: "example-app",
  //     tag_line: "This is an example app",
  //     icon: {
  //       url: "https://example.com/icon.png"
  //     }
  //   },
  //   tags: [
  //     { id: 1, name: "tag1" },
  //     { id: 2, name: "tag2" }
  //   ],
  //   components: [
  //     { id: 1, name: "component1" },
  //     { id: 2, name: "component2" }
  //   ]
  // };

  return (
    <Modal>
      <ScreenOverview screen={screen} />
    </Modal>
  );
}

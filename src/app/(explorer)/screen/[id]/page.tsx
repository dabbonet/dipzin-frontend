import React from "react";
import { getScreen } from "../../_actions/getScreen";
import ScreenOverview from "../../_components/panel/src/screen-overview";

export default async function ScreenPage({
  params,
}: {
  params: { id: number; platform: string };
}) {
  const { id } = params;

  const screen = await getScreen(id)

  return (
    <div className="size-full flex items-center justify-center">
      <ScreenOverview screen={screen} />
    </div>
  )
}

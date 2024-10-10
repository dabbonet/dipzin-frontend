import React from "react";
import { getScreen } from "../../_actions/screen/getScreen";
import ScreenOverview from "../../_components/panel/src/screen-overview";
import Modal from "../../@modal/modal";

export default async function ScreenPage({
  params,
}: {
  params: { id: number; platform: string };
}) {
  const { id } = params;

  const screen = await getScreen(id)

  return (
    <Modal>
      <ScreenOverview screen={screen} />
    </Modal>
  )
}

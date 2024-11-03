import React from "react";
import Modal from "../../@modal/modal";
import ScreenOverview from "../../_components/panel/src/screen-overview/screen-overview";

export default async function ScreenPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;

  return (
    <Modal>
      <ScreenOverview screenId={id} />
    </Modal>
  );
}

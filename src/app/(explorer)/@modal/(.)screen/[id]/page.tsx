import React from "react";
import Modal from "../../modal";
import ScreenOverview from "@/components/Shared/screen/src/screen-overview/screen-overview";

export default async function TestsPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;

  return (
    <Modal>
      <ScreenOverview screenId={id} />
    </Modal>
  )
}

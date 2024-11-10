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
    <Modal className="sm:h-[90vh] sm:max-w-[95vw] backdrop-blur-[45px] bg-transparent sm:bg-slate-800/60 rounded-none sm:rounded-2xl p-0 sm:p-8">
      <ScreenOverview screenId={id} />
    </Modal>
  );
}

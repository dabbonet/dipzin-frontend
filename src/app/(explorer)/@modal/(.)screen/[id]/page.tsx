import React from "react";
import Modal from "../../modal";
import ScreenOverview from "@/app/(explorer)/_components/panel/src/screen-overview/screen-overview";

export default async function TestsPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;

  return (
    <Modal className="h-full sm:max-h-[90vh] sm:max-w-[95vw] backdrop-blur-[45px] bg-transparent sm:bg-slate-800/60 rounded-none sm:rounded-2xl p-6 sm:p-8">
      <ScreenOverview screenId={id} />
    </Modal>
  );
}

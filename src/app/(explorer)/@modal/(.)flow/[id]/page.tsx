import React from "react";
import Modal from "../../modal";
import FlowOverview from "@/app/(explorer)/_components/panel/src/FlowOverview";

export default async function FlowModalPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;

  return (
    <Modal className="h-full sm:max-h-[90vh] sm:max-w-[95vw] backdrop-blur-[45px] bg-transparent sm:bg-slate-800/60 rounded-none sm:rounded-2xl p-5">
      <FlowOverview flowId={id} />
    </Modal>
  );
}

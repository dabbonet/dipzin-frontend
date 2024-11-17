import React from "react";
import FlowOverview from "@/app/(explorer)/_components/panel/src/FlowOverview";
import Modal from "../../@modal/modal";

export default async function FlowModalPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;

  return (
    <Modal className="h-full sm:max-h-[90vh] sm:max-w-[95vw] p-5">
      <FlowOverview flowId={id} />
    </Modal>
  );
}

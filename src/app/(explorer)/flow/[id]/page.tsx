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
    <Modal className="max-w-[1450px] p-0">
      <FlowOverview flowId={id} />
    </Modal>
  );
}

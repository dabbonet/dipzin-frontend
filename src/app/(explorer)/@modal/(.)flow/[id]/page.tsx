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
    <Modal className="max-w-[80vw]">
      <FlowOverview flowId={id} />
    </Modal>
  );
}

import React from "react";
import Modal from "../../modal";
import { Flow } from "@/components/Shared/flow";
import { getFlow } from "@/app/(explorer)/_actions/getFlow";

export default async function FlowPage({
  params,
}: {
  params: { id: number; platform: string };
}) {
  const { id } = params;

  const flow = await getFlow(id)

  return (
    <Modal>
      <Flow flow={flow} />
    </Modal>
  );
}

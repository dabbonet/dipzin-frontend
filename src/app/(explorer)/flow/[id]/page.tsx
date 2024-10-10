import React from "react";
import { Flow } from "@/components/Shared/flow";
import { getFlow } from "@/app/(explorer)/_actions/getFlow";
import Modal from "../../@modal/modal";

export default async function FlowPage({
  params,
}: {
  params: { id: number; platform: string };
}) {
  const { id } = params;

  const flow = await getFlow(id)

  return (
    // <div className="size-full p-20 flex items-center justify-center">
    <Modal>
      <Flow flow={flow} />
    </Modal>
    // </div>
  );
}

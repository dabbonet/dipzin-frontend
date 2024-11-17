"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@/app/(explorer)/_hooks/useQuery";
import { Flow } from "@/components/Shared/flow";
import type { FlowType } from "@/types/app-types";
import { getFlow } from "@/app/(explorer)/_actions/getFlow";

interface FlowOverviewProps {
  flowId: number;
}

const FlowOverview = ({ flowId }: FlowOverviewProps) => {
  const { data: flows } = useQuery();
  const [currentFlow, setCurrentFlow] = useState<FlowType | null>(null);

  const loadFlowData = useCallback(async () => {
    if (!flows || flows.length === 0) {
      const fetchedFlow = await getFlow(flowId);
      setCurrentFlow(fetchedFlow);
      return;
    }

    const foundFlow = flows.find((flow) => flow.id === Number(flowId));
    if (foundFlow) {
      setCurrentFlow(foundFlow);
    } else {
      const fetchedFlow = await getFlow(flowId);
      setCurrentFlow(fetchedFlow);
    }
  }, [flowId, flows]);

  useEffect(() => {
    loadFlowData();
  }, [loadFlowData]);

  if (!currentFlow) return null;

  return (
    <Flow flow={currentFlow} view="opened" />
  );
};

export default FlowOverview;

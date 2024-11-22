import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@/app/(explorer)/_hooks/useQuery";
import type { FlowType } from "@/types/app-types";
import { getFlow } from "@/app/(explorer)/_actions/getFlow";
import useEmblaCarousel from 'embla-carousel-react';

const useFlowOverview = (flowId: number) => {
  const { data: flows } = useQuery();
  const [currentFlow, setCurrentFlow] = useState<FlowType | null>(null);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel();

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

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCurrentScreen(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return {
    currentFlow,
    currentScreen,
    emblaRef,
    emblaApi,
    loadFlowData,
  };
};

export default useFlowOverview;

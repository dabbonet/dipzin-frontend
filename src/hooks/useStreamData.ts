import { shuffle } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";

interface StreamResponse {
  stream: [];
  page: number;
  status?: number;
}

interface UseStreamDataParams {
  selectedPlatform: number | null;
}

const useStreamData = ({ selectedPlatform }: UseStreamDataParams) => {
  const [streamData, setStreamData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPages, setLoadedPages] = useState<number[]>([]);

  const fetchStreamData = async (platform: number, previousPages: number[]) => {
    const queryString = new URLSearchParams({
      platform: platform.toString(),
      previousPages: previousPages.join(","),
    }).toString();
    const res = await fetch(`/api/stream?${queryString}`);
    if (!res.ok) {
      setIsLoading(false);
      return { stream: [], page: -1, status: res.status };
    }
    return res.json() as Promise<StreamResponse>;
  };

  const updateStream = useCallback(async () => {
    if (selectedPlatform === null) return;
    const data = await fetchStreamData(selectedPlatform, []);
    setIsLoading(false);
    setLoadedPages([data.page]);
    setStreamData(shuffle(data.stream));
  }, [selectedPlatform]);

  useEffect(() => {
    setStreamData([]);
    setLoadedPages([]);
    setIsLoading(true);
    updateStream();
  }, [selectedPlatform, updateStream]);

  const loadMore = useCallback(async () => {
    console.log("Attempting to load more...");
    if (selectedPlatform === null) {
      console.log("No selected platform.");
      return;
    }
    const more = await fetchStreamData(selectedPlatform, loadedPages);
    console.log("More data:", more);
    if (more.status === 404 || more.stream.length === 0) {
      console.log("No more data or reached end.");
      setIsLoading(false);
      return;
    }
    setLoadedPages([...loadedPages, more.page]);
    setStreamData((prev) => [...prev, ...shuffle(more.stream)]);
  }, [loadedPages, selectedPlatform]);

  return { streamData, isLoading, loadMore };
};

export default useStreamData;

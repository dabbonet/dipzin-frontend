"use client";

import { useState, useCallback } from 'react';
import { downloadScreen } from '@/app/(explorer)/_actions/screen/downloadScreen';
import { useToast } from '@/hooks/use-toast';

const useScreenDownload = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadScreen = useCallback(async (screenId: string, screenAppName: string) => {
    setLoading(true);
    setError(null);

    try {
      await downloadScreen(screenId, screenAppName);
      toast({
        title: "Success",
        description: "Screen downloaded successfully",
        variant: "success"
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error downloading screen";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "error"
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleDownloadScreen, loading, error };
};

export default useScreenDownload;

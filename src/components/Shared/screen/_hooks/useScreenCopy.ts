"use client"

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { copyImageToClipboard } from '../_utils/copyScreen';

const useScreenCopy = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopyPng = useCallback(async (screenURL: string) => {
    setLoading(true);
    setError(null);

    try {
      await copyImageToClipboard(screenURL);
      toast({
        title: "Success",
        description: "Image copied to clipboard",
        variant: "success"
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error copying image";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "error"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return { handleCopyPng, loading, error };
};

export default useScreenCopy;

"use client";

import { getScreenBlob } from '@/utils/getScreenBlob';
import { useState } from 'react';
import { toast } from './use-toast';

type CopyState = {
  loading: boolean;
  error: string | null;
};

export function useCopyScreen() {
  const [copyState, setCopyState] = useState<CopyState>({
    loading: false,
    error: null,
  });

  async function copyImageToClipboard(imageUrl: string) {
    setCopyState({ loading: true, error: null });

    try {
      const blob = await getScreenBlob(imageUrl);
      const clipboardItem = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([clipboardItem]);

      toast({
        variant: "success",
        title: "Image copied to clipboard",
        description: "The image has been successfully copied to your clipboard.",
      });
    } catch (error: any) {
      setCopyState({ loading: false, error: error.message });
      toast({
        variant: "error",
        title: "Failed to copy image",
        description: "An error occurred while copying the image to the clipboard. Please try again.",
      });
    } finally {
      setCopyState((state) => ({ ...state, loading: false }));
    }
  }

  return { copyImageToClipboard, ...copyState };
}

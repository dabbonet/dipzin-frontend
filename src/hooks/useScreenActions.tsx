// /search/hooks/useScreenActions.ts
import { useCallback } from 'react';
import { downloadImage } from '@/lib/ImageDownloader';
import { copyImagesToClipboard } from "@/lib/ImageCopier";
import { toast } from 'react-hot-toast';
import SoonToast from "@/components/SoonToast";

const useScreenActions = () => {
  const handleDownloadScreen = useCallback((name: string, fileName: string) => {
    downloadImage(name, fileName);
    toast.success('Download started...');
  }, []);

  const handleCopyLink = useCallback((screenURL: string) => {
    navigator.clipboard.writeText(screenURL);
    toast.success('Link copied to clipboard');
  }, []);

  const handleCopyPng = useCallback(async (screenURL: string) => {
    await copyImagesToClipboard([screenURL]);
    toast.success('Image copied to clipboard');
  }, []);

  const handleLikeScreen = useCallback(() => {
    toast.custom(<SoonToast />, { duration: 2000 });
  }, []);

  return { handleDownloadScreen, handleCopyLink, handleCopyPng, handleLikeScreen };
};

export default useScreenActions;

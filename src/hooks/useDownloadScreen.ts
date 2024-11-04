"use client";

import { useState } from "react";
import { toast } from "./use-toast";
import { getScreenBlob } from "@/utils/getScreenBlob";

type DownloadState = {
  loading: boolean;
  error: string | null;
};

export function useDownloadScreen() {
  const [downloadState, setDownloadState] = useState<DownloadState>({
    loading: false,
    error: null,
  });

  async function downloadScreen(
    imageInput: string | string[],
    zipName = "Screenshots",
  ) {
    setDownloadState({ loading: true, error: null });

    try {
      if (typeof imageInput === "string") {
        // Single image download
        const blob = await getScreenBlob(imageInput);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${zipName}.png`;
        link.click();

        toast({
          variant: "success",
          title: "Image Downloaded",
          description: "The image has been downloaded successfully.",
        });
      } else {
        // Bulk image download & zip using server-side function
        const response = await fetch("/api/zip-screens", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrls: imageInput, zipName }),
        });

        if (!response.ok) {
          throw new Error("Failed to create zip file");
        }

        const zipBlob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(zipBlob);
        link.download = `${zipName}.zip`;
        link.click();

        toast({
          variant: "success",
          title: "Images Downloaded",
          description:
            "The images have been downloaded successfully as a zip file.",
        });
      }
    } catch (error: any) {
      setDownloadState({ loading: false, error: error.message });
      toast({
        variant: "error",
        title: "Download Failed",
        description:
          "An error occurred while downloading the image(s). Please try again.",
      });
    } finally {
      setDownloadState((state) => ({ ...state, loading: false }));
    }
  }

  return { downloadScreen, ...downloadState };
}

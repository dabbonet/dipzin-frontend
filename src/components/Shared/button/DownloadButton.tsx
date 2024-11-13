'use client';

import { useState } from "react";
import { useDownloadScreen } from "@/hooks/useDownloadScreen";
import Button, { type ButtonProps } from "./src/button";

type DownloadButtonProps = {
  url: string | string[];
  then: React.ReactNode;
  children: React.ReactNode;
} & Omit<ButtonProps, 'onClick' | 'disabled'>;

export const DownloadButton = ({
  url,
  then,
  children,
  ...buttonProps
}: DownloadButtonProps) => {
  const { downloadScreen, loading: downloading, error: downloadError } = useDownloadScreen();
  const [showDownloaded, setShowDownloaded] = useState(false);

  const handleDownload = async () => {
    if (Array.isArray(url)) {
      await Promise.all(url.map((u) => downloadScreen(u)));
    } else {
      await downloadScreen(url);
    }

    if (!downloadError) {
      setShowDownloaded(true);
      setTimeout(() => setShowDownloaded(false), 2000);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={downloading}
      {...buttonProps}
    >
      {showDownloaded && !downloadError ? then : children}
    </Button>
  );
};

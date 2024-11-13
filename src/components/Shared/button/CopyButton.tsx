'use client';

import { useState } from "react";
import { useCopyScreen } from "@/hooks/useCopyScreen";
import Button, { type ButtonProps } from "./src/button";

type CopyButtonProps = {
  url: string;
  then: React.ReactNode;
  children: React.ReactNode;
} & Omit<ButtonProps, 'onClick' | 'disabled'>;

export const CopyButton = ({
  url,
  then,
  children,
  ...buttonProps
}: CopyButtonProps) => {
  const { copyImageToClipboard, loading: copying, error: copyError } = useCopyScreen();
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = async () => {
    await copyImageToClipboard(url);
    if (!copyError) {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      disabled={copying}
      {...buttonProps}
    >
      {showCopied && !copyError ? then : children}
    </Button>
  );
};

"use client";
import { ActionBar } from "@/components/ui/ActionBar";
import Icons from "@/components/icons/Icons";
import SoonToast from "@/components/SoonToast";

import { copyImagesToClipboard } from "@/lib/ImageCopier";
import { downloadImage } from "@/lib/ImageDownloader";

import { navigatorProps } from "@/lib/types/screenActions";

import { FC } from "react";
import toast from "react-hot-toast";
import ButtonWrapper from "@/components/ButtonWrapper";

const ScreenActions: FC<navigatorProps> = ({ appName, screen }) => {
  const handleLikeScreen = () => {
    toast.remove();
    toast.custom(<SoonToast />, { duration: 2000 });
  };

  const handleDownloadScreen = async (name, fileName) => {
    if (name) {
      downloadImage(fileName, name);
    }
  };

  const handleCopyPng = async (screenURL) => {
    await copyImagesToClipboard([screenURL]);
  };

  const handleCopyLink = async (screenURL) => {
    navigator.clipboard.writeText(screenURL);
    toast.success("App Link Copied.");
  };

  return (
    <ActionBar className="z-50 flex flex-col fixed sm:right-10 right-0 top-[32%] w-fit h-auto">
      <ButtonWrapper
        title="Like Screen"
        icon={<Icons.Heart />}
        handler={handleLikeScreen}
        appName={appName}
        screen={screen}
      />
      <ButtonWrapper
        title="Download"
        icon={<Icons.Download />}
        handler={handleDownloadScreen}
        appName={appName}
        screen={screen}
      />
      <ButtonWrapper
        title="Copy PNG"
        icon={<Icons.Copy />}
        handler={handleCopyPng}
        appName={appName}
        screen={screen}
      />
      <ButtonWrapper
        title="Copy Link"
        icon={<Icons.CopyFilled />}
        handler={handleCopyLink}
        appName={appName}
        screen={screen}
      />
    </ActionBar>
  );
};
export default ScreenActions;

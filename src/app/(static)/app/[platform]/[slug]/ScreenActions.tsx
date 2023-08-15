"use client";
import { ActionBar, SquareButton } from "@/components/ActionBar";
import Icons from "@/components/Icons";
import SoonToast from "@/components/SoonToast";
import { useDialog } from "@/context/useDialog";
import { copyImagesToClipboard } from "@/lib/ImageCopier";
import { downloadImage } from "@/lib/ImageDownloader";
import { getUser } from "@/lib/auth";
import { navigatorProps } from "@/lib/types/screenActions";
import { getAssetsURL } from "@/lib/utils";
import { FC } from "react";
import toast from "react-hot-toast";
type button = {
  title?: any
  icon?: any
  handler?: any
  appName?: any
  screen?: any
}
const ButtonWrapper = ({ title, icon, handler, appName, screen }: button) => {
  const { setVisibleNoAuth, setVisible } = useDialog();
  if (appName && screen) {
    const screenName = screen?.attributes?.screen?.data?.attributes || screen;
    if (screenName) {
      if (appName || screen?.attributes?.order) {
        const name = screenName?.hash + screenName?.ext || screen;
        return (
          <SquareButton
            onClick={async () => {
              const isUserAuth = await getUser();
              if (isUserAuth) {
                setVisible(true);
                await setTimeout(() => {
                  if (title === "Copy PNG" || title === "Copy Link"){
                    handler(getAssetsURL(name));
                  }
                  handler(name, appName + " " + screen?.attributes?.order || screen);
                }, 5000);
                return;
              }
              setVisibleNoAuth(true);
            }}
          >
            <SquareButton.Title className="w-[80%]">{title}</SquareButton.Title>
            <SquareButton.Icon>{icon}</SquareButton.Icon>
          </SquareButton>
        );
      }
    }
  }
};

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

export { ButtonWrapper };
export default ScreenActions;

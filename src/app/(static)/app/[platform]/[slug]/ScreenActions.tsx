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



const ScreenActions: FC<navigatorProps> = ({ appName, screen }) => {

  const {setVisibleNoAuth , setVisible} = useDialog()
  const ButtonWrapper = ({title ,icon, handler}) => {
    if (appName && screen) {
      const screenName = screen.attributes.screen.data.attributes
      if (screenName) {
        if (appName || screen?.attributes?.order) {
          const name = screenName.hash + screenName.ext;
          return <SquareButton
            onClick={async() => {
              const isUserAuth = await getUser()
              if (isUserAuth) {
                setVisible(true)
                await setTimeout(() => {
                  if (title === "Copy PNG" || title === "Copy Link")  handler(getAssetsURL(name))
                  handler(name, appName + " " + screen.attributes.order)
                },5000)
                return
              }
              setVisibleNoAuth(true);
            }}
          >
            <SquareButton.Title className="w-[80%]">{title}</SquareButton.Title>
            <SquareButton.Icon>
              {icon}
            </SquareButton.Icon>
        </SquareButton>
        }
      }
    }
  }

    return  (
        <ActionBar className="z-50 flex flex-col fixed right-10 top-[32%] w-auto h-auto">
        <ButtonWrapper title='Like Screen' icon={<Icons.Heart />} handler={handleLikeScreen}/>
          <ButtonWrapper title="Download" icon={<Icons.Download />} handler= {handleDownloadScreen} />
        <ButtonWrapper title="Copy PNG" icon={<Icons.Copy />} handler={handleCopyPng} />
        <ButtonWrapper title='Copy Link' icon={<Icons.CopyFilled />} handler={handleCopyLink} />
        </ActionBar>
      );
};

export default ScreenActions;

const handleLikeScreen = () => {
  toast.remove();
  toast.custom(<SoonToast />, { duration: 2000 });
}
const handleDownloadScreen = async (name, fileName) => {
  if (name) {
    downloadImage(fileName, name);
  }
}
const handleCopyPng = async (screenURL) => { 
  await copyImagesToClipboard([screenURL]);
}
const handleCopyLink = async (screenURL) => { 
  navigator.clipboard.writeText(screenURL);
  toast.success("App Link Copied.");
}

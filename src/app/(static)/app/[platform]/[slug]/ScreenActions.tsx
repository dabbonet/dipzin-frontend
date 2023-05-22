"use client";
import { ActionBar, SquareButton } from "@/components/ActionBar";
import Icons from "@/components/Icons";
import SoonToast from "@/components/SoonToast";
import { copyImagesToClipboard } from "@/lib/ImageCopier";
import { downloadImage } from "@/lib/ImageDownloader";
import { navigatorProps } from "@/lib/types/screenActions";
import { getAssetsURL } from "@/lib/utils";
import { FC } from "react";
import toast from "react-hot-toast";



const ScreenActions: FC<navigatorProps> = ({ appName, screen }) => {


  const DownloadImageButton = () => {
    if (appName && screen) {
      let name;
      if (screen.attributes?.screen?.data?.attributes?.hash && screen?.attributes?.screen?.data?.attributes?.ext) {
        name =
          screen.attributes.screen.data.attributes.hash +
          screen.attributes.screen.data.attributes.ext;
      }
      let fileName
      if (appName && screen?.attributes?.order) {
        fileName = appName + " " + screen.attributes.order;
      }
      return <SquareButton
      
        onClick={() => handleDownloadScreen(name, fileName)}
      >
        <SquareButton.Title className="w-[80%]">Download</SquareButton.Title>
        <SquareButton.Icon>
          <Icons.Download />
        </SquareButton.Icon>
    </SquareButton>
    } else {
      return <SquareButton
            onClick={async () => handleDownloadScreen}
          >
            <SquareButton.Title className="w-[80%]">Download</SquareButton.Title>
            <SquareButton.Icon>
              <Icons.Download />
            </SquareButton.Icon>
          </SquareButton>
    }
  }
  const CopyPngButton = () => {
    if (appName && screen) {
      let name;
      if (screen.attributes?.screen?.data?.attributes?.hash && screen?.attributes?.screen?.data?.attributes?.ext) {
        name =
          screen.attributes.screen.data.attributes.hash +
          screen.attributes.screen.data.attributes.ext;
      }
      let fileName
      if (appName && screen?.attributes?.order) {
        fileName = appName + " " + screen.attributes.order;
      }
      const screenURL = getAssetsURL(name);
      return <SquareButton
      onClick={()=>handleCopyPng(screenURL)}
    >
      <SquareButton.Title className="w-[70%]">Copy PNG</SquareButton.Title>
      <SquareButton.Icon>
        <Icons.Thumbnail />
      </SquareButton.Icon>
    </SquareButton>
    } else {
      return <SquareButton
        onClick={async () => handleCopyPng}
      >
        <SquareButton.Title className="w-[70%]">Copy PNG</SquareButton.Title>
        <SquareButton.Icon>
          <Icons.Thumbnail />
        </SquareButton.Icon>
      </SquareButton>
    }
  }
  const CopyLinkButton = () => {
    if (appName && screen) {
      let name;
      if (screen.attributes?.screen?.data?.attributes?.hash && screen?.attributes?.screen?.data?.attributes?.ext) {
        name =
          screen.attributes.screen.data.attributes.hash +
          screen.attributes.screen.data.attributes.ext;
      }
      let fileName
      if (appName && screen?.attributes?.order) {
        fileName = appName + " " + screen.attributes.order;
      }
      const screenURL = getAssetsURL(name);
      return <SquareButton
      onClick={()=>handleCopyLink(screenURL)}
    >
      <SquareButton.Title className="w-[70%]">Copy Link</SquareButton.Title>
      <SquareButton.Icon>
        <Icons.CopyFilled />
      </SquareButton.Icon>
    </SquareButton>
    } else {
      return <SquareButton
        onClick={() => handleCopyLink}
      >
        <SquareButton.Title className="w-[70%]">Copy Link</SquareButton.Title>
        <SquareButton.Icon>
          <Icons.CopyFilled />
        </SquareButton.Icon>
      </SquareButton>
    }
  }
    return  (
        <ActionBar className="z-50 flex flex-col fixed right-10 top-[32%] w-auto h-auto">
          <SquareButton
            onClick={()=>handleLikeScreen()}
          >
            <SquareButton.Title className="w-[70%]">
              Like Screen
            </SquareButton.Title>
            <SquareButton.Icon>
              <Icons.Heart />
            </SquareButton.Icon>
          </SquareButton>
          <DownloadImageButton/>
          <CopyPngButton/>
          <CopyLinkButton/>
        </ActionBar>
      );
};

export default ScreenActions;

const handleLikeScreen = () => {
  toast.remove();
  toast.custom(<SoonToast />, { duration: 2000 });
}
const handleDownloadScreen =async (name , fileName) => {
  name && downloadImage(fileName, name);
}
const handleCopyPng = async (screenURL) => { 
  await copyImagesToClipboard([screenURL]);
}
const handleCopyLink = async (screenURL) => { 
  navigator.clipboard.writeText(screenURL);
  toast.success("App Link Copied.");
}

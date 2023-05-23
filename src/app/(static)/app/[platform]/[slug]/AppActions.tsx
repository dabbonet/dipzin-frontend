"use client";
import { ActionBar, SquareButton } from "@/components/ActionBar";
import Icons from "@/components/Icons";
import SoonToast from "@/components/SoonToast";
import { ImageDownloader } from "@/lib/ImageDownloader";
import { FC } from "react";
import toast from "react-hot-toast";
import {navigatorProps} from "@/lib/types/appactions";


const AppActions: FC<navigatorProps> = ({ app }) => {
  if (app) {
    const screenData = app.screens.data
    const platform = app.platform.data.attributes.name.toLowerCase();
    if (screenData && platform) {
      const screensArray = screenData.map(
        (screen) => {
            return screen.attributes.screen?.data?.attributes?.hash + screen.attributes.screen?.data?.attributes?.ext
        }
      );
  
      // handle the like on app
      
      
      return (
        <ActionBar className="flex flex-col fixed right-10 top-[32%] w-auto h-auto">
          <SquareButton
            onClick={handleLikeApp}
          >
            <SquareButton.Title>Like App</SquareButton.Title>
            <SquareButton.Icon>
              <Icons.Heart />
            </SquareButton.Icon>
          </SquareButton>

  
          {showAppStoreLink(app)}
  
          {/* TODO: Add Save When Collections is Done. */}
  
          <SquareButton
            onClick={()=> handleDownloadImages(app , screensArray)}
          >
            <SquareButton.Title className="w-[80%]">
              Bulk Download
            </SquareButton.Title>
            <SquareButton.Icon>
              <Icons.Download />
            </SquareButton.Icon>
          </SquareButton>
  
          <SquareButton
            onClick={()=> handleCopyLink(app , platform)}
          >
            <SquareButton.Title className="w-[70%]">Copy Link</SquareButton.Title>
            <SquareButton.Icon>
              <Icons.CopyFilled />
            </SquareButton.Icon>
          </SquareButton>
        </ActionBar>
      );
    }

  }
  return (
    <ActionBar className="flex flex-col fixed right-10 top-[32%] w-auto h-auto">
      <SquareButton
        onClick={() => {
          toast.remove();
          toast.custom(<SoonToast />, { duration: 2000 });
        }}
      >
        <SquareButton.Title>Like App</SquareButton.Title>
        <SquareButton.Icon>
          <Icons.Heart />
        </SquareButton.Icon>
      </SquareButton>

      {showAppStoreLink(app)}

      <SquareButton onClick={() => {}}>
        <SquareButton.Title className="w-[80%]">
          Bulk Download
        </SquareButton.Title>
        <SquareButton.Icon>
          <Icons.Download />
        </SquareButton.Icon>
      </SquareButton>

      <SquareButton
        onClick={() => {

          toast.success("App Link Copied.");
        }}
      >
        <SquareButton.Title className="w-[70%]">Copy Link</SquareButton.Title>
        <SquareButton.Icon>
          <Icons.CopyFilled />
        </SquareButton.Icon>
      </SquareButton>
    </ActionBar>
  );
};

export default AppActions;


const handleLikeApp = () => {
  toast.remove();
  toast.custom(<SoonToast />, { duration: 2000 });
}
// hanlde open the app on app store
const handleAppStore = (app) => {
  window.open(app.store_link, "_blank", "noreferrer");
}
const handleDownloadImages = (app , screensArray) => {
  ImageDownloader(app.name + " Screens", screensArray);
}
const handleCopyLink = (app , platform) => { 
  navigator.clipboard.writeText(
    window.location.origin + "/app/" + platform + "/" + app.slug 
  );
  toast.success("App Link Copied.");
}

const showAppStoreLink = (app) => {
  if (app?.store_link) {
    return <SquareButton
    onClick={()=>handleAppStore(app)}
  >
    <SquareButton.Title className="w-[70%]">
      App Store
    </SquareButton.Title>
    <SquareButton.Icon>
      <Icons.Apple />
    </SquareButton.Icon>
  </SquareButton>
  }
}

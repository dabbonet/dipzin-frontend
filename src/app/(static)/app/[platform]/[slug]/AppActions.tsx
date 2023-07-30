"use client";
import { ActionBar, SquareButton } from "@/components/ActionBar";
import Icons from "@/components/Icons";
import SoonToast from "@/components/SoonToast";
import { ImageDownloader } from "@/lib/ImageDownloader";
import { FC } from "react";
import toast from "react-hot-toast";
import { navigatorProps } from "@/lib/types/appactions";
import { useDialog } from "@/context/useDialog";
import { useSelcetedImages } from "@/lib/SelectedToDownload";
import { getUser, useAuth } from "@/lib/auth";

const AppActions: FC<navigatorProps> = ({ app, isFromCollection }) => {
  const { setVisibleNoAuth, setVisible, setTitle } = useDialog()
  const { user } = useAuth()
  const { selectedImages } = useSelcetedImages()
  const platform = app?.platform.data.attributes.name.toLowerCase() ?? null
  const screensArray = selectedImages.images
  const bulkDownloadImages = async () => {
    const isUserAuth = await getUser()
    if (isUserAuth) {
      setVisible(true)
      setTimeout(() => {
        handleDownloadImages({ app, screensArray })
      }, 5000)
      return
    }
  }
  const ButtonWrapper = ({ title, icon, handler }) => {
    return <SquareButton
      onClick={async () => {
        setTitle('Upgrade and get access to exclusive features')
        if (!user) return setVisibleNoAuth(true)
        if (isFromCollection) {
          return
        }
        handler({ app, screensArray, platform })
      }}
      className=" w-20 h-20"
    >
      <SquareButton.Title className=" text-xs md:text-sm">{title}</SquareButton.Title>
      <SquareButton.Icon>
        {icon}
      </SquareButton.Icon>
    </SquareButton>
  }
  return (
    <ActionBar className="flex flex-col fixed sm:right-10 right-0 top-[32%] w-fit h-fit">
      <ButtonWrapper title='Like app' icon={<Icons.Heart />} handler={handleLikeApp} />
      <ButtonWrapper title='App store' icon={<Icons.Apple />} handler={handleAppStore} />
      <ButtonWrapper title='Bulk Download' icon={<Icons.Download />} handler={bulkDownloadImages} />
      <ButtonWrapper title='Copy Link' icon={<Icons.CopyFilled />} handler={handleCopyLink} />
    </ActionBar>
  );
};
export default AppActions;

const handleLikeApp = () => {
  toast.remove();
  toast.custom(<SoonToast />, { duration: 2000 });
}
// hanlde open the app on app store
const handleAppStore = ({ app }) => {
  window.open(app.store_link, "_blank", "noreferrer");
}
const handleDownloadImages = ({ app, screensArray }) => {
  ImageDownloader(app.name + " Screens", screensArray);
}
const handleCopyLink = ({ app, platform }) => {
  if (!app) {
    return
  }
  navigator.clipboard.writeText(window.location.origin + "/app/" + platform + "/" + app.slug);
  toast.success("App Link Copied.");
}
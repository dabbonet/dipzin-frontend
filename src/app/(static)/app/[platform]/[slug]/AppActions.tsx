"use client";
import { ActionBar, SquareButton } from "@/components/ui/ActionBar";
import Icons from "@/components/icons/Icons";
import SoonToast from "@/components/SoonToast";
import { ImageDownloader } from "@/lib/ImageDownloader";
import { FC } from "react";
import toast from "react-hot-toast";
import { navigatorProps } from "@/lib/types/appactions";
import { useDialog } from "@/context/useDialog";
import { useSelcetedImages } from "@/lib/SelectedToDownload";
import { getUser, useAuth } from "@/lib/auth";
import { usePathname } from "next/navigation";

const AppActions: FC<navigatorProps> = ({ app }) => {
  const { showDialog, DIALOG_ENUM } = useDialog();
  const path = usePathname();
  const { user } = useAuth();
  const { selectedImages } = useSelcetedImages();
  const platform = app?.platform.data.attributes.name.toLowerCase() ?? null;
  const screensArray = selectedImages.images;

  const bulkDownloadImages = async () => {
    // showDialog(DIALOG_ENUM.UPGRADE_AD,'Upgrade and get access to exclusive features')

    handleDownloadImages({ app, screensArray });
    return;
  };
  const ButtonWrapper = ({ title, icon, handler }) => {
    return (
      <SquareButton
        onClick={async () => {
          const isUserAuth = await getUser();
          if (!isUserAuth) {
            // showDialog(DIALOG_ENUM.UPGRADE_AD,'Upgrade and get access to exclusive features');
            showDialog(DIALOG_ENUM.ACCESS, "Login to use this features");
            return;
          }
          handler({ app, screensArray, platform });
        }}
        className=" w-24 h-20"
      >
        <SquareButton.Title className=" text-xs md:text-sm">
          {title}
        </SquareButton.Title>
        <SquareButton.Icon>{icon}</SquareButton.Icon>
      </SquareButton>
    );
  };
  return (
    <ActionBar className="flex flex-col fixed right-10 top-1/2 -translate-y-1/2 w-auto h-auto z-10">
      <ButtonWrapper
        title="Like app"
        icon={<Icons.Heart />}
        handler={handleLikeApp}
      />
      {path.startsWith("/app") && (
        <ButtonWrapper
          title="App store"
          icon={<Icons.Apple />}
          handler={handleAppStore}
        />
      )}
      <ButtonWrapper
        title="Bulk Download"
        icon={<Icons.Download />}
        handler={bulkDownloadImages}
      />
      <ButtonWrapper
        title="Copy Link"
        icon={<Icons.CopyFilled />}
        handler={handleCopyLink}
      />
    </ActionBar>
  );
};
export default AppActions;

const handleLikeApp = () => {
  toast.remove();
  toast.custom(<SoonToast />, { duration: 2000 });
};
// hanlde open the app on app store
const handleAppStore = ({ app }) => {
  window.open(app.store_link, "_blank", "noreferrer");
};
const handleDownloadImages = ({ app, screensArray }) => {
  ImageDownloader(app?.name + " Screens", screensArray);
};
const handleCopyLink = () => {
  navigator.clipboard.writeText(
    window.location.origin + window.location.pathname + window.location.search
  );
  toast.success("App Link Copied.");
};

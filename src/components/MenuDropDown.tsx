import { useDialog } from "@/context/useDialog";
import { downloadImage } from "@/lib/ImageDownloader";
import { useAuth } from "@/lib/auth";
import { DropdownCell, mergeScreenUrl } from "./screen/SingleScreen";
import Icons from "./Icons";
import { getAssetsURL } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { copyImagesToClipboard } from "@/lib/ImageCopier";

export const MenuDropdown = ({ screen: screen }) => {
  const { setVisible, setVisibleNoAuth } = useDialog()
  const { user } = useAuth()
  const image = mergeScreenUrl(screen);
  // console.log(image)
  const downloadScreen = async () => {

    if (user) {
      setVisible(true)
      setTimeout(() => {
        image && downloadImage("image " + screen, image);
      }, 5000)
      return
    }
    setVisibleNoAuth(true);
  }
  return (
    <div className="absolute top-16 right-4 bg-slate-900 p-2.5 w-48 z-50  rounded-xl invisible group-hover/item:visible">
      <DropdownCell
        onClick={async () => {
          await copyImagesToClipboard([image]);
        }}
      >
        <Icons.Thumbnail className="w-5 h-5" />
        <span className="font-medium text-slate-100 text-sm">Copy PNG</span>
      </DropdownCell>
      <DropdownCell
        onClick={downloadScreen}
      >
        <Icons.Download className="w-5 h-5" />
        <span className="font-medium text-slate-100 text-sm">Download PNG</span>
      </DropdownCell>
      <DropdownCell
        onClick={() => {
          navigator.clipboard.writeText(getAssetsURL(image));
          toast.success("App Link Copied.");
        }}
      >
        <Icons.CopyFilled className="w-5 h-5" />
        <span className="font-medium text-slate-100 text-sm">Copy Link</span>
      </DropdownCell>
    </div>
  );
};

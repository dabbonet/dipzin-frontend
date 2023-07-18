import { motion } from "framer-motion";

import { FC, useEffect, useRef, useState } from "react";

import { cn, getAssetsURL } from "@/lib/utils";
import Screen from "@/ui/Screen";
import Icons from "../Icons";
import { copyImagesToClipboard } from "@/lib/ImageCopier";
import toast from "react-hot-toast";
import { downloadImage } from "@/lib/ImageDownloader";
import { useSelcetedImages } from "@/lib/SelectedToDownload";
import { useDialog } from "@/context/useDialog";
import { useAuth } from "@/lib/auth";
import { Actions } from "../Actions";
import { useContentDiscovery } from "@/context/useContentDiscovery";

interface SingleScreenProps {
  screen: any;
  setOpen?: any;
  appName?: string
}
export const mergeScreenUrl = (data) =>
  data?.attributes
    ? data.attributes?.screen.data?.attributes.hash +
    data.attributes?.screen.data?.attributes.ext
    : data;

const SingleScreen: FC<SingleScreenProps> = ({ screen, setOpen, appName }) => {
  console.log(screen)
  const { setVisibleNoAuth } = useDialog()
  const { user } = useAuth()

  const { selectedImages, setSelectedImages } = useSelcetedImages();


  useEffect(() => {
    if (selectedImages.images.includes(screen)) {
      setChecked(true);
    } else {
      setChecked(false)
    }
  }, [selectedImages]);


  const [hovered, setHovered] = useState(false);

  // TODO: Checked here should be working with the select images context.
  // Keep in mind that react-virtoso is removing the checkmark on scroll.
  const [checked, setChecked] = useState(false);
  // if the user has been authentcated i will select and if not app will show access dialog
  const addToChecked = async () => {
    if (!user) {
      setVisibleNoAuth(true)
      return
    }

    setChecked(!checked);
    setSelectedImages(prev => {
      return {
        ...prev,
        appName: appName || 'images',
        images: prev.images,
      };
    });

    const selectedImagesIDS = selectedImages.images.map(el => el);
    if (!selectedImagesIDS.includes(screen)) {
      setSelectedImages(prev => {
        return {
          ...prev,
          images: [...prev.images, screen],
        };
      });
    } else {
      setSelectedImages(prev => {
        return {
          ...prev,
          images: prev.images.filter(el => el !== screen),
        };
      });
      return;
    }

    if (selectedImages.images.length >= 5) {
      setChecked(false);
      setSelectedImages(prev => {
        return {
          ...prev,
          images: prev.images.slice(0, 5),
        };
      });
      toast.remove();
      return toast.error("You cannot download more than 5 images");
    }
  };

  if (!mergeScreenUrl(screen))
    return (
      <div className="w-full h-full bg-slate-900/70 rounded-2xl flex items-center justify-center">
        <Icons.ImageOff className="text-slate-800 w-14 h-14" />
      </div>
    );
  return (
    <div
      className="flex justify-center items-center relative group/item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        layout
        initial={{ scale: 0.98 }}
        whileHover={{
          scale: 1.0,
          transition: { duration: 0.3 },
        }}
      >
        <motion.div
          onClick={() => addToChecked()}
          animate={{ scale: checked ? 1.1 : 1 }}
          className={cn(
            "absolute top-4 left-4 group/copy border-[3px] border-slate-200 w-7 h-7 z-40 rounded-md flex items-center justify-center cursor-pointer invisible group-hover/item:visible",
            checked && "visible bg-aqua-300 text-aqua-800 border-transparent"
          )}
        >
          {checked && (
            <svg
              className="w-3 h-2.5 -z-10"
              viewBox="0 0 40 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M38.7562 1.22565C40.4146 2.85984 40.4146 5.50939 38.7562 7.14359L16.9049 28.675L16.9049 28.675C15.112 30.4416 12.2051 30.4417 10.4121 28.675C10.4121 28.675 10.4121 28.675 10.4121 28.675L1.24385 19.6409C-0.414617 18.0067 -0.414617 15.3571 1.24385 13.7229C2.90232 12.0887 5.59123 12.0887 7.24969 13.7229L13.6585 20.038L32.7503 1.22565C34.4088 -0.408549 37.0977 -0.408549 38.7562 1.22565Z"
                fill="currentColor"
              />
            </svg>
          )}
        </motion.div>
        {hovered && <Actions screen={screen} />}

        <div
          className={cn(
            "w-full rounded-2xl overflow-hidden border-2 border-transparent min-720:gap-16 cursor-pointer",
            checked && " border-aqua-300"
          )}
          onClick={() => setOpen && setOpen(mergeScreenUrl(screen) || screen)}
        >
          <Screen src={mergeScreenUrl(screen) || screen} />
        </div>
      </motion.div>
    </div>
  );
};

export default SingleScreen;



export const DropdownCell = ({ children, className, onClick, props }: any) => {
  return (
    <div
      className={cn(
        "scale-95 active:scale-100 flex items-center py-2 px-3 space-x-2 hover:bg-slate-800 rounded-lg cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

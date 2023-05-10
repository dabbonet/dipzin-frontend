import { motion } from "framer-motion";
import { FC,  useEffect, useRef, useState } from "react";
import { cn, getAssetsURL } from "@/lib/utils";
import Screen from "@/ui/Screen";
import Icons from "../Icons";
import { copyImagesToClipboard } from "@/lib/ImageCopier";
import toast from "react-hot-toast";
import { downloadImage } from "@/lib/ImageDownloader";
import { useSelcetedImages } from "@/lib/SelectedToDownload";

interface SingleScreenProps {
  screen: any;
  setOpen?: any;
}
const mergeScreenUrl = (data) =>
  data.attributes
    ? data.attributes?.screen.data?.attributes.hash +
      data.attributes?.screen.data?.attributes.ext
    : data;

const SingleScreen: FC<SingleScreenProps> = ({ screen, setOpen }) => {
  // const src = screen.attributes ? screen?.attributes.screen.data?.attributes.hash + screen?.attributes.screen.data?.attributes.ext : screen
  const {id} = screen
  const { selectedImages, setSelectedImages } = useSelcetedImages();
  const ref = useRef();
  useEffect(() => {
    
    if (selectedImages.includes(id)) {
      setChecked(true);
    }
  }, []);

  const [hovered, setHovered] = useState(false);

  // TODO: Checked here should be working with the select images context.
  // Keep in mind that react-virtoso is removing the checkmark on scroll.
  const [checked, setChecked] = useState(false);
    const addToChecked = (e) => {

    setChecked(!checked);
    if (!selectedImages.includes(id)) {
      setSelectedImages((prev) => [...prev, id]);
    } else {
      setSelectedImages((prev) => {
        return prev.filter((el) => el !== id);
      });
      return
    }
    if (selectedImages.length >= 5) {
      setChecked(false);
      setSelectedImages((prev) => prev.slice(0, 5));
      return toast.error("you cannot download more than 5 images");
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
      ref={ref}
    >
      <motion.div
        layout
        initial={{ scale: 0.98 }}
        whileHover={{
          scale: 1.0,
          transition: { duration: 0.3 },
        }}
      >
        {/* Checkbox -  Screen */}
        <motion.div
          onClick={(e) => addToChecked(e)}
          animate={{ scale: checked ? 1.1 : 1 }}
          className={cn(
            "absolute top-4 left-4 group/copy h-9 w-9 border-4 border-slate-200 z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible",
            checked && "visible border-orange-500 text-orange-500 bg-transparent"
          )}
        >
          {checked && (
            <svg
              className="w-4 h-3 -z-10"
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
            "w-full rounded-2xl overflow-hidden border-4 border-transparent min-720:gap-16 cursor-pointer",
            checked && " border-orange-500"
          )}
          onClick={() => setOpen && setOpen(mergeScreenUrl(screen))}
        >
          <Screen src={mergeScreenUrl(screen)} />
        </div>
      </motion.div>
    </div>
  );
};

export default SingleScreen;

const Actions = ({ screen: screen }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  return (
    <div className="absolute w-[100%] pt-4 pb-12 flex justify-end px-4 drop-shadow-xl z-20 bg-gradient-to-b from-slate-900/90 to-slate-900/0 rounded-[0.9rem]">
      <div
        className={`group/copy h-10 w-10 bg-slate-900 z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible`}
        onClick={async () => {
          await copyImagesToClipboard([getAssetsURL(mergeScreenUrl(screen))]);
        }}
      >
        <Icons.Copy className="w-5 h-5" />
        <span className="absolute top-16 bg-slate-900 flex items-center justify-center py-1 px-3 rounded-2xl font-normal tracking-wider text-white text-sm invisible group-hover/copy:visible z-50">
          Copy Image
        </span>
      </div>
      <div
        className="group/copy h-10 w-10 bg-slate-900 z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible mx-2"
        onClick={() => {
          setShowCollection(!showCollection);
          setShowMenu(false);
        }}
      >
        <Icons.BookmarkPlus />
        <span className="absolute top-16 bg-slate-900 flex items-center justify-center py-1 px-3 rounded-2xl font-normal tracking-wider text-white text-sm invisible group-hover/copy:visible z-50">
          Save to Collection
        </span>
      </div>
      <div
        className="group/copy h-10 w-10 bg-slate-900 z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible"
        onClick={() => {
          setShowMenu(!showMenu);
          setShowCollection(false);
        }}
      >
        <Icons.MoreHorizontal />
        <span className="absolute top-16 bg-slate-900 flex items-center justify-center py-1 px-3 rounded-2xl font-normal tracking-wider text-white text-sm invisible group-hover/copy:visible z-50">
          Menu
        </span>
      </div>
      {showMenu && <MenuDropdown screen={screen} />}
      {showCollection && <CollectionDropdown />}
    </div>
  );
};

const MenuDropdown = ({ screen: screen }) => {
  const image = mergeScreenUrl(screen);
  return (
    <div className="absolute top-16 right-4 bg-slate-900 py-[16px] w-[14rem] z-50 px-3 rounded-xl invisible group-hover/item:visible">
      <DropdownCell
        onClick={async () => {
          await copyImagesToClipboard([image]);
        }}
      >
        <Icons.Thumbnail className="w-5 h-5" />
        <span className="font-medium text-slate-100 text-sm">Copy PNG</span>
      </DropdownCell>
      <DropdownCell
        onClick={async () => {
          image && downloadImage("image " + screen.attributes.order, image);
        }}
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
const CollectionDropdown = () => {
  const [showCreate, setShowCreate] = useState<boolean>(false);

  return (
    <div className="absolute top-16 bg-slate-900 p-3 w-[88%] z-50  rounded-xl invisible group-hover/item:visible h-auto transition-all duration-500">
      {showCreate && <CreateCollection />}

      {!showCreate && (
        <>
          <input
            type="text"
            className="bg-slate-800 font-normal w-full px-4 h-10 rounded-full"
            placeholder="Search Collections"
          />
          <div className="my-2 space-y-2 max-h-[10rem] overflow-y-scroll">
            <DropdownCell className="rounded-xl">
              <Icons.Globe2 className="w-7 h-7 text-slate-200 bg-slate-700 py-1 rounded-full" />
              <span className="font-normal text-slate-100 tracking-wider text-sm">
                Public Collection
              </span>
              <Icons.Check className="text-orange-500" />
            </DropdownCell>
            <DropdownCell className="rounded-xl">
              <Icons.Globe2 className="w-7 h-7 text-slate-200 bg-slate-700 py-1 rounded-full" />
              <span className="font-normal text-slate-100 tracking-wider text-sm">
                Public Collection
              </span>
              <Icons.Check className="text-orange-500" />
            </DropdownCell>
            <DropdownCell className="rounded-xl">
              <Icons.Globe2 className="w-7 h-7 text-slate-200 bg-slate-700 py-1 rounded-full" />
              <span className="font-normal text-slate-100 tracking-wider text-sm">
                Private Collection
              </span>
              <Icons.Check className="text-orange-500" />
            </DropdownCell>
            <DropdownCell className="rounded-xl">
              <Icons.Globe2 className="w-7 h-7 text-slate-200 bg-slate-700 py-1 rounded-full" />
              <span className="font-normal text-slate-100 tracking-wider text-sm">
                Private Collection
              </span>
              <Icons.Check className="text-orange-500" />
            </DropdownCell>
            <DropdownCell className="rounded-xl">
              <Icons.Globe2 className="w-7 h-7 text-slate-200 bg-slate-700 py-1 rounded-full" />
              <span className="font-normal text-slate-100 tracking-wider text-sm">
                Private Collection
              </span>
              <Icons.Check className="text-orange-500" />
            </DropdownCell>
            <DropdownCell className="rounded-xl">
              <Icons.Globe2 className="w-7 h-7 text-slate-200 bg-slate-700 py-1 rounded-full" />
              <span className="font-normal text-slate-100 tracking-wider text-sm">
                Private Collection
              </span>
              <Icons.Check className="text-orange-500" />
            </DropdownCell>
          </div>
        </>
      )}

      <button
        className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 tracking-wider rounded-full"
        onClick={() => setShowCreate(!showCreate)}
      >
        {showCreate ? "Create & Add" : "Create Collection"}
      </button>
    </div>
  );
};

const CreateCollection = () => {
  return (
    <div className="mx-2 mb-2">
      <span className="text-sm text-slate-500 ">Collection Name</span>
      <input
        type="text"
        className="bg-slate-800 font-normal tracking-wider w-full px-4 h-10 mt-1 rounded-lg"
        placeholder="Friends..."
      />
    </div>
  );
};

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

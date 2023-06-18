import { getAssetsURL } from "@/lib/utils";
import { mergeScreenUrl } from "./screen/SingleScreen";
import { useState } from "react";
import { copyImagesToClipboard } from "@/lib/ImageCopier";
import Icons from "./Icons";
import { MenuDropdown } from "./MenuDropDown";
import { CollectionDropdown } from "./CollectionDropDown";
export const Actions = ({ screen: screen }) => {
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
      {/* <div
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
      </div> */}
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

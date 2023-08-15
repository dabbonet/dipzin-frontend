import { getAssetsURL } from "@/lib/utils";
import { mergeScreenUrl } from "./screen/SingleScreen";
import { useState } from "react";
import { copyImagesToClipboard } from "@/lib/ImageCopier";
import Icons from "./Icons";
import { MenuDropdown } from "./MenuDropDown";
import { CollectionDropdown } from "./CollectionDropDown";
import { usePathname } from "next/navigation";
import Image from "next/image";
type actions = {
  screen: any
  appName?: any
  tagLine?: any
  icon?: any
}
export const Actions = ({ screen: screen , appName , tagLine , icon }: actions) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const path = usePathname()
  return (
    <>
      <div className="absolute w-[100%] pt-4 pb-12 flex gap-3 justify-end px-4 drop-shadow-xl z-20 bg-gradient-to-b from-slate-900/90 to-slate-900/0 rounded-[0.9rem]">
        <div
          className={`group/copy w-fit h-fit py-2 px-2 bg-slate-900 z-40 rounded-xl text-sm flex items-center justify-center cursor-pointer invisible group-hover/item:visible`}
          onClick={async () => {
            await copyImagesToClipboard([getAssetsURL(mergeScreenUrl(screen))]);
          }}
        >

          <Icons.Copy className="w-4 h-4" />
          <span className=" ml-2">Copy</span>

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
          className="group/copy h-9 w-9 bg-slate-900 z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible"
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
      <div className="absolute w-[100%] pb-4 pt-12 px-4 drop-shadow-xl z-20 bg-gradient-to-t from-slate-900/90 to-slate-900/0 rounded-[0.9rem] bottom-0">
        {path.startsWith('/search') && <div className=" flex flex-col">
          <Image src={icon} width={48} height={48} alt={tagLine} className=" rounded-md"/>
          <span className="text-md tracking-wider font-medium">{appName}</span>
          <span className="block text-[13px] font-light tracking-widest">
              {tagLine}
          </span>
        </div>
        }
      </div>
    </>
  );
};

'use client'

import { useState } from "react";
import { DropdownCell } from "./screen/SingleScreen";
import Icons from "./Icons";

export const CollectionDropdown = () => {
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
  
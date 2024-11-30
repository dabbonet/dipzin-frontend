import { mapItemPattern } from "@/app/(explorer)/_utils/keywordUtils";
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface CategoriesContentProps {
  selectedResult: any;
  suggestedSearch: any;
  handleUpdate: (pattern: string, value: string) => void;
}

const CategoriesContent: React.FC<CategoriesContentProps> = ({
  selectedResult,
  suggestedSearch,
  handleUpdate,
}) => {
  const categories = suggestedSearch[selectedResult?.id as string];
  const pattern = mapItemPattern(selectedResult);

  if (!categories) return null;
  return (
    <>
      {categories.map((category: any) => (
        <div key={uuidv4()} className="size-full overflow-y-auto">
          <div className="flex flex-col gap-2 p-0 px-2 md:p-2" key={uuidv4()}>
            <span className="text-base p-2 font-medium text-slate-400 hidden md:flex">
              {category.title}
            </span>
            <ul>
              {category.items.map((item: any) => (
                <li
                  key={uuidv4()}
                  className="p-2 flex justify-between gap-2 hover:bg-slate-700/60 rounded-xl"
                >
                  <button
                    type="button"
                    onClick={() => handleUpdate(pattern, item)}
                    className="w-full h-fit flex items-start text-sm sm:text-[20px] text-slate-100 font-medium hover:text-slate-300 active:text-slate-400 transition-colors"
                  >
                    {item}
                  </button>
                  {/* <span className="text-slate-300 text-base">{item.count}</span> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoriesContent;

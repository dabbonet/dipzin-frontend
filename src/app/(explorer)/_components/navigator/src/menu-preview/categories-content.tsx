import { mapItemPattern } from '@/app/(explorer)/_utils/keywordUtils';
import React from 'react';


interface CategoriesContentProps {
  selectedResult: any;
  suggestedSearch: any;
  handleUpdate: any;
}

const CategoriesContent: React.FC<CategoriesContentProps> = ({selectedResult, suggestedSearch, handleUpdate}) => {
  
  const categories = suggestedSearch[selectedResult?.id as string]
  const itemHandler = (item: any) => [{name:item, pattern:mapItemPattern(selectedResult)}]

  if(!categories) return null;
  return (
    <div className='h-full w-full overflow-y-auto'>
      {
        categories.map((category:any, index: number) => (
          <div className="flex flex-col gap-2 p-2" key={index}>
            <span className="text-base p-2 font-medium text-slate-400">{category.title}</span>
            <ul>
              {category.items.map((item:any,index:number) => (
                <li key={index} className="py-1 px-2 flex justify-between gap-2 hover:bg-slate-700/60 rounded-xl">
                  <button type="button" onClick={() => handleUpdate(undefined, undefined, itemHandler(item))} className="w-full h-fit flex items-start text-[20px] text-slate-100 font-medium hover:text-slate-300 active:text-slate-400 transition-colors">
                    {item}
                  </button>
                  {/* <span className="text-slate-300 text-base">{item.count}</span> */}
                </li>
              ))}
            </ul>
          </div>
        ))
      }
    </div>
  );
}

export default CategoriesContent;

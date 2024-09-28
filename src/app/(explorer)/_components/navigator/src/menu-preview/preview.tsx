import React from 'react';
import SearchContent from './search-content';
import { useKeyword } from '@/app/(explorer)/_hooks/useKeyword';

type NavigatorMenuPreviewProps = {
  searchResults?: any;
};

export const NavigatorMenuPreview: React.FC<NavigatorMenuPreviewProps> = () => {
  
  const { selectedResult } = useKeyword();

  return (
      <div className="w-[70%] max-h-[50vh] rounded-[30px] p-2 bg-[#1A2333]">
        {/* {state === "initial" &&
          <NavigatorMenuInitialContent data={initialContentData} />
        }

        {state === "categories" &&
          <CategoriesContent categories={categoriesData}/>
        } */}

        {selectedResult
        && <SearchContent selectedResult={selectedResult} />}
      </div>
  )
}

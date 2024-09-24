import { searchResults } from '@/components/mockdata';
import React, { useEffect } from 'react';
import SearchContent from './search-content';
import { KeywordProvider, useKeyword } from '@/app/(explorer)/_hooks/useKeyword';

type NavigatorMenuPreviewProps = {
  searchResults?: any;
};

export const NavigatorMenuPreview: React.FC<NavigatorMenuPreviewProps> = () => {
  // let state = "search";
  const { results } = useKeyword();
  // const searchResults = results?.hits || [];
  // const results = getResults();
  const appDetails = searchResults[1];
  

  return (
    <KeywordProvider>
      <div className="w-[70%] max-h-[50vh] rounded-[30px] p-2 bg-[#1A2333]">
        {/* {state === "initial" &&
          <NavigatorMenuInitialContent data={initialContentData} />
        }

        {state === "categories" &&
          <CategoriesContent categories={categoriesData}/>
        } */}

        {results
        && <SearchContent appDetails={appDetails} />}
      </div>
    </KeywordProvider>
  )
}

import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Shared/avatar';
import { extractInitials } from '@/utils/StringUtils';
import { storage } from '@/utils/storage';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';

interface SearchContentProps {
  selectedResult: any;
}

const SearchContent: React.FC<SearchContentProps> = ({ selectedResult }) => {
  const { urlQuery } = useQuery();
  const { platform } = urlQuery;
  const category = selectedResult.categories && selectedResult.categories.length > 0 ? selectedResult.categories[0] : null;
  const platforms = selectedResult?.platforms?.join(', ') || "Android, Web, Ios";
  
  // Determine the platform to use for displaying screenshots
  const resultPlatform = (() => {
    // Check if selectedResult.platforms exists and includes the current platform
    if (selectedResult.platforms && selectedResult.platforms.includes(platform)) {
      return platform;
    }
    // If selectedResult.platforms exists but doesn't include the current platform, use the first available platform
    if (selectedResult.platforms) {
      return selectedResult.platforms[0];
    }
    // If selectedResult.platforms doesn't exist, use the current platform from urlQuery
    return platform;
  })();

  return(
  <div className="space-y-4 h-full flex flex-col">
    <div className="flex gap-4 justify-between px-4 pt-2 grow-0">

      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={storage(selectedResult.icon)} alt={selectedResult.name} />
          <AvatarFallback>{extractInitials(selectedResult.name)}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">{selectedResult.name}</h2>
        <p className="text-slate-400">{selectedResult.tag_line}</p>
      </div>

      <div className="flex gap-8">

        <div className="flex flex-col">
          <p className="text-slate-400">
            Platform:
          </p>
            <p className="text-white font-semibold capitalize">{platforms}</p>
        </div>
        {
          category &&
          <div className="flex flex-col">
            <p className="text-slate-400">
              Category:
            </p>
            <p className="text-white font-semibold capitalize">{category}</p>
          </div>
        }

      </div>

    </div>
    <div className="flex justify-around min-h-0 p-2">
      {selectedResult && selectedResult.screens && selectedResult?.screens[resultPlatform]?.map((screenshot: string, index: number) => (
        <Image
          key={screenshot}
          src={storage(screenshot)}
          alt={`${selectedResult.name} screenshot ${index + 1}`}
          width={200}
          height={430}
          className="h-full w-fit rounded-2xl"
        />
      ))}
    </div>
  </div>
)};

export default SearchContent;

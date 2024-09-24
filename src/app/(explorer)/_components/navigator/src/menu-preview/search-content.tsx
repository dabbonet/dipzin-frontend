import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Shared/avatar';
import { extractInitials } from '@/utils/StringUtils';

interface SearchContentProps {
  appDetails: any;
}

const SearchContent: React.FC<SearchContentProps> = ({ appDetails }) => (
  <div className="space-y-4 h-full flex flex-col">
    <div className="flex gap-4 justify-between px-4 pt-2 grow-0">

      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={appDetails.avatar} alt={appDetails.label} />
          <AvatarFallback>{extractInitials(appDetails.label)}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">{appDetails.content.name}</h2>
        <p className="text-slate-400">{appDetails.description}</p>
      </div>

      <div className="flex gap-8">

        <div className="flex flex-col">
          <p className="text-slate-400">
            Platform:
          </p>
          <p className="text-white font-semibold">{appDetails.content.platform}</p>
        </div>

        <div className="flex flex-col">
          <p className="text-slate-400">
            Rating:
          </p>
          <p className="text-white font-semibold">{appDetails.content.rating}</p>
        </div>

        <div className="flex flex-col">
          <p className="text-slate-400">
            Category:
          </p>
          <p className="text-white font-semibold">{appDetails.content.category}</p>
        </div>

      </div>

    </div>
    <div className="flex justify-around min-h-0 p-2">
      {appDetails?.content?.screenshots?.map((screenshot: string, index: number) => (
        <Image
          key={screenshot}
          src={screenshot}
          alt={`${appDetails.name} screenshot ${index + 1}`}
          width={200}
          height={430}
          className="h-full w-fit rounded-2xl"
        />
      ))}
    </div>
  </div>
);

export default SearchContent;

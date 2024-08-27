import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Shared/avatar';
import { Icon } from '@/components/UI/icon';
import { Button } from '@/components/Shared/button';
import { extractInitials } from '@/utils/StringUtils';
import { Dropdown } from '@/components/Shared/dropdown';

interface AppPillProps {
  isFull?: boolean;
  data: {
    imgSrc: string;
    fallback: string;
    name: string;
    tagLine: string;
    platform?: string;
    rating?: number;
    category?: string;
  };
}

const AppPill: React.FC<AppPillProps> = ({ isFull = false, data }) => (
  <div className={`max-w-full w-full h-fit bg-[#1A2333] p-2 rounded-[2rem] grid ${isFull ? 'grid-cols-3 sm:grid-cols-6 md:grid-cols-12' : 'grid-cols-2'} gap-4 items-center font-poppins`}>
    <div className={`${isFull ? 'col-span-3 sm:col-span-3 md:col-span-4' : 'col-span-1'} flex items-center gap-4 text-white`}>
      <Avatar>
        <AvatarImage src={data.imgSrc} alt={data.name} />
        <AvatarFallback>{extractInitials(data.fallback)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-0 lg:gap-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white">{data.name}</h3>
        <p className="text-xs sm:text-sm md:text-xs text-slate-400">{data.tagLine}</p>
      </div>
    </div>

    {isFull && (
      <>
        <div className="col-span-2 flex flex-col text-white font-medium whitespace-nowrap">
          <small className="text-slate-500 text-xs">Platform</small>
          <span className="text-sm sm:text-base">{data.platform}</span>
        </div>
        <div className="col-span-1 flex flex-col text-white font-medium whitespace-nowrap">
          <small className="text-slate-500 text-xs">Rating</small>
          <span className="flex items-center gap-1">
            {data.rating}
            {' '}
            <Icon.Star width={20} height={20} color="#F79009" />
          </span>
        </div>
        <div className="col-span-2 flex flex-col text-white font-medium whitespace-nowrap">
          <small className="text-slate-500 text-xs">Category</small>
          <span className="text-sm sm:text-base truncate">{data.category}</span>
        </div>
      </>
    )}

    <div className={`${isFull ? 'col-span-3' : 'col-span-1'} flex items-center justify-end gap-4 font-medium whitespace-nowrap`}>
      <Button size="md" className="rounded-full p-2" variant="darkGray" isIconOnly>
        <Icon.Bookmark className="size-6 stroke-white fill-transparent" />
      </Button>
      <Button size="md" className="rounded-full p-2" variant="darkGray" isIconOnly>
        <Icon.Eye className="size-6 stroke-white fill-transparent" />
      </Button>
      <Dropdown
        trigger={(
          <Button size="md" className="rounded-full p-2" variant="darkGray" isIconOnly>
            <Icon.EllipsisHorizontal className="size-6 text-white" />
          </Button>
)}
        content="content"
        placement="end"
      />

    </div>
  </div>
);

export default AppPill;

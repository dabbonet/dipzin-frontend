import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Shared/avatar';
import { Icon } from '@/components/UI/icon';
import { Button } from '@/components/Shared/button';
import { extractInitials } from '@/utils/StringUtils';
import { Dropdown } from '@/components/Shared/dropdown';
import { storage } from '@/utils/storage';
import { cn } from '@/lib/utils';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';

interface AppPillProps {
  isFull?: boolean;
  data: any;
}

const AppPill: React.FC<AppPillProps> = ({ isFull = false, data }) => {
  const [isHovered, setIsHovered] = useState(false); // To track hover state
  const { query, setApps } = useQuery(); // Zustand function to remove app from the store

  if (typeof data === 'string' || !data) {
    return null;
  }

  const handleRemoveApp = () => {
    const updatedApps = query.apps.filter((app: any) => app.slug !== data.slug);
    setApps(updatedApps);
  };

  return (
    <div
      className={cn(
        data.neglected === true ? 'opacity-50' : 'opacity-100',
        `max-w-full w-full h-fit bg-[#1A2333] px-1.5 py-1 rounded-[2rem] grid
        ${isFull ? 'grid-cols-4 sm:grid-cols-7 md:grid-cols-12' : 'grid-cols-4'}
        gap-4 items-center `
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`${isFull ? 'col-span-3 sm:col-span-3 md:col-span-4' : 'col-span-3'} flex items-center gap-4 text-white`}
      >
        {!isHovered ? (
          <Avatar>
            <AvatarImage src={storage(data?.icon)} alt={data?.name} />
            <AvatarFallback>{data.name && extractInitials(data?.name)}</AvatarFallback>
          </Avatar>
        ) : (
          <Button size="md" className="rounded-full p-2 bg-slate-800/20" variant="darkGray" isIconOnly onClick={handleRemoveApp}>
            <Icon.Close className="size-6 fill-white stroke-white" />
          </Button>
        )}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-0 lg:gap-4 w-full">
          <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white">{data.name}</h3>
          <p className="text-xs sm:text-sm md:text-xs text-slate-400 w-fit">{data.tag_line}</p>
        </div>
      </div>

      {isFull && (
        <>
          <div className="col-span-2 flex flex-col text-white font-medium whitespace-nowrap">
            <small className="text-slate-500 text-xs">Platform</small>
            <span className="text-sm sm:text-base">{data.platform}</span>
          </div>
          <div className="col-span-2 flex flex-col text-white font-medium whitespace-nowrap">
            <small className="text-slate-500 text-xs">Category</small>
            <span className="text-sm sm:text-base truncate">{data.categories}</span>
          </div>
        </>
      )}

      <div className={`${isFull ? 'col-span-4' : 'col-span-1'} flex items-end justify-end gap-4 font-medium whitespace-nowrap`}>
        <Button size="md" className="rounded-full p-2" variant="darkGray" isIconOnly>
          <Icon.Bookmark className="size-6 stroke-white fill-transparent" />
        </Button>
        <Button size="md" className="rounded-full p-2" variant="darkGray" isIconOnly>
          <Icon.Eye className="size-6 stroke-white fill-transparent" />
        </Button>
        <Dropdown
          trigger={(
            <Button size="md" className="rounded-full p-2" variant="darkGray" isIconOnly>
              <Icon.Dots className="size-6 text-white" />
            </Button>
          )}
          content="content"
          placement="end"
        />
      </div>
    </div>
  );
};

export default AppPill;

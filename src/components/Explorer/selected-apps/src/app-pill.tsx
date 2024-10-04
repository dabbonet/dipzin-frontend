import React, { useEffect, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Shared/avatar';
import { Icon } from '@/components/UI/icon';
import { Button } from '@/components/Shared/button';
import { extractInitials } from '@/utils/StringUtils';
import { Dropdown } from '@/components/Shared/dropdown';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { getAppPreview } from '@/app/(explorer)/_actions/getAppPreview';
import { storage } from '@/utils/storage';

interface AppPillProps {
  isFull?: boolean;
  data: any;
}

const AppPill: React.FC<AppPillProps> = ({ isFull = false, data }) => {
  const { query, setApps } = useQuery();

  // Memoize the apps array to avoid unnecessary re-renders
  const apps: any[] = useMemo(() => query.apps || [], [query.apps]);

  useEffect(() => {
    const getApps = async () => {
      if (apps.length > 0) {
        const fullApps = await Promise.all(apps.map(async (app: string) => getAppPreview(app)));
        setApps(() => fullApps);
      }
    };
    getApps();
  }, []); // Removed the direct use of 'apps' in the dependency array

  if (typeof data === 'string' || !data) {
    return null;
  }

  return (
    <div className={`max-w-full w-full h-fit bg-[#1A2333] px-1.5 py-1 rounded-[2rem] grid ${isFull ? 'grid-cols-4 sm:grid-cols-7 md:grid-cols-12' : 'grid-cols-4'} gap-4 items-center font-poppins`}>
      <div className={`${isFull ? 'col-span-3 sm:col-span-3 md:col-span-4' : 'col-span-3'} flex items-center gap-4 text-white`}>
        <Avatar>
          <AvatarImage src={storage(data?.icon)} alt={data?.name} />
          <AvatarFallback>{data.name && extractInitials(data?.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-0 lg:gap-4 w-full">
          <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white">{data.name}</h3>
          <p className="text-xs sm:text-sm md:text-xs text-slate-400 w-fit">{data.tagLine}</p>
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
}

export default AppPill;

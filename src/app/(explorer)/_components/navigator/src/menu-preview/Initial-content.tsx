import { extractInitials } from '@/utils/StringUtils';
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Shared/avatar';
import Image from 'next/image';
import { Pill } from '@/components/Shared/pill';
import { storage } from '@/utils/storage';

type AppItemType = {
  name: string;
  imgSrc: string;
  onClick: any;
};

type FlowItemType = {
  name: string;
  imgSrc: string;
  onClick: any;
};

const AppItem = ({ name, imgSrc, onClick }: AppItemType) => (
  <button onClick={onClick} className="flex flex-1 flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-700" type="button">
    <Avatar size="medium">
      <AvatarImage width={80} height={80} src={imgSrc} alt={name} />
      <AvatarFallback>{extractInitials(name)}</AvatarFallback>
    </Avatar>
    <h3 className="text-base whitespace-nowrap font-semibold">{name}</h3>
  </button>
);

const FlowItem = ({ name, imgSrc, onClick }: FlowItemType) => (
  <button onClick={onClick} className="flex flex-1 flex-col items-center aspect-square gap-2 p-4 rounded-2xl hover:bg-slate-700" type="button">
    <Image src={imgSrc} alt={name} width={40} height={40} />
    <h3 className="text-base whitespace-nowrap font-semibold">{name}</h3>
  </button>
);

type NavigatorMenuInitialContentProps = {
  data: {
    apps: AppItemType[];
    flows: FlowItemType[];
    tags: string[];
    components: string[];
  };
  handleUpdate: any;
};

export const NavigatorMenuInitialContent = ({ data: initialData, handleUpdate }: NavigatorMenuInitialContentProps) => { // Renamed data to initialData
  const itemHandler = (item: any, pattern: string) => [{ name: item, pattern }];
  const iconName = (data: any) => data.hash + data.ext;

  if (!initialData) return null;

  return (
    <div className="size-full space-y-2 p-4 size-full overflow-y-auto">
      <div className="space-y-2">
        <h2 className="text-lg text-aqua-500 font-medium">Most Viewed Apps</h2>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {initialData?.apps?.map((item: any) => ( // Removed index key
            <AppItem name={item.name} imgSrc={storage(iconName(item.icon))} key={item.name} onClick={() => handleUpdate(undefined, undefined, undefined, item.name)} />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg text-aqua-500 font-medium">Suggested Flows</h2>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {initialData?.flows?.map((item: FlowItemType) => ( // Removed index key
            <FlowItem name={item.name} imgSrc={item.imgSrc} key={item.name} onClick={() => handleUpdate(undefined, undefined, itemHandler(item.name, 'flows'))} />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg text-aqua-500 font-medium">Screens</h2>
        <div className="flex flex-wrap gap-2">
          {initialData?.tags?.map((item: any) => ( // Removed index key
            <Pill className="cursor-pointer" state="suggestion" type="withAction" key={item} onClick={() => handleUpdate(undefined, undefined, itemHandler(item.name, 'screens'))}>
              {item.name}
            </Pill>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg text-aqua-500 font-medium">Components</h2>
        <div className="flex flex-wrap gap-2">
          {initialData?.components?.map((item: any) => ( // Removed index key
            <Pill className="cursor-pointer" state="suggestion" type="withAction" key={item} onClick={() => handleUpdate(undefined, undefined, itemHandler(item.name, 'screens'))}>
              {item.name}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  );
};

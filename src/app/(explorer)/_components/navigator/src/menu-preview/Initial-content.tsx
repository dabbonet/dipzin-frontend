import { extractInitials, mergeIconFromObject } from '@/utils/StringUtils';
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Shared/avatar';
import { Pill } from '@/components/Shared/pill';
import { storage } from '@/utils/storage';
import { Icon } from '@/components/UI/icon';

type AppItemType = {
  name: string;
  imgSrc: string;
};

type FlowItemType = {
  name: string;
};

const AppItem = ({ name, imgSrc, onClick }: AppItemType & { onClick: () => void }) => (
  <button onClick={onClick} className="flex flex-1 flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-700" type="button">
    <Avatar size="medium">
      <AvatarImage width={80} height={80} src={imgSrc} alt={name} />
      <AvatarFallback>{extractInitials(name)}</AvatarFallback>
    </Avatar>
    <h3 className="text-base whitespace-nowrap font-semibold">{name}</h3>
  </button>
);

const FlowItem = ({ name, onClick }: FlowItemType & { onClick: () => void }) => (
  <button onClick={onClick} className="w-9 h-32 flex flex-1 flex-col items-center justify-between gap-2 p-4 rounded-2xl hover:bg-slate-700" type="button">
    <Icon.ChevronDoubleRight className="size-8" />
    <h3 className="text-base font-semibold">{name}</h3>
  </button>
);

type NavigatorMenuInitialContentProps = {
  data: {
    apps: AppItemType[];
    flows: FlowItemType[];
    tags: { name: string }[];
    components: { name: string }[];
  };
  handleUpdate: (pattern: string, value: string) => void;
};

export const NavigatorMenuInitialContent = ({ data: initialData, handleUpdate }: NavigatorMenuInitialContentProps) => {
  if (!initialData) return null;

  return (
    <div className="size-full space-y-2 p-4 overflow-y-auto">
      <div className="space-y-2">
        <h2 className="text-lg text-aqua-500 font-medium">Most Viewed Apps</h2>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {initialData.apps?.map((item: any) => (
            <AppItem
              name={item.name}
              imgSrc={storage(mergeIconFromObject(item.icon))}
              key={item.name}
              onClick={() => handleUpdate('apps', item.name)}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg text-aqua-500 font-medium">Suggested Flows</h2>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {initialData.flows?.map((item) => (
            <FlowItem
              name={item.name}
              key={item.name}
              onClick={() => handleUpdate('flows', item.name)}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg text-aqua-500 font-medium">Screens</h2>
        <div className="flex flex-wrap gap-2">
          {initialData.tags?.map((item) => (
            <Pill
              className="cursor-pointer"
              state="suggestion"
              type="withAction"
              key={item.name}
              onClick={() => handleUpdate('screens', item.name)}
            >
              {item.name}
            </Pill>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg text-aqua-500 font-medium">Components</h2>
        <div className="flex flex-wrap gap-2">
          {initialData.components?.map((item) => (
            <Pill
              className="cursor-pointer"
              state="suggestion"
              type="withAction"
              key={item.name}
              onClick={() => handleUpdate('components', item.name)}
            >
              {item.name}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  );
};

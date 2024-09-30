import { extractInitials } from '@/utils/StringUtils'
import React, { type Key } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Shared/avatar';
import Image from 'next/image';
import { Pill } from '@/components/Shared/pill';

type AppItemType = {
  name: string;
  imgSrc: string;
  onClick: any;
}

type FlowItemType = {
  name: string;
  imgSrc: string;
  onClick: any;
}

const AppItem = ({ name, imgSrc, onClick }: AppItemType) => (
  <button onClick={onClick} className="flex flex-1 flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-700">
    <Avatar size="medium">
      <AvatarImage width={80} height={80} src={imgSrc} alt={name} />
      <AvatarFallback>{extractInitials(name)}</AvatarFallback>
    </Avatar>
    <h3 className="text-md whitespace-nowrap font-semibold">{name}</h3>
  </button>
)

const FlowItem = ({ name, imgSrc, onClick }: FlowItemType) => (
  <button onClick={onClick} className="flex flex-1 flex-col items-center aspect-square gap-2 p-4 rounded-2xl hover:bg-slate-700">
    <Image src={imgSrc} alt={name} width={40} height={40} />
    <h3 className="text-md whitespace-nowrap font-semibold">{name}</h3>
  </button>
)

type NavigatorMenuInitialContentProps = {
  data: {
    apps: AppItemType[];
    flows: FlowItemType[];
    tags: string[];
    components: string[];
  },
  handleUpdate: any;
}

export const NavigatorMenuInitialContent = ({ data, handleUpdate }: NavigatorMenuInitialContentProps) => {
  const itemHandler = (item: any, pattern: string) => [{name:item, pattern: pattern}]
  if (!data) return null;
  return (
    <div className="size-full space-y-2 p-4 h-full w-full overflow-y-auto">
      <div className="space-y-2">
        <h2 className="text-lg text-aqua-500 font-medium">Most Viewed Apps</h2>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {/* // TODO: itemHandler here is setting filters not apps, needs fix */}
          {data.apps.map((item: AppItemType, index: Key) => (
            <AppItem name={item.name} imgSrc={""} key={index}  onClick={() => handleUpdate(undefined, undefined, itemHandler(item.name, 'screens'))}/>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg text-aqua-500 font-medium">Suggested Flows</h2>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {data.flows.map((item: FlowItemType, index: Key) => (
            <FlowItem name={item.name} imgSrc={item.imgSrc} key={index} onClick={() => handleUpdate(undefined, undefined, itemHandler(item.name, 'flows'))}/>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg text-aqua-500 font-medium">Screens</h2>
        <div className="flex flex-wrap gap-2">
          {data.tags.map((item: any, index: Key) => (
            <Pill className="cursor-pointer" state="suggestion" type="withAction" key={index} onClick={() => handleUpdate(undefined, undefined, itemHandler(item.name, 'screens'))}>{item.name}</Pill>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg text-aqua-500 font-medium">Components</h2>
        <div className="flex flex-wrap gap-2">
          {data.components.map((item: any, index: Key) => (
            <Pill className="cursor-pointer" state="suggestion" type="withAction" key={index} onClick={() => handleUpdate(undefined, undefined, itemHandler(item.name, 'screens'))}>{item.name}</Pill>
          ))}
        </div>
      </div>
    </div>
  )
}

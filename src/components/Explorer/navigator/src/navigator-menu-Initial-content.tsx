import { extractInitials } from '@/utils/StringUtils'
import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Shared/avatar';
import Link from 'next/link';
import Image from 'next/image';
import { Pill } from '@/components/Shared/pill';

type AppItemType = {
  name: string;
  imgSrc: string;
}

type FlowItemType = {
  name: string;
  imgSrc: string;
}

const AppItem = ({ name, imgSrc }: AppItemType) => (
  <Link href="/" className="flex flex-1 flex-col items-center gap-2 p-5 rounded-2xl hover:bg-slate-700">
    <Avatar className="size-20" size="large">
      <AvatarImage width={80} height={80} src={imgSrc} alt={name} />
      <AvatarFallback>{extractInitials(name)}</AvatarFallback>
    </Avatar>
    <h3 className="text-[20px] whitespace-nowrap font-semibold">{name}</h3>
  </Link>
)

const FlowItem = ({ name, imgSrc }: FlowItemType) => (
  <Link href="/" className="flex flex-1 flex-col items-center aspect-square gap-2 p-5 rounded-2xl hover:bg-slate-700">
    <Image src={imgSrc} alt={name} width={40} height={40} />
    <h3 className="text-base whitespace-nowrap">{name}</h3>
  </Link>
)

type NavigatorMenuInitialContentProps = {
  data: {
    mostViewedApps: AppItemType[];
    suggestedFlows: FlowItemType[];
    screens: string[];
    elements: string[];
  }
}

export const NavigatorMenuInitialContent = ({ data }: NavigatorMenuInitialContentProps) => (
  <div className="size-full space-y-6 p-4">
    <div className="space-y-4">
      <h2 className="text-[20px] text-aqua-500 font-medium">Most Viewed Apps</h2>
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {data.mostViewedApps.map((item: AppItemType) => (
          <AppItem name={item.name} imgSrc={item.imgSrc} key={item.name} />
        ))}
      </div>
    </div>
    <div className="space-y-4">
      <h2 className="text-[20px] text-aqua-500 font-medium">Suggested Flows</h2>
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {data.suggestedFlows.map((item: FlowItemType) => (
          <FlowItem name={item.name} imgSrc={item.imgSrc} key={item.name} />
        ))}
      </div>
    </div>
    <div className="space-y-4">
      <h2 className="text-[20px] text-aqua-500 font-medium">Screens</h2>
      <div className="flex flex-wrap gap-2">
        {data.screens.map((item: string) => (
          <Pill className="cursor-pointer" state="suggestion" type="withAction" key={item}>{item}</Pill>
        ))}
      </div>
    </div>
    <div className="space-y-4">
      <h2 className="text-[20px] text-aqua-500 font-medium">Elements</h2>
      <div className="flex flex-wrap gap-2">
        {data.elements.map((item: string) => (
          <Pill className="cursor-pointer" state="suggestion" type="withAction" key={item}>{item}</Pill>
        ))}
      </div>
    </div>
  </div>
)

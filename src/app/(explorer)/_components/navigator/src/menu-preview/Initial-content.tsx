import { extractInitials, mergeIconFromObject } from '@/utils/StringUtils';
import React from 'react';
import { Pill } from '@/components/Shared/pill';
import { storage } from '@/utils/storage';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import type { AppType } from '@/types/app-types';
import {
  ArchiveBoxIcon,
  ArrowDownTrayIcon,
  ChatBubbleBottomCenterTextIcon,
  EyeIcon,
  FunnelIcon,
  PencilSquareIcon,
  PlayCircleIcon,
  PlusCircleIcon,
  RocketLaunchIcon,
  SparklesIcon,
  TrashIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

type AppItemType = {
  name: string;
  imgSrc?: string | null;
  icon?: string | { hash?: string; ext?: string } | null;
};

type FlowItemType = {
  name: string;
};

const getIconFileName = (app: AppItemType & Record<string, any>) => {
  if (typeof app.icon === 'string') return app.icon;
  if (app.icon?.hash && app.icon?.ext) return mergeIconFromObject(app.icon);
  if (typeof app.imgSrc === 'string') return app.imgSrc;
  return '';
};

const appToneByName = (name: string) => {
  const tones = [
    'from-emerald-300/10 via-aqua-400/5 to-transparent',
    'from-orange-300/10 via-amber-400/5 to-transparent',
    'from-fuchsia-300/10 via-purple-400/5 to-transparent',
    'from-blue-300/10 via-cyan-400/5 to-transparent',
    'from-lime-300/10 via-teal-400/5 to-transparent',
  ];
  const index = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % tones.length;
  return tones[index];
};

const AppItem = ({ name, imgSrc, icon, onClick }: AppItemType & { onClick: () => void }) => {
  const iconFileName = getIconFileName({ name, imgSrc, icon });
  const iconUrl = iconFileName ? storage(iconFileName) : '';

  return (
    <button
      onClick={onClick}
      className="group relative w-[104px] shrink-0 rounded-[28px] border border-white/10 bg-white/[0.045] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-200 hover:border-aqua-300/30 hover:bg-white/[0.065] hover:shadow-[0_10px_24px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.08)]"
      type="button"
    >
      <div className={`absolute inset-x-0 top-0 h-16 rounded-t-[28px] bg-gradient-to-br ${appToneByName(name)} opacity-70 transition group-hover:opacity-90`} />
      <div className="relative flex flex-col items-center gap-3">
        <div className="grid size-14 place-items-center overflow-hidden rounded-[20px] border border-white/15 bg-slate-950/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur">
          {iconUrl ? (
            <img
              src={iconUrl}
              alt={name}
              className="size-11 rounded-[14px] object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-lg font-semibold text-white/90">{extractInitials(name).slice(0, 2)}</span>
          )}
        </div>
        <h3 className="max-w-full truncate text-center text-sm font-semibold text-white">{name}</h3>
      </div>
    </button>
  );
};

const flowVisuals = [
  { test: /edit|update|draw/i, Icon: PencilSquareIcon, tone: 'from-sky-300/15 to-cyan-400/5' },
  { test: /subscrib|upgrad|follow/i, Icon: UserPlusIcon, tone: 'from-emerald-300/15 to-teal-400/5' },
  { test: /feedback|comment|chat/i, Icon: ChatBubbleBottomCenterTextIcon, tone: 'from-violet-300/15 to-fuchsia-400/5' },
  { test: /video|watch/i, Icon: PlayCircleIcon, tone: 'from-rose-300/15 to-orange-400/5' },
  { test: /add|creat/i, Icon: PlusCircleIcon, tone: 'from-lime-300/12 to-emerald-400/5' },
  { test: /delet|remov/i, Icon: TrashIcon, tone: 'from-red-300/14 to-rose-400/5' },
  { test: /filter|sort/i, Icon: FunnelIcon, tone: 'from-aqua-300/15 to-blue-400/5' },
  { test: /archiv/i, Icon: ArchiveBoxIcon, tone: 'from-amber-300/14 to-yellow-400/5' },
  { test: /upload|download/i, Icon: ArrowDownTrayIcon, tone: 'from-indigo-300/15 to-sky-400/5' },
  { test: /show|hide/i, Icon: EyeIcon, tone: 'from-slate-200/12 to-white/5' },
];

const getFlowVisual = (name: string) => flowVisuals.find(({ test }) => test.test(name)) || { Icon: RocketLaunchIcon, tone: 'from-aqua-300/15 to-emerald-400/5' };

const FlowItem = ({ name, onClick }: FlowItemType & { onClick: () => void }) => {
  const { Icon, tone } = getFlowVisual(name);

  return (
    <button
      onClick={onClick}
      className="group relative flex h-28 w-[156px] shrink-0 flex-col justify-between overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.045] p-3.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-200 hover:border-aqua-300/30 hover:bg-white/[0.065] hover:shadow-[0_10px_24px_rgba(0,0,0,0.20),inset_0_1px_0_rgba(255,255,255,0.08)]"
      type="button"
    >
      <div className={`absolute inset-x-0 top-0 h-16 bg-gradient-to-br ${tone} opacity-70 transition group-hover:opacity-90`} />
      <div className="relative flex items-center justify-between">
        <div className={`grid size-10 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br ${tone} text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]`}>
          <Icon className="size-5" />
        </div>
        <SparklesIcon className="size-4 text-aqua-300/50 opacity-0 transition group-hover:opacity-100" />
      </div>
      <h3 className="relative line-clamp-2 pb-0.5 text-sm font-semibold leading-snug text-white">{name}</h3>
    </button>
  );
};

type NavigatorMenuInitialContentProps = {
  data: {
    apps: AppItemType[];
    flows: FlowItemType[];
    tags: { name: string }[];
    components: { name: string }[];
  };
  handleUpdate: (pattern: string, value: string) => void;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-aqua-300/90">{children}</h2>
);

export const NavigatorMenuInitialContent = ({ data: initialData, handleUpdate }: NavigatorMenuInitialContentProps) => {
  const { setApps } = useQuery();
  if (!initialData) return null;

  const handleAppClick = (appName: string) => {
    setApps((prevApps) => {
      const isAppSelected = prevApps.some((selectedApp: AppType) => selectedApp.name === appName);
      if (!isAppSelected) {
        return [...prevApps, appName.toLowerCase()];
      }
      return prevApps;
    });
  };

  return (
    <div className="size-full space-y-5 overflow-y-auto px-4 py-4">
      <div className="space-y-3">
        <SectionTitle>Most Viewed Apps</SectionTitle>
        <div className="-mx-2 flex items-stretch gap-3 overflow-x-auto px-2 py-2 scrollbar-hide">
          {initialData.apps?.map((app: any) => (
            <AppItem
              name={app.name}
              imgSrc={app.imgSrc}
              icon={app.icon}
              key={app.name}
              onClick={() => handleAppClick(app.name)}
            />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <SectionTitle>Suggested Flows</SectionTitle>
        <div className="-mx-2 flex items-stretch gap-3 overflow-x-auto px-2 py-2 scrollbar-hide">
          {initialData.flows?.map((item) => (
            <FlowItem
              name={item.name}
              key={item.name}
              onClick={() => handleUpdate('flows', item.name)}
            />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <SectionTitle>Screens</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {initialData.tags?.map((item) => (
            <Pill
              className="cursor-pointer border-white/10 bg-white/[0.04] text-slate-100 hover:border-aqua-400/40 hover:bg-aqua-400/10"
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
      <div className="space-y-3">
        <SectionTitle>Components</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {initialData.components?.map((item) => (
            <Pill
              className="cursor-pointer border-white/10 bg-white/[0.04] text-slate-100 hover:border-aqua-400/40 hover:bg-aqua-400/10"
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

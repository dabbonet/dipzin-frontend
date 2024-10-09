'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { storage } from '@/utils/storage';
import type { FlowType } from '@/types/app-types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Shared/avatar";
import { extractInitials, mergeIconFromObject } from '@/utils/StringUtils';
import { Screen } from '@/components/Shared/screen';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { Button } from '../../button';
import { Icon } from '@/components/UI/icon';

const Flow = ({ flow }: { flow: FlowType }) => {
  const { query } = useQuery(); // Get query data from useQuery hook

  if (!flow) return null;

  const icon = mergeIconFromObject(flow.app.icon as any);

  // Determine the width class based on the platform
  const widthClass = query.platform !== 'web'
    ? 'w-[calc(100%/6)]'
    : 'w-[calc(100%/2.5)]';

  return (
    <motion.div
      className="relative size-full rounded-2xl flex items-center justify-center group pb-10"
      initial="initial"
      whileHover="hover"
      animate="initial"
      transition={{ duration: 0.3 }}
    >
      <div className="bg-slate-900 size-full overflow-x-auto rounded-2xl">
        <div className="flex justify-between w-full py-4 px-8">
          <div className="flex gap-4 items-center">
            <h3 className="text-white text-xl font-semibold whitespace-nowrap">
              {flow.name}
            </h3>
            <p className="text-slate-400 whitespace-nowrap">
              (
              {' '}
              { flow && flow?.flow_screens?.length }
              {' '}
              Screens )
            </p>
            <div className="flex items-center gap-4 bg-slate-800/60 py-2 ps-2 pe-6 rounded-full">
              <Avatar>
                <AvatarImage src={storage(icon)} alt={flow.app?.name} />
                <AvatarFallback>
                  {flow.app && extractInitials(flow.app.name)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-medium text-white">{flow.app?.name}</h3>
              <p className="text-xs text-slate-400 whitespace-nowrap">
                {flow.app?.tag_line}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="darkGray" className="bg-slate-800">
              <Icon.Download className="size-6 fill-white stroke-white" />
              Download
            </Button>
            <Button className="rounded-full p-2 bg-slate-800" variant="darkGray">
              <Icon.EllipsisHorizontal className="size-6 fill-white stroke-white" />
            </Button>

          </div>
        </div>

        <div className="flex overflow-x-auto px-8">
          {flow && flow?.flow_screens?.map((screen) => (
            <div
              key={screen.id}
              className={`shrink-0 ${widthClass} h-auto flex justify-center items-center mb-6`}
            >
              <Screen screen={screen.screen || {}} overllay={false} />
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default Flow;

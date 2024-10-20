"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Shared/avatar';
import {
  Card, CardContent, CardFooter, CardHeader
} from '@/components/UI/card';
import { extractInitials } from '@/utils/StringUtils';
import type { CollectionType } from '../types';
import { Dropdown } from '@/components/Shared/dropdown';
import { Button } from '@/components/Shared/button';
import { Icon } from '@/components/UI/icon';
import CollectionThumbnail from './collection-thumbnail';

const Collection: React.FC<{ collection: CollectionType }> = ({ collection }) => {
  const uniqueApps = Array.from(new Map(collection.screens.map((screenItem) => [screenItem.app.id, screenItem.app])).values());
  const displayedApps = uniqueApps.slice(0, 5);
  const remainingAppsCount = uniqueApps.length - 5;

  const timeSinceUpdate = () => {
    const now = new Date();
    const updatedAt = new Date(collection.updatedAt);
    const diffInSeconds = Math.floor((now.getTime() - updatedAt.getTime()) / 1000);

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  };

  return (
    <Card className="size-full bg-slate-800 border-0 p-0 flex flex-col gap-0 items-center justify-between overflow-hidden rounded-3xl">
      <CardHeader className="w-full h-fit flex items-center justify-center p-0 py-3">
        <div className="flex -space-x-2 hover:space-x-0 transition-all items-center justify-center">
          {displayedApps.map((app) => (
            <Avatar key={app.id} className="border-2 border-slate-800">
              <AvatarImage src={app.icon.imgSrc} />
              <AvatarFallback>
                {extractInitials(app.name)}
              </AvatarFallback>
            </Avatar>
          ))}
          {remainingAppsCount > 0 && (
          <Avatar>
            <AvatarFallback>
              +
              {remainingAppsCount}
            </AvatarFallback>
          </Avatar>
          )}
        </div>
      </CardHeader>
      <CardContent className="w-full h-[300px] overflow-hidden p-0">
        <motion.div
          className="size-full"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.7 }}
        >
          <CollectionThumbnail screens={collection.screens} />
        </motion.div>
      </CardContent>
      <CardFooter className="w-full bg-slate-900 flex items-center justify-between gap-2 p-4">
        <div>
          <p title={collection.name} className="font-semibold text-slate-200 whitespace-nowrap truncate max-w-[200px]">{collection.name}</p>
          <span className="text-slate-600 text-sm">
            Updated:
            {' '}
            <strong>{timeSinceUpdate()}</strong>
          </span>
        </div>
        <Dropdown
          trigger={(
            <Button size="md" className="rounded-full p-2" variant="darkGray" isIconOnly>
              <Icon.EllipsisHorizontal className="size-6 text-white" />
            </Button>
          )}
          content="content"
          placement="end"
        />
      </CardFooter>
    </Card>
  );
};

export default Collection;

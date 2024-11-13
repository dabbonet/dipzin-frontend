import { Skeleton } from '@/components/UI/skeleton';
import React from 'react';

const ListItemSkeleton: React.FC = () => (
  <div className="flex flex-col md:flex-row items-center justify-center md:justify-start w-full gap-3">
    <Skeleton className="w-10 aspect-square shrink-0 rounded-full" />
    <div className="flex flex-col items-start">
      <Skeleton className="w-20 block h-4 rounded mt-2" />
      <Skeleton className="w-32 block h-4 rounded mt-1" />
    </div>
  </div>
);

export default ListItemSkeleton;

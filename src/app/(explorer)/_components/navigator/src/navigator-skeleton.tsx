import { Skeleton } from '@/components/UI/skeleton';
import type React from 'react';

const NavigatorSkeleton: React.FC = () => (
  <div
    className="w-full h-fit bg-gradient-to-b from-slate-900/85 to-slate-900/60 rounded-[1.625rem] p-2.5 flex sm:hidden flex-col gap-4"
  >
    <Skeleton className="w-full h-[45px] rounded-full bg-slate-800" />
    <div className="w-full flex gap-4">
      <Skeleton className="w-full h-10 rounded-full bg-slate-800" />
      <Skeleton className="w-full h-10 rounded-full bg-slate-800" />
    </div>
  </div>
);

export default NavigatorSkeleton;

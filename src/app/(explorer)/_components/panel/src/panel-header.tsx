"use client"

import { Button } from '@/components/Shared/button';
import { Icon } from '@/components/UI/icon';
import { Skeleton } from '@/components/UI/skeleton';
import { capitalizeFirstLetter } from '@/utils/StringUtils';
import { useSession } from 'next-auth/react';
import React from 'react';

const PanelHeader: React.FC = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <div className="w-full h-fit flex items-center justify-between gap-3 mt-4 mb-6">
      <h1 className="text-2xl sm:text-[2.5rem] font-semibold text-slate-300 font-outfit flex items-center">
        Welcome,
        {status === 'loading' && <Skeleton className="w-32 h-8 bg-slate-800 ml-2" />}
        {status === 'authenticated' && <span className="ml-2">{capitalizeFirstLetter(user?.name ?? 'User')}</span>}
        {status !== 'loading' && status !== 'authenticated' && <span className="ml-2">Guest</span>}
      </h1>
      <div className="size-fit flex items-center gap-4">
        <Button href="/collections" variant="darkGray">
          <Icon.Collection className="text-aqua-400" />
          <p className="hidden sm:block">Collections</p>
        </Button>
        <Button href="/pricing" variant="darkGray">
          <Icon.Rocket className="text-aqua-400" />
          <p className="hidden sm:block">Upgrade</p>
        </Button>
      </div>
    </div>
  );
};

export default PanelHeader;

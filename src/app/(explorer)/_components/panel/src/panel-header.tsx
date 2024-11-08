"use client"

import { Button } from '@/components/Shared/button';
import { Icon } from '@/components/UI/icon';
import { capitalizeFirstLetter } from '@/utils/StringUtils';
import { useSession } from 'next-auth/react';
import React from 'react';

const PanelHeader: React.FC = () => {
  const session = useSession()
  const user = session?.data?.user

  return (
    <div className="w-full  h-fit flex items-center justify-between gap-3 mb-6">
      <h1 className="text-2xl sm:text-5xl font-semibold text-slate-300 font-outfit">
        Welcome,
        {' '}
        {!user ? "Guest" : capitalizeFirstLetter(user?.name ?? '...')}
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

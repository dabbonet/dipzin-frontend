"use client"

import { Logo } from '@/components/UI/logo';
import '@/styles/global.css';
import UserMenu from '@/components/Account/user-menu/src/user-menu';
import { Button } from '@/components/Shared/button';
import { usePathname } from 'next/navigation';
import { Skeleton } from "@/components/UI/skeleton";
import { Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/utils';

const Nav = () => (
  <header className="w-full h-fit p-8 flex justify-between items-center gap-8 z-10 fixed top-0">
    <a href="/" aria-label="Home">
      <Logo.Dipzin className="text-white" />
    </a>
    <UserMenu />
  </header>
);

const NavigationButtons = () => {
  const pathname = usePathname();

  return (
    <div className="h-fit w-full flex flex-wrap items-center gap-4">
      <Button
        href="/collections"
        variant="ghost"
        className={cn('text-4xl font-semibold', {
          'text-slate-200': pathname === '/collections',
          'text-slate-600': pathname !== '/collections',
        })}
      >
        My Collections
      </Button>
      <Button
        href="/collections/community"
        variant="ghost"
        className={cn('text-4xl font-semibold', {
          'text-slate-200': pathname === '/collections/community',
          'text-slate-600': pathname !== '/collections/community',
        })}
      >
        Community
      </Button>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(7)].map(() => (
      <Skeleton key={uuidv4()} className="w-[300px] h-[350px] rounded-lg" />
    ))}
  </div>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="size-full px-4 md:px-6 lg:px-14 xl:px-20 2xl:px-[100px] space-y-8 mt-24">
        <NavigationButtons />
        <Suspense fallback={<SkeletonLoader />}>
          {children}
        </Suspense>
      </main>
    </>
  );
}

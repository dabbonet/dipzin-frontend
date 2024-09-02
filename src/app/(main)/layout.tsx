'use client';

import { Logo } from '@/components/UI/logo';
import { Navigator } from '@/components/Explorer/navigator';
import '@/styles/global.css';
import { Button } from '@/components/Shared/button';
import { Icon } from '@/components/UI/icon';

const Nav = () => (
  <header className="w-full h-fit px-8 pt-7 flex items-start justify-between gap-8 z-10 absolute top-0">
    <Logo.Dipzin className="text-white" />
    <Navigator />
    <Button className="rounded-full" size="xl" href="/access">
      <Icon.Example className="size-5" />
      Login
    </Button>
  </header>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="size-full px-4 md:px-6 lg:px-14 xl:px-20 2xl:px-[100px] pt-[35vh]">
        {children}
      </main>
    </>
  );
}

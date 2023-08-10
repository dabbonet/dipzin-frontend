'use client'
import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import SparkleButton from './ui/SparkleButton';
import { useAuth } from '@/lib/auth';
import Navigator from './navigator/main';
import { useResponsive } from '@/context/useResponsive';
import OpenMenu from '@/components/navigator/main/menu';


const Navbar: FC = () => {
  const { user, loading } = useAuth();
  return (
    <header className="w-full flex justify-between fixed items-start text-white pt-8 px-5 lg:px-10 z-20 top-0 bg-gradient-to-b from-slate-950/80 to-slate-950/0">
      <Link
        href="/ios"
        shallow
        className="text-lg lg:text-2xl flex flex-col "
      >
        <Image
          className="mr-3 h-6 sm:h-9 w-auto inline"
          src="/images/assets/light-logo.svg"
          alt="Dipzin Logo"
          width={110}
          height={39}
          loader={({ src }) => src}
          unoptimized
        />
        <span className=' text-[9px] bg-gradient-to-r from-aqua-400 to-aqua-400/70 w-fit mt-1.5 leading-none text-aqua-950 px-1.5 py-1 rounded-[5px]'>BETA</span>
      </Link>

      {!loading && (
        <>
          <Navigator />
          <Menu user={user} />
        </>
      )}
    </header>
  );
};

const Menu = (user) => {
  const { isMobile } = useResponsive();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  if (!isMobile) {
    if (user.user) return <SparkleButton href='/pricing' >Unlock More!</SparkleButton>;
    return <SparkleButton href='/access' >Try it!</SparkleButton>;
  } else {
    return (
      <div className='ml-6'>
        <button onClick={handleMenuClick}>Menu</button>
        {isMenuOpen && (
          <div className='absolute top-0 left-0 w-full h-full'>
            <OpenMenu />
          </div>
        )}
      </div>
    );
  }
};

export default Navbar;
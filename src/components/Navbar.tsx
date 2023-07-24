'use client'
import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import PlatformSwitcher from '@/components/PlatformSwitcher';
import SparkleButton from './ui/SparkleButton';
import { useAuth } from '@/lib/auth';
import Navigator from './navigator/main';

const Navbar: FC = () => {
    const { user, loading } = useAuth();
    return (
        <header className="w-full flex justify-between fixed items-center text-white pt-8 px-5 lg:px-10 z-10 top-0 bg-gradient-to-b from-slate-950/80 to-slate-950/0">

            <Link
                href="/ios"
                shallow
                className="text-lg lg:text-2xl"
            >
                <Image
                    className="mr-3 h-6 sm:h-9 w-auto"
                    src="/images/assets/light-logo.svg"
                    alt="Dipzin Logo"
                    width={110}
                    height={39}
                    loader={({ src }) => src}
                    unoptimized
                />
            </Link>

            {!loading &&
                <div className='flex bg-slate-900 rounded-full'>
                    <Navigator/>
                    <PlatformSwitcher/>
                </div>
            }

            {!loading && !user &&
                <SparkleButton href='/access' >Try it!</SparkleButton>
            }
            {!loading && user &&
                <SparkleButton href='/pricing' >Unlock More!</SparkleButton>
            }
        </header>
    )
}

export default Navbar
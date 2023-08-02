'use client'
import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import SparkleButton from './ui/SparkleButton';
import { useAuth } from '@/lib/auth';
import Navigator from './navigator/main';

const Navbar: FC = () => {
    const { user, loading } = useAuth();
    return (
        <header className="w-full flex justify-between fixed items-start text-white pt-8 px-5 lg:px-10 z-10 top-0 bg-gradient-to-b from-slate-950/80 to-slate-950/0">
            <Link
                href="/ios"
                shallow
                className="text-lg lg:text-2xl"
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
                <span className=' text-[9px] bg-gradient-to-r from-aqua-400 to-aqua-400/70 w-fit h-fit text-aqua-950 px-2 py-1 rounded-[5px] -ml-2'>BETA</span>
            </Link>

            {!loading &&
                <Navigator />
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
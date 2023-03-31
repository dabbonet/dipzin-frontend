'use client'
import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import PlatformSwitcher from '@/components/PlatformSwitcher';
import SparkleButton from './ui/SparkleButton';

const Navbar: FC = () => {
    return (
        <header className="w-full flex justify-between fixed items-center text-white mt-8 px-5 lg:px-10 z-10 top-0 cursor-pointer">
            <Link
                href="/"
                shallow
                className="text-lg lg:text-2xl"
            >
                <Image
                    className="mr-3 h-6 sm:h-9 w-auto dark:block hidden"
                    src="/images/assets/light-logo.svg"
                    alt="Dipzin Logo"
                    width={110}
                    height={39}
                    loader={({ src }) => src}
                />
                <Image
                    className="mr-3 h-6 sm:h-9 block dark:hidden"
                    src="/images/assets/dark-logo.svg"
                    alt="Dipzin Logo"
                    width={110}
                    height={39}
                    loader={({ src }) => src}
                />
            </Link>

            <PlatformSwitcher />

            {/* <div className="px-4 py-2 bg-slate-800 text-slate-100 dark:bg-slate-300 dark:text-slate-900 rounded-full flex items-center justify-center md:text-sm text-xs font-medium tracking-wider">
                <Link href="/access" shallow>Try it!</Link>
            </div> */}
            <SparkleButton />
        </header>
    )
}

export default Navbar
import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import PlatformSwitcher from '@/components/PlatformSwitcher';

const Navbar: FC = () => {
    return (
        <header className="w-full flex justify-between fixed items-center text-white mt-8 px-5 lg:px-10 z-10 top-0 cursor-pointer">
            <Link
                href="/"
                shallow
                className="text-lg lg:text-2xl"
            >
                <Image
                    className="mr-3 h-6 sm:h-9"
                    src="/images/assets/light-logo.svg"
                    alt="Dipzin Logo"
                    width={110}
                    height={39}
                />
            </Link>

            <PlatformSwitcher />

            <div className="w-[65px] h-[35px] bg-slate-300 rounded-full flex items-center justify-center md:text-sm text-xs font-normal text-slate-800">
                <Link href="/access" shallow>Try it!</Link>
            </div>
        </header>
    )
}

export default Navbar
'use client'
import { FC } from 'react'
import Link from 'next/link';
import UserData from './UserData';
import { useResponsive } from '@/context/useResponsive';

const Footer: FC = () => {
    const { isMobile, isTablet, isDesktop,isRenita } = useResponsive();

    if(!isMobile&&!isTablet)
    return (

        <footer className="w-full flex justify-between fixed bottom-5 items-center text-white mt-8 px-5 lg:px-6 cursor-pointer z-0">

            <div className='font-medium mb-4 text-xs space-y-2'>
                <UserData />
            </div>
            <ul className='font-medium mb-4 text-xs space-y-2'>
                <li><Link href="/copyrights" className='text-slate-800 hover:text-aqua-500 dark:hover:text-aqua-500 dark:text-slate-400'>Copyrights</Link></li>
                <li><Link href="/terms" className='text-slate-800 hover:text-aqua-500 dark:hover:text-aqua-500 dark:text-slate-400'>Terms of Service</Link></li>
                <li><Link href="/privacy" className='text-slate-800 hover:text-aqua-500 dark:hover:text-aqua-500 dark:text-slate-400'>Privacy Policy</Link></li>
            </ul>
        </footer>
    )
}

export default Footer
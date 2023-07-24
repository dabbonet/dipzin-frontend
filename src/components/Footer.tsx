import { FC } from 'react'
import Link from 'next/link';

const Footer: FC = () => {
    return (
        <footer className="w-full flex justify-between fixed bottom-5 items-center text-white mt-8 px-5 lg:px-10 z-10 cursor-pointer -z-50">
            
            <ul className='font-medium mb-4 text-xs space-y-2'>
                <li><Link href="/" className='text-slate-800 hover:text-aqua-500 dark:hover:text-aqua-500 dark:text-slate-400'>Copyrights</Link></li>
                <li><Link href="/" className='text-slate-800 hover:text-aqua-500 dark:hover:text-aqua-500 dark:text-slate-400'>Terms of Service</Link></li>
                <li><Link href="/" className='text-slate-800 hover:text-aqua-500 dark:hover:text-aqua-500 dark:text-slate-400'>Privacy</Link></li>
            </ul>
        </footer>
    )
}

export default Footer
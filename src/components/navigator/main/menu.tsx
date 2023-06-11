import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const Menu = () => {
    return (
        <motion.div
            layout
            key="menu"
            className='overflow-x-hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0, width: 0 }}
        // transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
        >
            <div className='flex space-x-4 h-[90%] p-2 px-4 min-w-[1000px] '>
                <div className='w-[30%]'>
                    <p className='uppercase text-sm text-slate-400 mb-2'>Main Menu</p>
                    <div className='flex-col rounded-2xl bg-slate-800 p-6 space-y-2 relative'>
                        <ul className='text-slate-200 text-2xl font-semibold space-y-2'>
                            <li><Link href={'/'} className="hover:text-aqua-500">Stream</Link></li>
                            <li><Link href={'/pricing'} className="hover:text-aqua-500">Pricing</Link></li>
                            <li><Link href={'/collections'} className="hover:text-aqua-500">Collections</Link></li>
                            <li className='flex justify-between'>
                                <Link href={'/'} className="hover:text-aqua-500">Blog</Link>
                                <span className='text-sm bg-slate-500 text-slate-200 py-1 h-fit px-2 rounded-full'>SOON</span>
                            </li>
                            {/* <li><Link href={'/'} className="hover:text-aqua-500">About</Link></li> */}
                            {/* <li><Link href={'/'} className="hover:text-aqua-500">Contact us</Link></li> */}
                        </ul>
                    </div>
                </div>
                <div className='w-[70%] max-w-[1000px]'>
                    <div className='flex flex-row-reverse mb-2'>
                        <SocialActions />
                    </div>
                    <div className='overflow-hidden relative rounded-2xl'>

                        <div className='w-4 h-full  absolute left-0 bg-gradient-to-l from-slate-900/0 to-slate-900/90'></div>
                        <div className='w-12 h-full absolute right-0 bg-gradient-to-r from-slate-900/0 to-slate-900/90'></div>

                        <div className='flex space-x-2 touch-pan-x overflow-x-scroll w-[100%] h-full scrollbar-hide'>
                            <div className='flex-shrink-0 w-[300px] bg-slate-800 rounded-2xl p-4'>

                                <img src="/images/assets/soon.png" className='w-full h-auto mb-2' alt="coming soon" />
                                <h3 className='text-slate-200 font-semibold'>Figma Plugin</h3>
                                <p className='text-slate-400 text-xs'>Work from your browser with our lightweight extension.</p>
                            </div>
                            <div className='flex-shrink-0 w-[300px] bg-slate-800 rounded-2xl p-4'>
                                <img src="/images/assets/soon.png" className='w-full h-auto mb-2' alt="coming soon" />
                                <h3 className='text-slate-200 font-semibold'>Figma Plugin</h3>
                                <p className='text-slate-400 text-xs'>Work from your browser with our lightweight extension.</p>
                            </div>
                            <div className='flex-shrink-0 w-[300px] bg-slate-800 rounded-2xl p-4'>
                                <img src="/images/assets/soon.png" className='w-full h-auto mb-2' alt="coming soon" />
                                <h3 className='text-slate-200 font-semibold'>Figma Plugin</h3>
                                <p className='text-slate-400 text-xs'>Work from your browser with our lightweight extension.</p>
                            </div>
                            <div className='flex-shrink-0 w-[300px] bg-slate-800 rounded-2xl p-4'>
                                <img src="/images/assets/soon.png" className='w-full h-auto mb-2' alt="coming soon" />
                                <h3 className='text-slate-200 font-semibold'>Figma Plugin</h3>
                                <p className='text-slate-400 text-xs'>Work from your browser with our lightweight extension.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Menu



const SocialActions = () => {
    return (
        <ul className='inline-flex ml-2 my-1 space-x-2'>
            <li>
                <Link href={''} className='text-slate-400 hover:text-slate-200'>
                    <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            d="M14.6654 10.794C14.6654 13.2207 13.2187 14.6673 10.792 14.6673H9.9987C9.63203 14.6673 9.33203 14.3673 9.33203 14.0007V10.154C9.33203 9.97399 9.47869 9.82066 9.65869 9.82066L10.832 9.80066C10.9254 9.79399 11.0054 9.72733 11.0254 9.63399L11.2587 8.36066C11.2787 8.24066 11.1854 8.12732 11.0587 8.12732L9.63869 8.14732C9.45203 8.14732 9.30537 8.00066 9.29871 7.82066L9.27203 6.18732C9.27203 6.08065 9.35869 5.98733 9.47203 5.98733L11.072 5.96065C11.1854 5.96065 11.272 5.87399 11.272 5.76066L11.2454 4.16064C11.2454 4.04731 11.1587 3.96065 11.0454 3.96065L9.24536 3.98733C8.13869 4.00733 7.25871 4.91398 7.27871 6.02065L7.31203 7.85398C7.3187 8.04065 7.17204 8.18732 6.98537 8.19399L6.18536 8.20732C6.07203 8.20732 5.98537 8.29397 5.98537 8.40731L6.00537 9.67399C6.00537 9.78732 6.09203 9.87398 6.20536 9.87398L7.00537 9.86066C7.19204 9.86066 7.33869 10.0073 7.34536 10.1873L7.40535 13.9873C7.41202 14.3607 7.11202 14.6673 6.73869 14.6673H5.20536C2.7787 14.6673 1.33203 13.2206 1.33203 10.7873V5.20732C1.33203 2.78065 2.7787 1.33398 5.20536 1.33398H10.792C13.2187 1.33398 14.6654 2.78065 14.6654 5.20732V10.794V10.794Z"
                            fill="currentColor"
                        />
                    </svg>
                </Link>
            </li>
            <li>
                <Link href={''} className='text-slate-400 hover:text-slate-200'>
                    <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            d="M10.792 1.33398H5.20536C2.7787 1.33398 1.33203 2.78065 1.33203 5.20732V10.7873C1.33203 13.2207 2.7787 14.6673 5.20536 14.6673H10.7854C13.212 14.6673 14.6587 13.2207 14.6587 10.794V5.20732C14.6654 2.78065 13.2187 1.33398 10.792 1.33398ZM7.9987 10.5873C6.57203 10.5873 5.41203 9.42732 5.41203 8.00065C5.41203 6.57398 6.57203 5.41398 7.9987 5.41398C9.42536 5.41398 10.5854 6.57398 10.5854 8.00065C10.5854 9.42732 9.42536 10.5873 7.9987 10.5873ZM11.9454 4.58732C11.912 4.66732 11.8654 4.74065 11.8054 4.80732C11.7387 4.86732 11.6654 4.91398 11.5854 4.94732C11.5054 4.98065 11.4187 5.00065 11.332 5.00065C11.152 5.00065 10.9854 4.93398 10.8587 4.80732C10.7987 4.74065 10.752 4.66732 10.7187 4.58732C10.6854 4.50732 10.6654 4.42065 10.6654 4.33398C10.6654 4.24732 10.6854 4.16065 10.7187 4.08065C10.752 3.99398 10.7987 3.92732 10.8587 3.86065C11.012 3.70732 11.2454 3.63398 11.4587 3.68065C11.5054 3.68732 11.5454 3.70065 11.5854 3.72065C11.6254 3.73398 11.6654 3.75398 11.7054 3.78065C11.7387 3.80065 11.772 3.83398 11.8054 3.86065C11.8654 3.92732 11.912 3.99398 11.9454 4.08065C11.9787 4.16065 11.9987 4.24732 11.9987 4.33398C11.9987 4.42065 11.9787 4.50732 11.9454 4.58732Z"
                            fill="currentColor"
                        />
                    </svg>
                </Link>
            </li>
            <li>
                <Link href={''} className='text-slate-400 hover:text-slate-200'>
                    <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            d="M13.0874 5.33169C13.096 5.44835 13.096 5.56435 13.096 5.68035C13.096 9.23035 10.394 13.321 5.45603 13.321C3.9347 13.321 2.52136 12.8804 1.33203 12.115C1.54803 12.1397 1.75603 12.1484 1.9807 12.1484C3.18936 12.1513 4.3638 11.7471 5.3147 11.001C4.75431 10.9909 4.21108 10.806 3.76086 10.4722C3.31063 10.1384 2.97589 9.67229 2.80336 9.13902C2.96936 9.16369 3.13603 9.18036 3.3107 9.18036C3.55136 9.18036 3.79336 9.14702 4.01803 9.08902C3.40987 8.96623 2.86301 8.63659 2.47044 8.15614C2.07787 7.6757 1.86383 7.07412 1.8647 6.45369V6.42035C2.2227 6.61969 2.63803 6.74435 3.07803 6.76102C2.70942 6.51608 2.40718 6.1837 2.19826 5.79355C1.98934 5.40339 1.88024 4.96759 1.8807 4.52502C1.8807 4.02635 2.01336 3.56902 2.24603 3.17035C2.92079 4.00037 3.76237 4.6794 4.71626 5.16346C5.67014 5.64752 6.71507 5.92583 7.78336 5.98035C7.74203 5.78035 7.7167 5.57302 7.7167 5.36502C7.71652 5.01233 7.78586 4.66306 7.92075 4.33718C8.05564 4.0113 8.25343 3.7152 8.50282 3.46581C8.75221 3.21642 9.04831 3.01863 9.37419 2.88374C9.70007 2.74885 10.0493 2.67951 10.402 2.67969C11.1754 2.67969 11.8734 3.00369 12.364 3.52769C12.9652 3.41143 13.5417 3.19197 14.068 2.87902C13.8676 3.49957 13.4479 4.02576 12.8874 4.35902C13.4206 4.29821 13.9417 4.15799 14.4334 3.94302C14.0661 4.47842 13.611 4.94792 13.0874 5.33169V5.33169Z"
                            fill="currentColor"
                        />
                    </svg>
                </Link>
            </li>
            <li>
                <Link href={''} className='text-slate-400 hover:text-slate-200'>
                    <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            d="M13.8803 1H2.19625C1.55781 1 1 1.45937 1 2.09031V13.8003C1 14.4347 1.55781 15 2.19625 15H13.8769C14.5187 15 15 14.4309 15 13.8003V2.09031C15.0037 1.45937 14.5188 1 13.8803 1ZM5.33969 12.6697H3.33406V6.43375H5.33969V12.6697ZM4.40625 5.48562H4.39187C3.75 5.48562 3.33437 5.00781 3.33437 4.40969C3.33437 3.80063 3.76094 3.33406 4.41719 3.33406C5.07344 3.33406 5.475 3.79719 5.48938 4.40969C5.48906 5.00781 5.07344 5.48562 4.40625 5.48562ZM12.6697 12.6697H10.6641V9.26C10.6641 8.44313 10.3722 7.885 9.64656 7.885C9.09219 7.885 8.76406 8.26 8.61812 8.62531C8.56344 8.75656 8.54875 8.93531 8.54875 9.11781V12.6697H6.54313V6.43375H8.54875V7.30156C8.84062 6.88594 9.29656 6.28781 10.3575 6.28781C11.6741 6.28781 12.67 7.15563 12.67 9.02656L12.6697 12.6697Z"
                            fill="currentColor"
                        />
                    </svg>
                </Link>
            </li>

        </ul>
    )
}

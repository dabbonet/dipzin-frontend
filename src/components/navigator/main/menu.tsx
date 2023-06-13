import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const Menu = () => {
    return (
        <motion.div
            layout
            key="menu"
            className='overflow-x-hidden bg-[#050814]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0, width: 0 }}
        // transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
        >
            <div className='flex space-x-4 h-[90%] p-2 px-4 min-w-[1000px] flex-col'>
                <div className=' flex gap-x-2 mb-6 ml-4'>
                    <p className=' text-slate-300 text-[10px]'>Privacy</p>
                    <p className=' text-slate-300 text-[10px]'>Terms of Service</p>
                    <p className=' text-slate-300 text-[10px]'>Copyrights</p>
                </div>
                <div className=' flex gap-x-4'>
                    <div className=' flex gap-x-8'>
                        <div className=' flex flex-col gap-y-2'>
                            <p className=' text-slate-400'>Resources</p>
                            <div className=' flex gap-x-2'>
                                <img className=" w-4" src="/images/assets/refresh.svg" alt="refresh" />
                                <div>
                                    <Link  href='/' className='text-base hover:text-aqua-500'>Stream</Link>
                                    <p className=' text-slate-400 text-[10px]'>The main gate to discover dipzin platform.</p>
                                </div>
                            </div>
                            <div className=' flex gap-x-2'>
                                <img className=" w-4" src="/images/assets/folder-2.svg" alt="refresh" />
                                <div>
                                    <Link  href='/collections' className='  text-base hover:text-aqua-500'>Community Collections</Link>
                                    <p className=' text-slate-400 text-[10px]'>The main gate to discover dipzin platform.</p>
                                </div>
                            </div>
                            <div className=' flex gap-x-2'>
                                <img className=" w-4" src="/images/assets/folder-2.svg" alt="refresh" />
                                <div>
                                    <Link  href='/tools' className='  text-base hover:text-aqua-500'>Tools</Link>
                                    <p className=' text-slate-400 text-[10px]'>The main gate to discover dipzin platform.</p>
                                </div>
                            </div>
                        </div>
                        <div className=' flex flex-col gap-y-2'>
                            <p className=' text-slate-400'>Company</p>
                            <div className=' flex gap-x-2'>
                                <img className=" w-4" src="/images/assets/refresh.svg" alt="refresh" />
                                <div>
                                    <Link  href='/blog' className=' text-base hover:text-aqua-500'>Blog</Link>
                                    <p className=' text-slate-400 text-[10px]'>The main gate to discover dipzin platform.</p>
                                </div>
                            </div>
                            <div className=' flex gap-x-2'>
                                <img className=" w-4" src="/images/assets/folder-2.svg" alt="refresh" />
                                <div>
                                    <Link  href='/about' className='  text-base hover:text-aqua-500'>About</Link>
                                    <p className=' text-slate-400 text-[10px]'>The main gate to discover dipzin platform.</p>
                                </div>
                            </div>
                            <div className=' flex gap-x-2'>
                                <img className=" w-4" src="/images/assets/folder-2.svg" alt="refresh" />
                                <div>
                                    <Link href='/contact-us'  className=' text-base hover:text-aqua-500'>Contact Us</Link>
                                    <p className=' text-slate-400 text-[10px]'>The main gate to discover dipzin platform.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' flex flex-col gap-3'>
                        <p className=' text-slate-400'>Feature Release</p>
                        <div className=' overflow-hidden'>
                            <img src="/images/assets/video.svg" className=' w-[266px] h-[148px] -ml-11' alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Menu




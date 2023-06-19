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
                <div className=' flex gap-x-2 mb-3 ml-4 text-xs'>
                    <p className=' text-slate-300 '>Privacy</p>
                    <p className=' text-slate-300 '>Terms of Service</p>
                    <p className=' text-slate-300 '>Copyrights</p>
                </div>
                <div className=' flex gap-x-4 mb-2'>
                    <div className=' flex gap-x-8'>
                        <div className=' flex flex-col gap-y-2'>
                            <p className=' text-slate-400'>Resources</p>

                            <Resources />
                            <Resources />
                            <Resources />

                        </div>
                        <div className=' flex flex-col gap-y-2'>
                            <p className=' text-slate-400'>Company</p>
                            <Resources />
                            <Resources />
                            <Resources />
                        </div>
                    </div>
                    {/* <div className=' flex flex-col gap-3'>
                        <p className=' text-slate-400'>Feature Release</p>
                        <div className=' overflow-hidden'>
                            <img src="/images/assets/video.svg" className=' w-[266px] h-[148px] -ml-11' alt="" />
                        </div>
                    </div> */}
                </div>
            </div>
        </motion.div>
    )
}

export default Menu


const Resources = () => {

    return (
        <div className=' flex items-start gap-x-2'>
            <img className="mt-2 w-4 text-white" src="/images/assets/refresh.svg" alt="refresh" />
            <div>
                <Link href='/' className='text-base hover:text-aqua-500'>Stream</Link>
                <p className=' text-slate-400 text-[10px]'>The main gate to discover dipzin <br /> platform.</p>
            </div>
        </div>
    )
}




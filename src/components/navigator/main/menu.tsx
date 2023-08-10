import PlatformSwitcher from '@/components/PlatformSwitcher'
import { useResponsive } from '@/context/useResponsive'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import ReactPlayer from 'react-player'

const Menu = () => {
    const [openVideo, setOpenVideo] = useState(false)
  const { isMobile } = useResponsive();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  if(isMobile) {
    return (
        <motion.div
            layout
            key="menu"
            className='overflow-x-hidden bg-[#050814] rounded-2xl p-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0, width: 0 }}
        // transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
        > 
             <div className='mb-4'>
            <PlatformSwitcher/>
            </div>
            <div className='flex h-[90%] p-2 px-4 max-w-[800px] flex-col'>
                <div className=' flex gap-x-2 mb-3 text-xs'>
                    <Link href='/privacy' className=' text-slate-300  hover:text-aqua-500'>Privacy</Link>
                    <Link href='/terms' className=' text-slate-300  hover:text-aqua-500'>Terms of Service</Link>
                    <Link href='/copyrights' className=' text-slate-300  hover:text-aqua-500'>Copyrights</Link>
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
                    <div className=' flex flex-col gap-3'>
                        <p className=' text-slate-400'>Feature Release</p>
                        <button className=' overflow-hidden' onClick={()=> setOpenVideo(true)}>
                            <img src="/images/assets/video.svg" className=' w-[266px] h-[148px] -ml-11' alt="" />
                        </button>
                    </div>
                </div>
                <p className=' text-slate-500 text-xs'>Coming Soon</p>
                <div className='overflow-hidden relative rounded-2xl w-full mt-2'>
                    <div className='w-4 h-full  absolute left-0 bg-gradient-to-l from-slate-900/0 to-slate-900/90'></div>
                    <div className='w-12 h-full absolute right-0 bg-gradient-to-r from-slate-900/0 to-slate-900/90'></div>
                    <div className='flex space-x-2 touch-pan-x overflow-x-scroll w-[100%] h-full scrollbar-none'>
                        <InitialSearchCard/>
                        <InitialSearchCard/>
                        <InitialSearchCard/>
                        <InitialSearchCard/>
                        <InitialSearchCard/>
                        <InitialSearchCard/>
                        
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {openVideo && (
                <>
                    <motion.div
                    className=" fixed top-0 left-0 w-full h-full backdrop-blur-md bg-slate-900/70 z-50 flex items-center justify-center gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    >
                    <ReactPlayer url={`https://www.youtube.com/watch?v=NkjXFMTln5Q`}
                    className='z-[400] w-3/4 h-3/4'
                    controls
                    />
                    
                    <motion.div
                        onClick={() => setOpenVideo(false)}
                        className={
                        "w-[100%] h-[100%] fixed top-0 left-0 bg-transparent"
                        }
                    ></motion.div>
                    </motion.div>
                </>
                )}
            </AnimatePresence>
        </motion.div>
    )
  }

    return (
        <motion.div
            layout
            key="menu"
            className='overflow-x-hidden bg-[#050814] absolute rounded-2xl p-8 bottom-0 left-32'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0, width: 0 }}
        // transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
        >
            <div className='flex h-[90%] p-2 px-4 max-w-[800px] flex-col'>
                <div className=' flex gap-x-2 mb-3 text-xs'>
                    <Link href='/privacy' className=' text-slate-300  hover:text-aqua-500'>Privacy</Link>
                    <Link href='/terms' className=' text-slate-300  hover:text-aqua-500'>Terms of Service</Link>
                    <Link href='/copyrights' className=' text-slate-300  hover:text-aqua-500'>Copyrights</Link>
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
                    <div className=' flex flex-col gap-3'>
                        <p className=' text-slate-400'>Feature Release</p>
                        <button className=' overflow-hidden' onClick={()=> setOpenVideo(true)}>
                            <img src="/images/assets/video.svg" className=' w-[266px] h-[148px] -ml-11' alt="" />
                        </button>
                    </div>
                </div>
                <p className=' text-slate-500 text-xs'>Coming Soon</p>
                <div className='overflow-hidden relative rounded-2xl w-full mt-2'>
                    <div className='w-4 h-full  absolute left-0 bg-gradient-to-l from-slate-900/0 to-slate-900/90'></div>
                    <div className='w-12 h-full absolute right-0 bg-gradient-to-r from-slate-900/0 to-slate-900/90'></div>
                    <div className='flex space-x-2 touch-pan-x overflow-x-scroll w-[100%] h-full scrollbar-none'>
                        <InitialSearchCard/>
                        <InitialSearchCard/>
                        <InitialSearchCard/>
                        <InitialSearchCard/>
                        <InitialSearchCard/>
                        <InitialSearchCard/>
                        
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {openVideo && (
                <>
                    <motion.div
                    className=" fixed top-0 left-0 w-full h-full backdrop-blur-md bg-slate-900/70 z-50 flex items-center justify-center gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    >
                    <ReactPlayer url={`https://www.youtube.com/watch?v=NkjXFMTln5Q`}
                    className='z-[400] w-3/4 h-3/4'
                    controls
                    />
                    
                    <motion.div
                        onClick={() => setOpenVideo(false)}
                        className={
                        "w-[100%] h-[100%] fixed top-0 left-0 bg-transparent"
                        }
                    ></motion.div>
                    </motion.div>
                </>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Menu

const InitialSearchCard = ()=> {
    return <div className='flex-shrink-0 w-[300px] bg-slate-900 hover:bg-slate-800 rounded-2xl p-4 gap-1'>
    <h3 className='text-slate-200 font-semibold'>Figma Plugin</h3>
    <p className='text-slate-400 text-xs'>Work from your browser with our lightweight extension.</p>
    <span className=' bg-lime-100 rounded-md  px-1 text-lime-900'>In Progress</span>
</div>
}

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




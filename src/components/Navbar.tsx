'use client'
import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import SparkleButton from './ui/SparkleButton';
import { useAuth } from '@/lib/auth';
import Navigator from './navigator/main';
import { useResponsive } from '@/context/useResponsive';
import PlatformSwitcher from '@/components/PlatformSwitcher'
import { AnimatePresence, motion } from 'framer-motion'
import ReactPlayer from 'react-player'

const Navbar: FC = () => {
  const { user, loading } = useAuth();
  return (
    <header className="w-full flex justify-between fixed items-start text-white pt-8 px-5 lg:px-10 z-20 top-0 bg-gradient-to-b from-slate-950/80 to-slate-950/0">
      <Link
        href="/ios"
        shallow
        className="text-lg lg:text-2xl flex flex-col "
      >
        <Image
          className="mr-3 h-6 sm:h-9 w-auto inline"
          src="/images/assets/light-logo.svg"
          alt="Dipzin Logo"
          title='Logo'
          width={110}
          height={39}
          loader={({ src }) => src}
          unoptimized
        />
        <span className=' text-[9px] bg-gradient-to-r from-aqua-400 to-aqua-400/70 w-fit mt-1.5 leading-none text-aqua-950 px-1.5 py-1 rounded-[5px]'>BETA</span>
      </Link>

      {!loading && (
        <>
          <Navigator />
          <Menu user={user} />
        </>
      )}
    </header>
  );
};

const Menu = (user) => {
  const [openVideo, setOpenVideo] = useState(false);
  const { isMobile, isTablet } = useResponsive();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 const handleMenuClick = (e) => {
  e.preventDefault();
    setIsMenuOpen(true);
  };
  const handleCloseClick = (e) => {
      e.preventDefault();
    setIsMenuOpen(false);
  }

  if (!isMobile && !isTablet) {
    if (user.user) return <SparkleButton href='/pricing' >Unlock More!</SparkleButton>;
    return <SparkleButton href='/access' >Try it!</SparkleButton>;
  } if(!isMenuOpen) {
    return (
      <div className='ml-6'>
        <button onClick={handleMenuClick}><img src='/images/assets/menu.svg' alt="menu" title="menu"/></button>
          </div>
    );
  }else{
    return (
          <motion.div
          layout
          key="menu"
          className=" overflow-x-hidden bg-[#050814] rounded-2xl p-8 fixed top-0 right-0 left-0 w-full h-full items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, height: 0, width: 0 }}
          >
    
            <div  className='flex h-[90%] p-2 px-4 max-w-[800px] flex-col mt-10'>

                   <div onClick={handleCloseClick} className='absolute top-0 left-0 mt-8 ml-8'>
                       <button>
                          <img src='/images/assets/arrow_back.svg' alt='Close Menu'/>
                       </button>
                    </div>
        
       <div  className="absolute top-0 right-0 mr-8 mt-8  p-1">
            <SparkleButton  href={user.user ? '/pricing' : '/access'}>
                {user.user ? 'Unlock More!' : 'Try it!'}
            </SparkleButton>
        </div>
                <div  className=' flex gap-x-4 mb-2'>
                    <div className=' flex gap-x-8'>
                        <div className=' flex flex-col gap-y-2'>
                            <p className=' text-slate-400'>Resources</p>
                            <Resources />
                            <Resources />
                            <Resources />

                        </div>
                        <div  className=' flex flex-col gap-y-2'>
                            <p className=' text-slate-400'>Company</p>
                            <Resources />
                            <Resources />
                            <Resources />
                        </div>
                    </div>
                    <div  className=' flex flex-col gap-3'>
                        <p className=' text-slate-400'>Feature Release</p>
                        <button className=' overflow-hidden' onClick={()=> setOpenVideo(true)}>
                            <img src="/images/assets/video.svg" className=' w-[266px] h-[148px] -ml-0' alt="" />
                        </button>
                    </div>
                </div>
                <p className=' text-slate-500 text-xs'>Coming Soon</p>
                <div  className='overflow-hidden relative rounded-2xl w-full mt-2'>
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
                 <hr className='mt-6'/>
              <div   className=' flex gap-x-2 mt-3 text-xs justify-center'>
                    <Link href='/privacy'  className=' text-slate-300  hover:text-aqua-500'>Privacy</Link>
                    <Link href='/terms' className=' text-slate-300  hover:text-aqua-500'>Terms of Service</Link>
                    <Link href='/copyrights' className=' text-slate-300  hover:text-aqua-500'>Copyrights</Link>
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
  }

export default Navbar;

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
            <img className="mt-2 w-4 text-white" src="/images/assets/refresh.svg" alt="refresh" title="refresh" />
            <div>
                <Link href='/' className='text-base hover:text-aqua-500'>Stream</Link>
                <p className=' text-slate-400 text-[10px]'>The main gate to discover dipzin <br /> platform.</p>
            </div>
        </div>
    )
    }
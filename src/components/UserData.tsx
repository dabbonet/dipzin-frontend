'use client'
import { useAuth } from '@/lib/auth'
import { AnimatePresence , motion} from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Menu from './navigator/main/menu'
import Icons from './Icons'

const UserData = () => {
    const {user} = useAuth()
    const [show, setShow] = useState(false)
    function useOutsideAlerter(ref: any) {
      useEffect(() => {
          function handleClickOutside(event: any) {
              if (ref.current && !ref.current.contains(event.target)) {
                  setShow(false)
              }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              // Unbind the event listener on clean up
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [ref]);
  }
  useEffect(() => {
    return () => {
      setShow(false)
    }
  }, [])
  
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    user && <div className=' flex flex-col relative gap-y-1' ref={wrapperRef}>
        <AnimatePresence mode='wait'>
          {show && <Menu/>}
        </AnimatePresence>
        <h3>Ahmed Mahmoud</h3>
        <p className=' text-slate-400 text-xs'>@ahmed</p>
        <motion.div
          className="flex items-center bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-3xl w-fit py-3 px-6"
          onClick={() => {
              setShow(!show)
          }}>
          <Icons.Grip className='w-4 h-4 text-slate-400' />
          <span className="font-medium text-sm">Menu</span>
        </motion.div>
    </div>
  )
}

export default UserData
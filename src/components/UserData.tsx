'use client'
import { SignOut, useAuth } from '@/lib/auth'
import { AnimatePresence , motion} from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Menu from './navigator/main/menu'
import Icons from './Icons'
import { Button, Popover, PopoverContent, PopoverTrigger, User } from '@nextui-org/react'
import Link from 'next/link'

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
      <Popover placement="top">
        <PopoverTrigger>
        <User   
          name="ahmed mohamed"
          description="@ahmed"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
        </PopoverTrigger>
        <PopoverContent className=' flex flex-col gap-3 bg-slate-900 p-4'>
          <Link href='/account' className=' flex gap-1 w-full bg-transparent hover:bg-slate-700 px-3 py-2 rounded-lg text-slate-50 items-center'>
            <Icons.Account/>
            <span>Account Settings</span>
          </Link>
          <button className=' flex gap-1 w-full bg-transparent hover:bg-slate-700 px-3 py-2 rounded-lg text-slate-50 items-center' onClick={SignOut}>
            <Icons.LogOut/>
            <span>Logout</span>
          </button>
        </PopoverContent>
      </Popover>
        
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
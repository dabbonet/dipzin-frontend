'use client'
import AppActions from '@/app/(static)/app/[platform]/[slug]/AppActions'
import React, { useState } from 'react'
const page = () => {
  const [isScreens, setIsScreens] = useState(true)
  let buttonStyle1
  let buttonStyle2
  if (isScreens) {
    buttonStyle1 = 'bg-slate-700'
    buttonStyle2 = ''
  } else {
    buttonStyle1 = ''
    buttonStyle2 = 'bg-slate-700'
  }
  return (
    <>
      <AppActions isFromCollection/>
      <div className=' mt-20'>
        {/* header */}
        <div className=' flex justify-between items-center'>
          <div className=' flex gap-3'>
            <div className=' rounded-[50%] p-4 bg-slate-400'></div>
            <div>
              <h1 className=' text-slate-100 font-medium text-xl m-0 p-0'>Collection Name</h1>
              <span className=' text-slate-400 font-normal text-base'>Modified: 1m ago</span>
            </div>
          </div>
          <div className=" w-fit bg-slate-800 flex p-2 items-center rounded-3xl mb-4">
            <button className={` py-1 px-3 hover:bg-slate-700 ${buttonStyle1} rounded-3xl`} onClick={() => setIsScreens(true)}>Screens</button>
            <button className={` py-1 px-3 ${buttonStyle2}  rounded-3xl hover:bg-slate-700`} onClick={() => setIsScreens(false)}>Applications</button>
          </div>
        </div>
        {/* main content */}
    </div>
    
    </>
  )
}

export default page
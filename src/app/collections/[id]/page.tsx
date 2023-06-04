'use client'
import React from 'react'
const page = () => {
  return (
    <>
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
        </div>
        {/* main content */}
      </div>

    </>
  )
}

export default page
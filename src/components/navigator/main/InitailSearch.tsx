import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const InitialSearch = () => {
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
            <div className='flex space-x-4 h-[90%] p-2 px-4 w-[1000px] flex-col'>
                <p className=' text-slate-500 text-xs'>Featured Apps</p>
                <div className=' grid grid-cols-2 gap-3 mt-3 mb-6'>
                    <div className=' flex gap-x-3 items-center'>
                        <img src="/images/assets/image-40.svg" alt="" />
                        <h3 className=' font-medium text-sm'>Wise</h3>
                        <span className=' text-slate-700'>Finance</span>
                    </div>
                    <div className=' flex gap-x-3 items-center'>
                        <img src="/images/assets/image-40.svg" alt="" />
                        <h3 className=' font-medium text-sm'>TimeTree</h3>
                        <span className=' text-slate-700'>Productivity</span>
                    </div>
                    <div className=' flex gap-x-3 items-center'>
                        <img src="/images/assets/image-40.svg" alt="" />
                        <h3 className=' font-medium text-sm'>Dunkin'</h3>
                        <span className=' text-slate-700'>Food & Drink</span>
                    </div>
                    <div className=' flex gap-x-3 items-center'>
                        <img src="/images/assets/image-40.svg" alt="" />
                        <h3 className=' font-medium text-sm'>DoorDash</h3>
                        <span className=' text-slate-700'>Category</span>
                    </div>
                    <div className=' flex gap-x-3 items-center'>
                        <img src="/images/assets/image-40.svg" alt="" />
                        <h3 className=' font-medium text-sm'>Airbnb</h3>
                        <span className=' text-slate-700'>Travel & Transportation</span>
                    </div>
                    <div className=' flex gap-x-3 items-center'>
                        <img src="/images/assets/image-40.svg" alt="" />
                        <h3 className=' font-medium text-sm'>Quibi</h3>
                        <span className=' text-slate-700'>Entertainment</span>
                    </div>
                </div>
                <p className=' text-slate-500 text-xs'>Featured Tags</p>
                <div className=' flex gap-2 mt-2 mb-6'>
                    <div className=' py-2 px-3 bg-slate-800 rounded-lg w-fit'>
                        <span className=' text-slate-200 mx-auto'>Dashboard & Stats</span>
                    </div>
                    <div className=' py-2 px-3 bg-slate-800 rounded-lg w-fit'>
                        <span className=' text-slate-200 mx-auto'>Discover & Explore</span>
                    </div>
                    <div className=' py-2 px-3 bg-slate-800 rounded-lg w-fit'>
                        <span className=' text-slate-200 mx-auto'>Empty State</span>
                    </div>
                    <div className=' py-2 px-3 bg-slate-800 rounded-lg w-fit'>
                        <span className=' text-slate-200 mx-auto'>Help & Support</span>
                    </div>
                    <div className=' py-2 px-3 bg-slate-800 rounded-lg w-fit'>
                        <span className=' text-slate-200 mx-auto'>Goal & Task</span>
                    </div>
                </div>
                <p className=' text-slate-500 text-xs'>Coming Soon</p>
                <div className='overflow-hidden relative rounded-2xl w-full mt-2'>
                    <div className='w-4 h-full  absolute left-0 bg-gradient-to-l from-slate-900/0 to-slate-900/90'></div>
                    <div className='w-12 h-full absolute right-0 bg-gradient-to-r from-slate-900/0 to-slate-900/90'></div>

                    <div className='flex space-x-2 touch-pan-x overflow-x-scroll w-[100%] h-full scrollbar-none'>
                        <div className='flex-shrink-0 w-[300px] bg-slate-900 hover:bg-slate-800 rounded-2xl p-4 gap-1'>
                            <h3 className='text-slate-200 font-semibold'>Figma Plugin</h3>
                            <p className='text-slate-400 text-xs'>Work from your browser with our lightweight extension.</p>
                            <span className=' bg-lime-100 rounded-md  px-1 text-lime-900'>In Progress</span>
                        </div>
                        <div className='flex-shrink-0 w-[300px] bg-slate-900 hover:bg-slate-800 rounded-2xl p-4 gap-1'>
                            <h3 className='text-slate-200 font-semibold'>Figma Plugin</h3>
                            <p className='text-slate-400 text-xs'>Work from your browser with our lightweight extension.</p>
                            <span className=' bg-lime-100 rounded-md  px-1 text-lime-900'>In Progress</span>
                        </div>
                        <div className='flex-shrink-0 w-[300px] bg-slate-900 hover:bg-slate-800 rounded-2xl p-4 gap-1'>
                            <h3 className='text-slate-200 font-semibold'>Figma Plugin</h3>
                            <p className='text-slate-400 text-xs'>Work from your browser with our lightweight extension.</p>
                            <span className=' bg-lime-100 rounded-md  px-1 text-lime-900'>In Progress</span>
                        </div>
                        <div className='flex-shrink-0 w-[300px] bg-slate-900 hover:bg-slate-800 rounded-2xl p-4 gap-1'>
                            <h3 className='text-slate-200 font-semibold'>Figma Plugin</h3>
                            <p className='text-slate-400 text-xs'>Work from your browser with our lightweight extension.</p>
                            <span className=' bg-lime-100 rounded-md  px-1 text-lime-900'>In Progress</span>
                        </div>
                        <div className='flex-shrink-0 w-[300px] bg-slate-900 hover:bg-slate-800 rounded-2xl p-4 gap-1'>
                            <h3 className='text-slate-200 font-semibold'>Figma Plugin</h3>
                            <p className='text-slate-400 text-xs'>Work from your browser with our lightweight extension.</p>
                            <span className=' bg-lime-100 rounded-md  px-1 text-lime-900'>In Progress</span>
                        </div>
                        <div className='flex-shrink-0 w-[300px] bg-slate-900 hover:bg-slate-800 rounded-2xl p-4 gap-1'>
                            <h3 className='text-slate-200 font-semibold'>Figma Plugin</h3>
                            <p className='text-slate-400 text-xs'>Work from your browser with our lightweight extension.</p>
                            <span className=' bg-lime-100 rounded-md  px-1 text-lime-900'>In Progress</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default InitialSearch




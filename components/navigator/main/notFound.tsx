import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import BlurImage from "../../screen/Image"

const NotFound = () => {
  return (
    <motion.div 
        className="absolute left-6 right-6 top-4 h-[85%]"
        initial={{ opacity: 0, y:100 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
        >
        <p className='uppercase text-sm text-slate-400'>Search Results</p>
        <div className='flex space-x-4 mt-2 h-[90%] '>

            <div className='w-[30%] flex-col rounded-2xl bg-slate-800 py-2 px-2 space-y-2 relative'>
              <div className="absolute top-0 left-0 rounded-2xl z-1 bg-gradient-to-b from-slate-900/10 to-slate-900/90 w-full h-full"></div>
                <div className='flex items-center p-2 bg-slate-700 rounded-xl space-x-3 h-[64px]'></div>
                <div className='flex items-center p-2 bg-slate-700 rounded-xl space-x-3 h-[64px]'></div>
                <div className='flex items-center p-2 bg-slate-700 rounded-xl space-x-3 h-[64px]'></div>
                <div className='flex items-center p-2 bg-slate-700 rounded-xl space-x-3 h-[64px]'></div>
                <div className='flex items-center p-2 bg-slate-700 rounded-xl space-x-3 h-[64px]'></div>
            </div>

            <div className='w-[70%] p-2 rounded-2xl bg-slate-800'>

                {/* Header Area */}
                <div className='w-full flex justify-between'>
                    <div className='flex-col p-8 rounded-xl space-x-3 w-full' >
                     <h1 className="text-slate-200 text-3xl font-semibold">Sorry, we couldn't find it.</h1>
                     {/* <p className="text-orange-500 text-sm font-semibold !ml-0">Let us help you find what you need</p> */}
                     <p className="text-slate-400 text-sm mt-2 !ml-0">Let us help you find what you need, Why not try searching for: <span className="text-slate-300 font-semibold">Entertainment, Navigation, Account Setup, Feedback.</span></p>
                      <img src="/images/assets/notFound.svg" className="w-[100%] h-[50%] mt-10" />
                    </div>
                </div>
                
            </div>
        </div>
    </motion.div>
  )
}

export default NotFound
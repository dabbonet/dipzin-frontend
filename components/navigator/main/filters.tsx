import clsx from 'clsx'
import { motion } from 'framer-motion'
import React from 'react'

const Filters = () => {

  const [selected, setSelected] = React.useState<string[]>([])
  const [tab, setTab] = React.useState<number>(1)
  return (
    <motion.div 
        className="mb-2 p-2 max-w-[1400px]"
        initial={{ opacity: 0, y:100 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
    >
        <div className='flex items-center text-sm mb-2'>
            <p className='flex-1 uppercase text-sm text-slate-400'>Available Filters</p>
            <ul className='inline-flex space-x-2 text-xs'>
                <div className={clsx(tab == 1 ? 'bg-slate-500' : 'bg-slate-700', ' py-2 px-3 rounded-full text-slate-200 cursor-pointer')} onClick={() => setTab(1)}>App Categories</div>
                <div className={clsx(tab == 2 ? 'bg-slate-500' : 'bg-slate-700', ' py-2 px-3 rounded-full text-slate-200 cursor-pointer')} onClick={() => setTab(2)}>Screen Patterns</div>
            </ul>
        </div>
        <div className='grid grid-rows-5 grid-flow-col gap-3 p-4 mt-2 rounded-2xl bg-slate-800'>
            { tab === 1 && (
                <>
                    <Tag text="Business" selected/>
                    <Tag text="Education"/>
                    <Tag text="Entertainment"/>
                    <Tag text="Finance"/>
                    <Tag text="Food & Drink"/>
                    <Tag text="Health & Fitness"/>
                    <Tag text="Lifestyle"/>
                    <Tag text="Medical"/>
                    <Tag text="Music"/>
                    <Tag text="Navigation"/>
                    <Tag text="News"/>
                    <Tag text="Photo & Video"/>
                    <Tag text="Productivity"/>
                    <Tag text="Reference"/>
                    <Tag text="Shopping"/>
                    <Tag text="Social Networking"/>
                    <Tag text="Sports"/>
                    <Tag text="Travel"/>
                    <Tag text="Utilities"/>
                </>
            )}
            { tab === 2 && (
                <>
                    <Tag text="Business" selected/>
                    <Tag text="Education"/>
                    <Tag text="Entertainment"/>
                    <Tag text="Finance"/>
                    <Tag text="Food & Drink"/>
                    <Tag text="Health & Fitness"/>
                    <Tag text="Lifestyle"/>
                    <Tag text="Medical"/>
                    <Tag text="Music"/>
                    <Tag text="Navigation"/>
                    <Tag text="News"/>
                    <Tag text="Photo & Video"/>
                    <Tag text="Productivity"/>
                    <Tag text="Reference"/>
                    <Tag text="Shopping"/>
                    <Tag text="Social Networking"/>
                    <Tag text="Sports"/>
                    <Tag text="Travel"/>
                    <Tag text="Utilities"/>
                </>
            )}
        </div>
    </motion.div>
  )
  
}

export default Filters


const Tag = ({text, selected = false}:any) => {
  return (
    <div 
        className={
            clsx(
                selected ? 'text-orange-500 border-orange-500 hover:border-orange-400 hover:text-orange-400' : 'text-slate-300 border-slate-500/60 hover:border-slate-400',
                 'text-xs flex items-center border  cursor-pointer py-1.5 px-2.5 rounded-full w-fit h-fit')}
    >
        {selected && (
            <svg
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0 w-3.5 h-3.5 mr-1 relative"
                preserveAspectRatio="xMidYMid meet"
            >
            <path
                d="M12.223 3.44265L5.27848 11.3793L1.77344 7.87424L2.62418 7.02351L5.21987 9.6192L11.3176 2.65039L12.223 3.44265Z"
                fill='currentColor'
            />
            </svg>
        )}
        
        {text}
    </div>
  )
}







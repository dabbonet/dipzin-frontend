import { motion } from 'framer-motion';
import { FC } from 'react'
import Image from 'next/image'
import { rgbDataURL } from '@/lib/utils';
import Screen from '@/ui/Screen';

interface SingleScreenProps {
    src: string
}

const SingleScreen: FC<SingleScreenProps> = ({ src }) => {
    if (!src) return (
        <div>Empty Screen</div>
    )
    return (
        <div className="flex justify-center items-center relative group/item">
            <motion.div
                layout
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                }}
            >
                {/* <div className="absolute w-[100%] top-4 flex justify-center drop-shadow-xl z-20">
                    <div
                        className={`group/copy h-10 w-10 bg-slate-900 z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible`}
                    >
                        <img src="/images/assets/copy.svg" />
                        <span className="absolute top-12 bg-slate-900 flex items-center justify-center py-[2px] px-[6px] rounded-2xl font-medium text-white text-[12px] invisible group-hover/copy:visible">
                            Copy Image
                        </span>
                    </div>
                    <div
                        className="group/copy h-10 w-10 z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible mx-2"
                    >
                        <img src="/images/assets/addtocoll.svg" />
                        <span className="absolute top-12 bg-slate-900 flex items-center justify-center py-[2px] px-[6px] rounded-2xl font-medium text-white text-[12px] invisible group-hover/copy:visible">
                            Save to Collection
                        </span>
                    </div>
                    <div
                        className="group/copy h-10 w-10 z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible">
                        <img src="/images/assets/threedots.svg" />
                        <span className="absolute top-12 bg-slate-900 flex items-center justify-center py-[2px] px-[6px] rounded-2xl font-medium text-white text-[12px] invisible group-hover/copy:visible">
                            Menu
                        </span>
                    </div>

                </div>
                <div className="absolute w-[100%] top-16 flex justify-center drop-shadow-xl z-10">
                    <span className="bg-slate-900 flex items-center justify-center py-[2px] px-[6px] rounded-2xl font-medium text-white text-[12px] cursor-pointer invisible group-hover/menu:visible ">
                        Copy Image
                    </span>
                </div> */}

                <div className="w-full rounded-2xl overflow-hidden min-720:gap-16 ">
                    <Screen src={src} />
                </div>
            </motion.div>
        </div>
    )
}

export default SingleScreen
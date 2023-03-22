import { FC } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Icons from '@/components/Icons'
import HoverScreen from '@/components/screen/HoverScreen'

interface ShowcaseScreenProps {
    src: any
}

const ShowcaseScreen: FC<ShowcaseScreenProps> = ({ src }) => {
    return (
        <div className="flex justify-center items-center relative group/item cursor-pointer">
            <motion.div
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.4 },
                }}
            >
                <div className="w-full rounded-2xl overflow-hidden min-720:gap-16 transform duration-500 border-[0px] hover:border-[3px] border-transparent hover:border-slate-300">
                    <HoverScreen />
                    <div className="absolute w-[100%] bottom-3 flex justify-start items-center drop-shadow-xl opacity-0 transform transition duration-500 group-hover/item:opacity-100 z-20">
                        <Image
                            className="h-[15%] w-[15%] ml-[4%] rounded-full bg-slate-700"
                            width={48}
                            height={48}
                            src={'https://dipzinapplications.s3.us-west-1.amazonaws.com/17182ebc_7d8f_4a59_a264_379f6fa24d98_dfb7e100eb.png'}
                            alt="icon"
                        />
                        <div className="text-white">
                            <span className="ml-2 text-[15px] font-semibold">name</span>
                            <span className="block text-[10px] font-light ml-2">
                                tagline
                            </span>
                        </div>
                        <Icons.Maximize size={24} className="hover:text-orange-500 ml-auto mr-4" />
                    </div>
                    <div className="absolute bottom-0 w-[100%] h-[30%] bg-gradient-to-t from-black opacity-80 z-10 invisible transform transition duration-500 group-hover/item:visible"></div>
                </div>
            </motion.div>
        </div>
    )
}

export default ShowcaseScreen
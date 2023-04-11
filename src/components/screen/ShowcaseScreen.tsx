import { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Icons from '@/components/Icons'
import Screen from '@/ui/Screen'
import { usePlatform } from '@/lib/platforms'

interface ShowcaseScreenProps {
    app: any
}

const ShowcaseScreen: FC<ShowcaseScreenProps> = ({ app }) => {
    const { selected: platform } = usePlatform()
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval: any;
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImage((currentImage + 1) % app.screens.length);
            }, 600);
        }

        return () => {
            clearInterval(interval);
        };
    }, [currentImage, app, isHovered]);

    if (!app) return null
    return (
        <div className="flex justify-center items-center relative group/item cursor-pointer">
            <motion.div
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.4 },
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setCurrentImage(0);
                }}
            >
                <div className="w-full rounded-2xl overflow-hidden min-720:gap-16 transform duration-500 border-[0px] hover:border-[3px] border-transparent hover:border-slate-300">
                    {app?.screens && (
                        <div
                            className="relative h-full w-full bg-slate-800"
                        >
                            {app.screens[currentImage] && app.screens.length >= 1 && (
                                <Screen src={app.screens[currentImage]} />
                            )}
                        </div>
                    )}

                    <div className="absolute w-[100%] bottom-4 px-4 flex flex-col space-y-1 drop-shadow-xl opacity-0 transform transition duration-500 group-hover/item:opacity-100 z-20">
                        <Image
                            className="h-[15%] w-[15%] rounded-md bg-slate-700"
                            width={48}
                            height={48}
                            src={app?.icon}
                            alt="icon"
                        />
                        <div className='flex justify-between'>

                            <div className="text-white -space-y-1">
                                <span className="text-md tracking-wider font-medium">{app?.name}</span>
                                <span className="block text-[13px] font-light tracking-widest">
                                    {app?.tag_line}
                                </span>
                            </div>
                            <Icons.Maximize size={24} className="hover:text-orange-500" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 w-[100%] h-[40%] bg-gradient-to-t from-slate-950 to-slate-950/0 opacity-90 invisible transform transition duration-500 group-hover/item:visible"></div>

                </div>
            </motion.div>
        </div>
    )
}

ShowcaseScreen.displayName = "ShowcaseScreen"

export default ShowcaseScreen




// function Overlay() {

//     return (
//         <div className="absolute w-[100%] bottom-3 flex justify-start items-center drop-shadow-xl opacity-0 transform transition duration-500 group-hover/item:opacity-100 z-20">
//         <Image
//             className="h-[15%] w-[15%] ml-[4%] rounded-full bg-slate-700"
//             width={48}
//             height={48}
//             src={app?.icon?.thumbnail?.url}
//             alt="icon"
//         />
//         <div className="text-white -space-y-1">
//             <span className="ml-2 text-sm font-semibold">{app?.name}</span>
//             <span className="block text-[10px] font-light ml-2 tracking-widest">
//                 {app?.tag_line}
//             </span>
//         </div>
//         <Icons.Maximize size={24} className="hover:text-orange-500 ml-auto mr-4" />
//     </div>
//     <div className="absolute bottom-0 w-[100%] h-[30%] bg-gradient-to-t from-black opacity-80 z-10 invisible transform transition duration-500 group-hover/item:visible"></div>

//     )
// }
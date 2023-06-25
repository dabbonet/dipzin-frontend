'use client'

import { getToken } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { toast } from "react-hot-toast";
import Icons from "./Icons"
import { AnimatePresence, motion } from "framer-motion";
import ReactPlayer from "react-player"

export function Personalize({ positions , interests}) {
    const router = useRouter()
    const [userInterests , setUserIntersts] = useState([])
    const [userPositions ,setUserPositions] = useState([])
    const [openVideo ,setOpenVideo] = useState(null)


    const PositionComponent = ({ id, name }) => {
        const clickLabel = () => {
            if (userPositions.includes(id)) {
                setUserPositions(userPositions.filter(el => el !== id))
            } else {
                setUserPositions([...userPositions, id])
            }
            console.log(userPositions)
        }
        if(userPositions.includes(id)){
            return <label htmlFor={id} className=" flex items-center bg-slate-900 py-2 pl-4 pr-7 rounded-lg">
            <input onClick={clickLabel} checked type="checkbox" name={name} id={id} className=" mr-4  before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded  before:w-5 relative before:absolute  before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center" />
            <div className=" flex justify-center items-center bg-slate-800 p-2 border border-solid border-aqua-700 rounded-lg mr-4 checked:border-aqua-300">
                <img src="/images/assets/product-designer.svg" alt="" />
            </div>
            <span className=" w-fit text-xs font-normal">{name}</span>
        </label>
        }
        return <label htmlFor={id} className=" flex items-center bg-slate-900 py-2 pl-4 pr-7 rounded-lg">
            <input onClick={clickLabel} type="checkbox" name={name} id={id} className=" mr-4  before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded  before:w-5 relative before:absolute  before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center" />
            <div className=" flex justify-center items-center bg-slate-800 p-2 border border-solid border-slate-700 rounded-lg mr-4 checked:border-aqua-300">
                <img src="/images/assets/product-designer.svg" alt="" />
            </div>
            <span className=" w-fit text-xs font-normal">{name}</span>
        </label>
    }
    const InterestsComponent = ({ tilte, id }) => {

        const clickButton = (e) => {
            if (userInterests.includes(id)) {
                setUserIntersts(userInterests.filter(el => el !== id))
            } else {
                setUserIntersts([...userInterests, id])
            }
        }
        if(userInterests.includes(id)){
            return  (
                <button
                    className={` text-slate-200 py-2 px-4 rounded-2xl bg-slate-900 border border-aqua-600 border-solid`}
                    onClick={clickButton}
                >
                    {tilte}
                </button>
            )
        }
        return (
            <button
                className={` text-slate-200 py-2 px-4 rounded-2xl bg-slate-900 border border-transparent`}
                onClick={clickButton}
            >
                {tilte}
            </button>
        )
    }
    const FullPositionComponent = () => {
        return <div className=" grid grid-cols-1 lg:grid-cols-2 mt-3 gap-4">
            {positions?.data.map(el => (
                <PositionComponent id={el.id} name={el.attributes.name} />
            ))}
        </div>
    }
    const FullInterestsComponent = () => {
        return <div className=" flex flex-wrap gap-3 mb-8">
            {interests?.data.map(el => (
                <InterestsComponent id={el.id} tilte={el.attributes.name} />
            ))}
        </div>
    }
    const handleAllSet = async () => {
        const [positionsReq, interestsReq] = await Promise.all([
            fetch('/api/user-positions', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        positions: userPositions,
                        auth: getToken()
                    }
                })
            }),
            fetch('/api/user-interests', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        interests: userInterests,
                        auth: getToken(),
                    }
                })
            })
        ]);
        if (positionsReq.ok && interestsReq.ok) {
            router.push('/profile/enjoy')
        } else {
            toast.remove()
            toast.error('something went wrong')
        }

    }
    return <motion.div
        initial={{opacity: 0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        
    >
        <div className=" flex gap-x-36 flex-wrap justify-center items-center max-w-7xl">
                <div className=" flex-1">
                    <p className=" text-slate-400 text-base font-normal"><span className=" text-aqua-500">2/2</span> Customize Experience</p>
                    <h1 className=" text-6xl text-white font-medium mb-3">Personalize Your Experience</h1>
                    <p className=" text-slate-400 mb-28">
                        Let's personalize your experience on Dipzin. Please answer a few questions about your interests and preferences.
                        <br />
                        <br />
                        <br />
                        <br />
                        As always, your privacy is important to us, so please review our privacy policy and terms of service before proceeding.
                    </p>
                    <div className=" relative cursor-pointer " onClick={()=> setOpenVideo(true)}>
                    <p className=" text-slate-400 text-xs">Onboarding Video</p>
                    <img src="/images/assets/profile-steper-video-screen.svg"  className=" -mt-14 -ml-20" alt="" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-[325%] flex justify-center items-center flex-col -translate-y-full">
                    <Icons.PlayVideo className=" w-9 h-9"/>
                    <p className="text-xs font-medium text-left text-aqua-100">
                        Play Video
                    </p>
                    </div>

                </div>
                </div>
                <div className=" flex-1">
                    <p className=" text-slate-300">Which best describes you?</p>
                    <FullPositionComponent />
                    <div className=" mt-9">
                        <h3 className=" text-slate-300 mb-1 text-base font-normal">Interests</h3>
                        <p className=" text-slate-500 mb-4">Help us develop and prioritize features, and customize your experience.</p>
                        <FullInterestsComponent />
                        <div className=" flex justify-between items-center">
                            <Link href='/' className=" text-slate-400">Skip</Link>
                            <div className=" flex items-center gap-4">
                                <Link href='/profile/profile-informations' className=" py-3 px-9 bg-slate-800 text-slate-500 rounded-lg">Back</Link>
                                <button onClick={handleAllSet} className=" py-3 px-9 bg-gradient-to-tr from-aqua-400 bg-aqua-600 text-aqua-950 font-medium rounded-lg">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
        {openVideo && (
          <>
            <motion.div
              className=" fixed top-0 left-0 w-full h-full backdrop-blur-md bg-slate-900/70 z-50 flex items-center justify-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ReactPlayer url={`https://www.youtube.com/watch?v=NkjXFMTln5Q`}
              className='z-[400]'
              controls
            />
              
              <motion.div
                onClick={() => setOpenVideo(null)}
                className={
                  "w-[100%] h-[100%] fixed top-0 left-0 bg-transparent"
                }
              ></motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
     
}
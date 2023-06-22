'use client'
import { getToken } from "@/lib/auth"
import { useRouter } from "next/navigation"
import {  useState } from "react"
import { toast } from "react-hot-toast"
import { AnimatePresence, motion } from "framer-motion";
import ReactPlayer from "react-player"


export default function ProfileInformation({ newsLetter }: {newsLetter? : any[]}) {
    const rouuer = useRouter()
    const [profileUpdated, setProfileUpdated] = useState(false)
    const [newsLetterUpdated, setNewsLetterUpdated] = useState(false)
    const [openVideo ,setOpenVideo] = useState(false)
    const [userDetails, setUserDetails] = useState({
        name: '',
        username: "",
        email: "",
        image: null
    })
    const[userArr, setUserArr] = useState([])
    
    const addNewsLetter = (e) => {
        const { id } = e.target
        if (userArr.includes(+id)) {
            setUserArr(userArr.filter(el => el !== +id))
        } else {
            setUserArr([...userArr, +id])
        }
    }

    const handleChange = (event) => {
        const { id, value , name , files} = event.target
        if (name === "image") {
            const reader = new FileReader();
            reader.onload = (e) => {
              setUserDetails({
                ...userDetails,
                [name]: e.target.result
              })
            }
            reader.readAsDataURL(files[0]!);
            return
          }
        setUserDetails({
            ...userDetails,
            [id]: value
        })
    }
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const [updateResponse, newsLetterResponse] = await Promise.all([
                fetch(`/api/account/update`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        auth: getToken(),
                        username: userDetails.username,
                        name: userDetails.name,
                        email: userDetails.email,
                    }),
                }),
                fetch('/api/user-system-news-letters', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        data: {
                            news_letters: userArr,
                            auth: getToken()
                        },
                    }),
                }),
            ]);
            const [updateData , newsLetterData] = await Promise.all([
                updateResponse.json(),
                newsLetterResponse.json(),
            ]);
            if (!updateResponse.ok) {
                toast.remove();
                toast.error(updateData.message);
            } else {
                setProfileUpdated(true);
            }
            if (!newsLetterResponse.ok) {
                toast.remove();
                toast.error('Unable to process the data!');
            } else {
                setNewsLetterUpdated(true);
            }
        } catch (error) {
            toast.remove();
            toast.error('Something went wrong');
        }
    };
    const SystemNewsLetterComponent = ({ id, name }) => {
        return <div className=" flex gap-2  items-center">
            <input onClick={addNewsLetter} type="checkbox" checked={userArr.includes(id)} id={id} className="before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded-lg before:w-5 relative before:absolute before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center " />
            <label htmlFor={id}>{name}</label>
        </div>
    }

    const FullNewSLetterComponent = () => {
        return <div className=" grid grid-cols-2 gap-x-12 gap-y-4 mt-5">
            {newsLetter?.map(el => (
                <SystemNewsLetterComponent id={el?.id} name={el?.attributes.name} />
            ))}
        </div>
    }
    if (profileUpdated && newsLetterUpdated) {
        rouuer.push('/profile/personalize')
    }
    return <motion.div
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
        duration: 0.75,
        }}
        variants={{
        initialState: {
            opacity: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        },
        animateState: {
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        },
        exitState: {
            clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
        },
        }}
    >
        <div className=" flex gap-x-36 flex-wrap justify-center items-center max-w-5xl">
            <div className=" flex-1">
                <p className=" text-slate-400 text-base font-normal"><span className=" text-aqua-500">1/2</span> Basic Info</p>
                <h1 className=" text-6xl text-white font-medium mb-3">Let’s setup your account.</h1>
                <p className=" text-slate-400 mb-28">Let's get to know you better! Your privacy is important to us, so please take a moment to review our <a href="https://google.com" className=' text-slate-100 underline'>privacy policy</a> and <a href="https://google.com" className=' text-slate-100 underline'>terms of service</a> before getting started. </p>
                <div>
                    <p className=" text-slate-400 text-xs">Onboarding Video</p>
                    <img src="/images/assets/profile-steper-video-screen.svg" onClick={()=> setOpenVideo(true)} className=" -mt-14 -ml-20" alt="" />
                </div>
            </div>
            <div className=" flex-1">
                <div className=" mb-5">
                    <p className=" text-slate-300 text-base font-normal">Profile Picture</p>
                    <div className=" grid grid-cols-6 gap-x-2">
                        <img src="/images/assets/Manager-1.svg" alt="" />
                        <img src="/images/assets/Manager-1.svg" alt="" />
                        <img src="/images/assets/Manager-1.svg" alt="" />
                        <img src="/images/assets/Manager-1.svg" alt="" />
                        <img src="/images/assets/Manager-1.svg" alt="" />
                        <img src="/images/assets/Manager-1.svg" alt="" />
                    </div>
                    
                </div>
                <form action="" onSubmit={submitForm}>
                    <div className="flex gap-4 mt-4 mb-4">
                        <div className="bg-slate-700 w-14 h-14 rounded-2xl mx-auto md:mx-0 overflow-hidden">
                            <label htmlFor="image" className=" w-full h-full cursor-pointer flex justify-center items-center">
                            {userDetails.image && <img src={userDetails.image} className='w-full h-full' alt="" />}
                            </label>
                            <input type="file" accept="image/*" className=" hidden" id="image" name="image"
                            onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col justify-center'>
                            <p className=' text-sm text-white'>Upload a Profile Picture</p>
                            <p className=' text-slate-600 text-sm'>Supported formats: jpg, png maximum size: 2MB</p>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-y-2 mb-4">
                        <label htmlFor="name" className=" text-slate-300">Name <span className=" text-aqua-300">*</span></label>
                        <input required type="text" onChange={handleChange} id="name" value={userDetails.name} placeholder="Full Name" className=" bg-transparent border border-solid border-slate-600 rounded-lg indent-4 py-4" />
                    </div>
                    <div className=" flex flex-col gap-y-2 mb-4">
                        <label htmlFor="username" className=" text-slate-300">Username <span className=" text-aqua-300">*</span></label>
                        <input required type="text" onChange={handleChange} id="username" value={userDetails.username} placeholder="@dipzin" className=" bg-transparent border border-solid border-slate-600 rounded-lg indent-4 py-4" />
                    </div>
                    <div className=" mb-4">
                        <p className=" text-slate-300">Notifications <span className=" text-aqua-300">*</span></p>
                        <p className=" text-slate-500 font-medium text-xs">Choose type of notifications you want to receive</p>
                        <FullNewSLetterComponent />
                    </div>
                    <div className=" flex justify-end gap-x-4">
                        {/* <Link href='/' className=" rounded-lg bg-slate-900 py-2 px-9 text-sm font-medium">back</Link> */}
                        <button className=" rounded-lg bg-gradient-to-tr from-aqua-400 to-aqua-600 py-2 px-9 text-sm font-medium text-aqua-950">Next</button>
                    </div>
                </form>

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
              className=''
              controls
            />
              
              <motion.div
                onClick={() => setOpenVideo(false)}
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
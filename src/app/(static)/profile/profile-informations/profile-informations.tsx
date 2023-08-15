'use client'
import { getToken, useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { AnimatePresence, animate, motion } from "framer-motion";
import ReactPlayer from "react-player"
import Icons from "../../../../components/Icons"


export default function ProfileInformation({ newsLetter }: { newsLetter?: any[] }) {
    const rouuer = useRouter()
    const {user} = useAuth();
    const [profileUpdated, setProfileUpdated] = useState(false)
    const [newsLetterUpdated, setNewsLetterUpdated] = useState(false)
    const [openVideo, setOpenVideo] = useState(false)
    const [userDetails, setUserDetails] = useState({
        name: '',
        username: "",
        file: null,
        src: null
    })
    const [userCopyState, setUserCopyState] = useState(null)

    const [userArr, setUserArr] = useState([1, 2, 3, 4])

    useEffect(() => {
        async function getUserDetails() {
            try {
                const response = await fetch("/api/account/info", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        auth: getToken()
                    })
                });
                const data = await response.json();
                if (response.ok) {
                    setUserDetails(data.data)
                    if (data.data.username) {
                        setUserCopyState({ username: data.data.username, name: data.data.name })
                    }

                }
            } catch (error) {
                toast.remove()
                toast.error('error fetch data')
            }
        }
        getUserDetails();
    }, [])

    const addNewsLetter = (e) => {
        const { id } = e.target
        if (+id === 5) {
            if (userArr.includes(+id)) {
                setUserArr([])
            } else {
                setUserArr([+id])
            }
        } else {
            if (userArr.includes(+id)) {
                setUserArr(userArr.filter(el => el !== +id))
            }
            if (!userArr.includes(+id)) {
                const removedItem = 5
                setUserArr([...userArr.filter(el => el !== removedItem), +id])
            }
        }

    }

    const handleChange = (event) => {
        const { id, value, files, src } = event.target
        if (id === 'image') {
            setUserDetails({
                ...userDetails,
                src: src
            })
            return
        }
        if (id === 'label') {
            const file = files[0]
            const reader = new FileReader();
            if (file) {
                reader.onloadend = () => {
                    const imageDataUrl = reader.result;
                    setUserDetails({
                        ...userDetails,
                        file: files[0],
                        src: imageDataUrl
                    })
                };
                reader.readAsDataURL(file);
            }
            return
        }
        setUserDetails({
            ...userDetails,
            [id]: value
        })

    // 
    }
    const submitForm = async (e) => {
        console.log(userDetails);
        e.preventDefault();
        if (userDetails?.name !== '' && userDetails?.username !== '' && userDetails?.name === userCopyState?.name && userDetails?.username === userCopyState?.username && !userDetails?.file) {
            setProfileUpdated(true)
            setNewsLetterUpdated(true)
            return
        }
        try {
            
            let formData = new FormData();
            formData.append("auth", getToken());
            formData.append("id", user.id);
            formData.append("username", userDetails.username);
            formData.append("name", userDetails.name);
            if (userDetails.file) {
                formData.append("file", userDetails.file);
            }
            const [updateResponse, newsLetterResponse] = await Promise.all([
                // TODO: add avatar to this body
                fetch(`/api/account/update`, {
                    method: "POST",
                    body: formData
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
            const [updateData, newsLetterData] = await Promise.all([

                updateResponse.json(),
                newsLetterResponse.json(),
            ]);
            console.log(updateData, newsLetterData)
            if (!updateResponse.ok) {
                toast.remove();
                if (profileUpdated === false) {
                    toast.error(updateData.message);
                }
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
            <input onClick={addNewsLetter} type="checkbox" defaultChecked={userArr.includes(id)} id={id} className="before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded-lg before:w-5 relative before:absolute before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center " />
            <label htmlFor={id}>{name}</label>
        </div>
    }

    const FullNewSLetterComponent = () => {
        return <div className=" grid grid-cols-2 gap-x-12 gap-y-4 mt-5">
            {newsLetter?.map(el => (
                <SystemNewsLetterComponent id={el?.id} name={el?.attributes.name} key={el?.id} />

            ))}
        </div>
    }
    if (profileUpdated && newsLetterUpdated) {
        rouuer.push('/profile/personalize')
    }
    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

    >
        <div className=" flex gap-x-36 flex-wrap justify-center items-center max-w-5xl">
            <div className=" flex-1">
                <p className=" text-slate-400 text-base font-normal"><span className=" text-aqua-500">1/2</span> Basic Info</p>
                <h1 className=" text-6xl text-white font-medium mb-3">Let’s setup your account.</h1>
                <p className=" text-slate-400 mb-28">Let's get to know you better! Your privacy is important to us, so please take a moment to review our <a href="https://google.com" className=' text-slate-100 underline'>privacy policy</a> and <a href="https://google.com" className=' text-slate-100 underline'>terms of service</a> before getting started. </p>
                <div className=" relative cursor-pointer " onClick={() => setOpenVideo(true)}>
                    <p className=" text-slate-400 text-xs">Onboarding Video</p>
                    <img src="/images/assets/profile-steper-video-screen.svg" className=" -mt-14 -ml-20" alt="" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-[200%] flex justify-center items-center flex-col -translate-y-full">
                        <Icons.PlayVideo className=" w-9 h-9" />
                        <p className="text-xs font-medium text-left text-aqua-100">
                            Play Video
                        </p>
                    </div>

                </div>
            </div>
            <div className=" flex-1">
                <div className=" mb-5">
                    <p className=" text-slate-300 text-base font-normal">Profile Picture</p>
                    <div className=" grid grid-cols-6 gap-x-2">
                        <img src="/images/assets/manager.png" id='image' onClick={handleChange} className=" cursor-pointer" />
                        <img src="/images/assets/manager2.png" id='image' onClick={handleChange} className=" cursor-pointer" />
                        <img src="/images/assets/manager3.png" id='image' onClick={handleChange} className=" cursor-pointer" />
                        <img src="/images/assets/manager4.png" id='image' onClick={handleChange} className=" cursor-pointer" />
                        <img src="/images/assets/manager5.png" id='image' onClick={handleChange} className=" cursor-pointer" />
                        <img src="/images/assets/manager6.png" id='image' onClick={handleChange} className=" cursor-pointer" />
                    </div>

                </div>
                <form action="" onSubmit={submitForm}>
                    <div className="flex gap-4 mt-4 mb-4">
                        <div className=" bg-slate-800 p-1 border border-dotted border-slate-600 rounded-2xl">
                            <div className="bg-slate-700 w-14 h-14 rounded-xl mx-auto md:mx-0 overflow-hidden">
                                <label htmlFor="label" className=" w-full h-full cursor-pointer flex justify-center items-center relative z-50">
                                    {userDetails.src ? <img src={userDetails.src} className='w-full h-full object-cover' id="image" /> : <Icons.addImage className="absolute bottom-2 right-2" />}
                                </label>
                                <input type="file" accept="image/*" className=" hidden" id="label"
                                    onChange={handleChange}
                                    // onClick={(e) => {
                                    //     let { files }: any = e.target
                                    //     files = {}
                                    //     console.log(files)
                                    // }}
                                />
                            </div>

                        </div>
                        <div className='flex flex-col justify-center'>
                            <p className=' text-sm text-white'>Upload a Profile Picture</p>
                            <p className=' text-slate-600 text-sm'>Supported formats: jpg, png maximum size: 2MB</p>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-y-2 mb-4">
                        <label htmlFor="name" className=" text-slate-300">Name <span className=" text-aqua-300">*</span></label>
                        <input required type="text" onChange={handleChange} id="name" value={userDetails.name} placeholder="Full Name" className=" bg-slate-950/70 border border-solid border-slate-800 rounded-xl px-4 py-3" />
                    </div>
                    <div className=" flex flex-col gap-y-2 mb-4">
                        <label htmlFor="username" className=" text-slate-300">Username <span className=" text-aqua-300">*</span></label>
                        <input required type="text" onChange={handleChange} id="username" value={userDetails.username} placeholder="@dipzin" className=" bg-slate-950/70 border border-solid border-slate-800 rounded-xl px-4 py-3" />
                    </div>
                    <div className=" mb-4">
                        <p className=" text-slate-300">Notifications <span className=" text-aqua-300">*</span></p>
                        <p className=" text-slate-500 font-medium text-xs">Choose type of notifications you want to receive</p>
                        <FullNewSLetterComponent />
                    </div>
                    <div className=" flex justify-end gap-x-4">
                        <button className=" rounded-lg bg-gradient-to-tr from-aqua-400 to-aqua-600 py-2 px-9 text-sm font-medium text-aqua-950" type="submit">Next</button>
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
                            className='z-[400] w-3/4 h-3/4'
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
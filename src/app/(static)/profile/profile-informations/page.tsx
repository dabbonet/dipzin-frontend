'use client'
import { getToken } from "@/lib/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export default function page({ }) {
    const rouuer = useRouter()
    const [newsLetter, setNewsLetter] = useState(null)
    const [profileUpdated, setProfileUpdated] = useState(false)
    const [newsLetterUpdated, setNewsLetterUpdated] = useState(false)
    const [userDetails, setUserDetails] = useState({
        name: '',
        username: "",
        email: "",
    })
    let userArr = []
    useEffect(() => {
        async function getNewsLetter() {
            const req = await fetch('https://rah.dipzin.com/api/system-news-letters', {
                method: 'GET',
                cache: 'no-cache'
            })
            const res = await req.json()
            setNewsLetter(res.data)
        }
        getNewsLetter()
    }, [])
    const addNewsLetter = (e) => {
        const { id } = e.target
        if (userArr.includes(+id)) {
            userArr = userArr.filter(el => el !== +id)
        } else {
            userArr = [...userArr, +id]
        }
    }

    const handleChange = (event) => {
        const { id, value } = event.target
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
                fetch('https://rah.dipzin.com/api/user-system-news-letters', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        data: {
                            news_letters: userArr,
                        },
                    }),
                }),
            ]);
            const [updateData] = await Promise.all([
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
            <input onClick={addNewsLetter} type="checkbox" id={id} className="before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded-lg before:w-5 relative before:absolute before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center " />
            <label htmlFor={id}>{name}</label>
        </div>
    }

    const FullNewSLetterComponent = () => {
        return <div className=" grid grid-cols-2 gap-x-12 gap-y-4 mt-5">
            {newsLetter?.map(el => (
                <SystemNewsLetterComponent key={el.id} id={el.id} name={el.attributes.name} />
            ))}
        </div>
    }
    if (profileUpdated && newsLetterUpdated) {
        rouuer.push('/profile/step-2')
    }
    return <div className=" flex gap-x-36 flex-wrap justify-center items-center max-w-5xl">
        <div className=" flex-1">
            <p className=" text-slate-400 text-base font-normal"><span className=" text-aqua-500">1/2</span> Basic Info</p>
            <h1 className=" text-6xl text-white font-medium mb-3">Let’s setup your account.</h1>
            <p className=" text-slate-400 mb-28">Let's get to know you better! Your privacy is important to us, so please take a moment to review our privacy policy and terms of service before getting started. </p>
            <div>
                <p className=" text-slate-400 text-xs">Onboarding Video</p>
                <img src="/images/assets/profile-steper-video-screen.svg" className=" -mt-14 -ml-20" alt="" />
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
}
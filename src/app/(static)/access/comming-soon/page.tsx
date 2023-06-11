'use client'

import { useState } from "react";
import { toast } from "react-hot-toast";

const CommingSoon = () => {
    const [email, setEmail] = useState("")
    let typeOFEmail;
    if(email.length === 0) typeOFEmail = 'required'
    const regextMatchEmail =
        /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        const handleChange = (e) => {
            setEmail(e)
        }
    if(email.length > 0 && !email.match(regextMatchEmail)) typeOFEmail = 'Invalid email'
    const submitEmail = async(e) => {
        if (!email.match(regextMatchEmail)) {
            return toast.error("please enter a valid email", {
                duration: 2000,
            });
        }
        const req = await fetch('/api/comming-soon', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    email
                }
            })
        })
        const res = await req.json()
        console.log(res)
    }
    return <div className="mx-auto w-full max-w-xl subpixel-antialiased">
        <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-aqua-200 to-aqua-600 lg:text-5xl text-3xl">
            Your Go-To Source for Digital Inspiration
        </h1>
        <p className="text-white font-light mt-4 lg:text-base text-sm">
            Sign up to be notified when Dipzin launches and start discovering new
            ideas and staying up-to-date on the latest Product Design trends. We
            can't wait to see what you create with Dipzin!
        </p>

        <div className=" w-full mt-6">
            <div className="flex items-center pl-3 w-full p-3 bg-slate-800 rounded-lg gap-3">
                <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <input type="email" value={email} onChange={(e)=> handleChange(e.target.value)} placeholder="Your email Address" className=" flex-1 bg-transparent focus:outline-none" />
                <span className=" text-red-500">{typeOFEmail}</span>
                <button className=" bg-gradient-to-r from-aqua-400 to-aqua-600 text-sm p-2 rounded-lg cursor-pointer" onClick={(e)=>submitEmail(e)}>Get Notified!</button>
            </div>
            
        </div>
    </div>
  };
  
  export default CommingSoon;
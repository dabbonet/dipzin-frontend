'use client'
import SparkleButton from "@/components/ui/SparkleButton";
import { getToken } from "@/lib/auth";
import Link from "next/link";
import { useEffect } from "react";

export default function EnjoyPage({ }) {

    useEffect(() => {
        const SendFreeTrials = async () => {
            try {
                const req = await fetch('/api/stripe/freeTrail', {
                    method: "POST",
                    body: JSON.stringify({
                        token: getToken()
                    })
                })
                const res = await req.json()
            } catch (error) {
                console.log(error)
            }
        }
        SendFreeTrials()
    }, [])


    return <div className=" flex items-center flex-col">
        <div className=" relative">
            <img src="/images/assets/step3-img-1.svg" alt="" className=" w-3/4 mx-auto max-h-full" />
            <img src="/images/assets/step3-img-2.svg" alt="" className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className=" flex items-center flex-col absolute lg:bottom-10 z-50">
                <h1 className=" lg:text-6xl text-center font-medium mb-4 md:text-3xl text-base">All Set! Kick Off with a Free Trial</h1>
                <p className=" text-slate-400 text-sm text-center mb-4">Congratulations on completing your profile! Now it's time to explore Dipzin's vast collection of mobile app designs from the best teams worldwide. Click 'Start Your Free Trial' below and enjoy a personalized, inspiring experience. Happy browsing!</p>
                <div className=" w-fit h-fit">
                    <SparkleButton href='/' >Try it!</SparkleButton>
                </div>
            </div>
        </div>
        <div className=" flex justify-center fixed bottom-20">
            <Link href={''}>Invite to Dipzin 💰</Link>
        </div>
    </div>
}
"use client";

import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";

const CommingSoon = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [email, setEmail] = useState("");
  const images = [
    "/images/hand/screen-1.png",
    "/images/hand/screen-2.png",
    "/images/hand/screen-3.png",
    "/images/hand/screen-4.png",
    "/images/hand/screen-5.png",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  let typeOFEmail;
  if (email.length === 0) typeOFEmail = "required";
  const regextMatchEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  const handleChange = (e) => {
    setEmail(e);
  };
  if (email.length > 0 && !email.match(regextMatchEmail))
    typeOFEmail = "Invalid email";
  const submitEmail = async (e) => {
    if (!email.match(regextMatchEmail)) {
      return toast.error("please enter a valid email", {
        duration: 2000,
      });
    }
    const req = await fetch("/api/comming-soon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          email,
        },
      }),
    });
    const res = await req.json();
    console.log(res);
  };
  return (
    <main className="flex flex-wrap w-[85%] mx-auto justify-center items-center gap-y-10 h-full max-h-screen">
      <Toaster position="top-center" />
      <div className="bg-black-950/50 w-fit h-fit z-10 flex flex-col justify-center p-20 px-12  rounded-3xl">
        <div className="mx-auto w-full max-w-xl subpixel-antialiased">
          <h1 className="font-bold text-aqua-50 lg:text-5xl text-3xl">
            Your Go-To Source for Digital Inspiration
          </h1>
          <p className="text-white font-light mt-4 lg:text-base text-sm">
            Sign up to be notified when Dipzin launches and start discovering
            new ideas and staying up-to-date on the latest Product Design
            trends. We can't wait to see what you create with Dipzin!
          </p>

          <div className=" w-full mt-6">
            <div className="relative items-center pl-3 w-full p-3 rounded-lg gap-3">
              <svg
                className="w-6 h-6text-gray-400 absolute top-7 left-7"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Your email Address"
                className="h-14 pl-12 pr-32 bg-slate-800 text-sm rounded-lg ring-transparent outline-none focus-visible:ring-aqua-500 block w-full placeholder-slate-400 text-white"
              />
              {/* <span className=" text-red-500">{typeOFEmail}</span> */}
              <button
                className="bg-aqua-500 hover:bg-aqua-300 text-aqua-900 text-sm font-semibold absolute top-[26%] right-5 py-2 px-3 rounded-lg cursor-pointer"
                onClick={(e) => submitEmail(e)}
              >
                Get Notified!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[50vh] lg:h-[75vh] xl:mt-2">
        <img
          className=" max-w-[100%] z-50 h-[100%]"
          src="/images/hand/phone.png"
          alt=""
        />
        {images[currentImage] && (
          <Image
            className=" object-contain -z-50"
            src={images[currentImage]}
            fill
            alt=""
            sizes=""
            unoptimized
          />
        )}
      </div>
    </main>
  );
};

export default CommingSoon;

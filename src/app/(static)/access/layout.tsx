"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentImage, setCurrentImage] = useState(0);
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

  return (
    <main className="flex flex-wrap w-[85%] mx-auto justify-center items-center align-middle h-full max-h-screen">
      <div className="bg-slate-900/50 w-[40%] h-fit z-10 flex flex-col justify-center p-10 px-12 rounded-s-3xl">
        {children}
      </div>
      <div className="relative h-[50vh] lg:h-[75vh] xl:mt-2 w-auto overflow-hidden">
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
}

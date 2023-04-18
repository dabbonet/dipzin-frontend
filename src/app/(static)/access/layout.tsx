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
    <main className="flex flex-wrap h-full max-h-screen">
      <div className="z-10 flex-1 flex flex-col justify-center px-4">
        {children}
      </div>    
      <div className="relative h-[50vh] lg:h-[85vh] xl:mt-2 w-full mx-auto lg:flex-1 flex justify-center items-center">
        <img
          className=" w-[50%] h-[70%] -translate-y-4 -translate-x-24 z-50"
          src="/images/assets/phoneAuth.svg"
          alt=""
          
        />
        {images[currentImage] && (
          <Image
            className=" object-contain !w-[50%] !h-[70%]"
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

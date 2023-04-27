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
    "/images/hand/Screenshot-1.png",
    "/images/hand/Screenshot-2.png",
    "/images/hand/Screenshot-3.png",
    "/images/hand/Screenshot-4.png",
    "/images/hand/Screenshot-5.png",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  return (
    <main className="flex flex-wrap h-full max-h-screen gap-y-10">
      <div className="z-10 flex-1 flex flex-col justify-center px-4">
        {children}
      </div>    
      <div className="relative h-[50vh] lg:h-[85vh] xl:mt-2 w-full mx-auto lg:flex-1 overflow-hidden">
        <img
          className=" max-w-[100%] z-50 mx-auto h-[100%]"
          src="/images/assets/phoneAuth.svg"
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

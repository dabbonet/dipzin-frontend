'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AccessLayout({
    children,
}: {
    children: React.ReactNode
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
        <main className="flex lg:flex-row flex-col h-auto overflow-hidden lg:rounded-tl-3xl">
            <div className="z-10 flex-1 flex flex-col justify-center px-4">
                {children}
            </div>
            <div className="relative h-[50vh] lg:h-[90vh] lg:mt-4 xl:mt-2 w-full lg:block lg:w-0 mx-auto lg:flex-1 flex-auto sm:ml-5">
                <Image
                    className="absolute right-0 object-contain z-0 lg:pt-24"
                    src="/images/hand/hand.png"
                    fill
                    alt=""
                    sizes="100%"
                    unoptimized
                />
                {images[currentImage] && (
                    <Image
                        className="absolute inset-0 object-contain h-full lg:pt-24"
                        src={images[currentImage]}
                        fill
                        alt=""
                        sizes="100%"
                        unoptimized
                    />
                )}
            </div>
        </main>
    )
}
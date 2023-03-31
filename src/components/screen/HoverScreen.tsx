'use client'

import { FC, useEffect, useState } from "react";
import Screen from "@/ui/Screen";

interface HoverScreenProps {
    images: any;
}

const HoverScreen: FC<HoverScreenProps> = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        let interval: any;
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImage((currentImage + 1) % images.length);
            }, 600);
        }

        return () => {
            clearInterval(interval);
        };
    }, [currentImage, images, isHovered]);
    return (
        <div
            className="relative h-full w-full bg-slate-800"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setCurrentImage(0);
            }}
        >
            {images[currentImage] && images.length >= 1 && (
                <Screen src={images[currentImage]} />
            )}
        </div>
    );
}

export default HoverScreen
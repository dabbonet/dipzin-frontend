'use client'

import { useEffect, useState } from "react";
import Screen from "@/ui/Screen";

const HoverScreen = ({ }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const images = [
        'https://dipzinapplications.s3.us-west-1.amazonaws.com/3db87bb0_d94e_4b8a_8186_f3d3084e3ddc_77ee9dc746.png',
        'https://dipzinapplications.s3.us-west-1.amazonaws.com/43f3d587_35a7_4f15_9713_b4e1ec6cb6f2_022febdf75.png',
        'https://dipzinapplications.s3.us-west-1.amazonaws.com/7287eb82_0471_4788_84a0_c84f424220f5_c806c214e3.png',
        'https://dipzinapplications.s3.us-west-1.amazonaws.com/a50eb012_2918_4af2_a155_4a87e866a7ef_6cc745807e.png',
        'https://dipzinapplications.s3.us-west-1.amazonaws.com/eaeee49b_e663_45cd_aa83_feb234fc2799_094b5e75bc.png',
    ];
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
    }, [currentImage, images.length, isHovered]);
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
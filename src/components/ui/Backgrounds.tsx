"use client"
import { motion, useScroll, useTransform } from "framer-motion"

const Background1 = () => {
    return (
        <div className='fixed top-0 -z-10 w-full h-full overflow-hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" opacity={0.3} preserveAspectRatio="none" className='w-full h-full absolute top-0 left-0 -z-50'>
                <defs>
                    <filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feGaussianBlur stdDeviation="10" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur">
                        </feGaussianBlur>
                    </filter>
                </defs>
                <g filter="url(#bbblurry-filter)">
                    <ellipse rx="15" ry="30" cx="30%" cy="50%" fill="#0284c7" opacity={0.6}>
                    </ellipse>
                    <ellipse rx="25" ry="25" cx="65%" cy="60%" fill="#1e40af" opacity={0.6}>
                    </ellipse>
                </g>
            </svg>
        </div>
    //     <div className='fixed top-0 left-0 w-screen h-screen overflow-hidden'>
    //     <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" preserveAspectRatio="none" className='w-full h-full absolute top-0 left-0'>
    //         <defs>
    //             <filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    //                 <feGaussianBlur stdDeviation="0.13" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur">
    //                 </feGaussianBlur>
    //             </filter>
    //         </defs>
    //         <g filter="url(#bbblurry-filter)">
    //             <ellipse rx="50" ry="50" cx="50%" cy="50%" fill="#0284c7">
    //             </ellipse>
    //             <ellipse rx="50" ry="50" cx="50%" cy="50%" fill="#1e40af">
    //             </ellipse>
    //         </g>
    //     </svg>
    // </div>
    )
}

export { Background1 }
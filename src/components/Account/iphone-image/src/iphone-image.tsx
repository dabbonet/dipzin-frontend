import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const IphoneImage = ({ images } : { images : string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 1250);
    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  return (
    <div className="relative">
      <Image
        src="/assets/mobile-skeleton.svg"
        alt="Mobile Phone"
        width={300}
        height={650}
      />
      {images[currentImage] && (
      <Image
        src={images[currentImage]}
        alt="Screenshot Example"
        className="absolute top-0 translate-y-[-3.5%] rounded-3xl scale-[90%] -z-10"
        width={300}
        height={650}
      />
      )}
    </div>
  )
}

export default IphoneImage

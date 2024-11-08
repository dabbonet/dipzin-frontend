"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const IphoneImage = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  return (
    <div className="relative overflow-hidden rounded-[56px]">
      <Image
        src="/assets/mobile-skeleton.svg"
        alt="Mobile Phone"
        width={300}
        height={600}
        className="max-w-full h-auto"
      />
      {images[currentImage] && (
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 translate-y-[-3.5%] rounded-3xl scale-[90%] -z-10 max-w-full h-auto"
        >
          <Image
            src={images[currentImage]}
            alt="Screenshot Example"
            width={300}
            height={650}
            className="max-w-full h-auto"
          />
        </motion.div>
      )}
    </div>
  );
};

export default IphoneImage;

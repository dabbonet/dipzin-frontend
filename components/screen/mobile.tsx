import { useEffect, useState, useRef } from "react";
import BlurImage from "./Image";

type SingleScreenProps = {
  image: string;
};

type HoverScreenProps = {
  images: string[];
}


export const SingleScreen = ({ image }: SingleScreenProps) => {
  return (
    <div className="flex justify-center items-center relative group/item cursor-pointer">
      <div className="w-full rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-105">
        <BlurImage platform={1} src={image} />
      </div>
    </div>
  );
};



const HoverScreen = ({ images }: HoverScreenProps) => {
  return (
    <div className="flex justify-center items-center relative group/item cursor-pointer">
      <div className="w-full rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-105">
        <ImageHover images={images} />
        <div className="absolute w-[100%] bottom-3 flex justify-start items-center drop-shadow-xl opacity-0 transform transition duration-500 group-hover/item:opacity-100 z-20">
          <img
            className="h-[15%] w-[15%] ml-[4%] rounded-full"
            src="/images/assets/appicon.svg"
          />
          <div className="text-white">
            <span className="ml-2 text-[15px] font-semibold">Hollister</span>
            <span className="block text-[10px] font-light ml-2">
              Fashion & Fitness
            </span>
          </div>
          <img
            className="ml-auto mr-[4%] h-[10%] w-[10%]"
            src="/images/assets/screenzome.svg"
          />
        </div>
        <div className="absolute bottom-0 w-[100%] h-[30%] bg-gradient-to-t from-black opacity-80 z-10 invisible transform transition duration-500 group-hover/item:visible"></div>
      </div>
    </div>
  );
};

export default HoverScreen;


const ImageHover = ({ images }: HoverScreenProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((currentImage + 1) % images.length);
      }, 500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentImage, images.length, isHovered]);

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImage(0);
      }}
    >
      <BlurImage platform={1} src={images[currentImage]} />
    </div>
  );
};

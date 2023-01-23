import { useEffect, useState } from "react";
import BlurImage from "./Image";

type ScreenProps = {
  images: string[];
};

const ImageHover = ({ images }: ScreenProps) => {
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

const Web = ({ images }: ScreenProps) => {
  return (
    <div className="flex justify-center items-center relative group/item">
      <div className="w-full rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-105">
        <ImageHover images={images} />
        {/*
                    <div className="absolute w-[100%] top-4 flex justify-center drop-shadow-xl ">
                        <img className=" h-[25%] w-[25%] transform transition duration-500 hover:scale-110 cursor-pointer opacity-0 group-hover/item:opacity-100" src="/images/assets/addpng.svg" />
                        <img className=" h-[25%] w-[25%] transform transition duration-500 hover:scale-110 cursor-pointer opacity-0 group-hover/item:opacity-100" src="/images/assets/addcopy.svg" />
                        <img className=" h-[25%] w-[25%] transform transition duration-500 hover:scale-110 cursor-pointer opacity-0 group-hover/item:opacity-100" src="/images/assets/addcollection.svg" />
                    </div>
                */}
        <div className="absolute w-[100%] bottom-3 flex justify-start items-center drop-shadow-xl opacity-0 transform transition duration-500 group-hover/item:opacity-100 z-20 ">
          <img
            className="h-[32px] w-[32px] ml-[4%] rounded-full"
            src="/images/assets/appicon.svg"
          />
          <div className="text-slate-300">
            <span className="ml-2 text-[15px] font-semibold">Hollister</span>
            <span className="block text-[10px] font-light ml-2">
              Fashion & Fitness
            </span>
          </div>
          <img
            className="ml-auto mr-[4%] h-[24px] w-[24px]"
            src="/images/assets/screenzome.svg"
          />
        </div>
        <div className="absolute bottom-0 w-[100%] h-[30%] bg-gradient-to-t from-black opacity-80 z-10 invisible transform transition duration-500 group-hover/item:visible"></div>
      </div>
    </div>
  );
};

export default Web;

import { useEffect, useState, useRef } from "react";
import BlurImage from "./Image";
import { motion } from "framer-motion"
import _ from 'lodash';

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

type SingleScreenProps = {
  image: string;
};

type HoverScreenProps = {
  images: string[];
  app: { id: string, name: string, tagline: string, icon: string }
}


export const SingleScreen = ({ image }: SingleScreenProps) => {
  return (
    <div className="flex justify-center items-center relative group/item cursor-pointer">
      <motion.div
        layout
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
      >
        <div className="w-full rounded-2xl overflow-hidden min-720:gap-16 ">

          <BlurImage platform={1} src={image} />


        </div>
      </motion.div>
    </div>
  );
};



const HoverScreen = ({ images, app }: HoverScreenProps) => {
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {

    setRandomImages(shuffle(images));
  }, [images]);

  const toStorageUrl = (pathname: string) => process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/application/icons/' + pathname
  return (
    <div className="flex justify-center items-center relative group/item cursor-pointer">
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.4 },
        }}
      >
        <div className="w-full rounded-2xl overflow-hidden min-720:gap-16 transform duration-500 border-[0px] hover:border-[3px] border-transparent hover:border-slate-300">
          <ImageHover app={app} images={randomImages} />
          <div className="absolute w-[100%] bottom-3 flex justify-start items-center drop-shadow-xl opacity-0 transform transition duration-500 group-hover/item:opacity-100 z-20">
            <img
              className="h-[15%] w-[15%] ml-[4%] rounded-full"
              src={toStorageUrl(app.icon)}
            />
            <div className="text-white">
              <span className="ml-2 text-[15px] font-semibold">{app.name}</span>
              <span className="block text-[10px] font-light ml-2">
                {app.tagline}
              </span>
            </div>
            <img
              className="ml-auto mr-[4%] h-[10%] w-[10%]"
              src="/images/assets/screenzome.svg"
            />
          </div>
          <div className="absolute bottom-0 w-[100%] h-[30%] bg-gradient-to-t from-black opacity-80 z-10 invisible transform transition duration-500 group-hover/item:visible"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HoverScreen;


const ImageHover = ({ images, app }: HoverScreenProps) => {
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
  }, [currentImage, images.length, isHovered]);

  // console.log('url'toStorageUrl(app + '/' + images[currentImage]));
  const toStorageUrl = (pathname: string) => process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/application/screens/' + pathname
  // console.log(toStorageUrl)

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImage(0);
      }}
    >
      <BlurImage platform={1} src={toStorageUrl(app.id + '/' + images[currentImage])} />
    </div>
  );
};


import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import BlurImage from "./Image";
import { motion } from "framer-motion";
import _ from "lodash";
import { saveAs } from "file-saver";

function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

type SingleScreenProps = {
  image: string;
};

type HoverScreenProps = {
  images: string[];
  app?: { id: string; name: string; tagline: string; icon: string };
};

export const SingleScreen = ({ image }: SingleScreenProps) => {
  const [menuIco, setMenuIco] = useState("");

  const saveFile = () => {
    saveAs(image, "image.webp");
  };
  return (
    <div className="flex justify-center items-center relative group/item">
      <motion.div
        layout
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
      >
        {/* we are here 
        
                  <img
            className=" h-[25%] w-[25%] transform transition duration-500 hover:scale-110 cursor-pointer opacity-0 group-hover/item:opacity-100"
            src="/images/assets/addpng.svg"
          />
          <img
            className=" h-[25%] w-[25%] transform transition duration-500 hover:scale-110 cursor-pointer opacity-0 group-hover/item:opacity-100"
            src="/images/assets/addcopy.svg"
          />
          <img
            className=" h-[25%] w-[25%] transform transition duration-500 hover:scale-110 cursor-pointer opacity-0 group-hover/item:opacity-100"
            src="/images/assets/addcollection.svg"
          />*/}

        <div className="absolute w-[100%] top-4 flex justify-center drop-shadow-xl z-20">
          <div
            className={`group/copy h-10 w-10 bg-slate-900 z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible`}
          >
            <img src="/images/assets/copy.svg" />
            <span className="absolute top-12 bg-slate-900 flex items-center justify-center py-[2px] px-[6px] rounded-2xl font-medium text-white text-[12px] invisible group-hover/copy:visible">
              Copy Image
            </span>
          </div>
          <div
            onClick={() => {
              if (menuIco == "save") {
                setMenuIco("");
              } else {
                setMenuIco("save");
              }
            }}
            className={`group/copy h-10 w-10 ${
              menuIco == "save" ? "bg-orange-500" : "bg-slate-900"
            } z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible mx-2`}
          >
            <img src="/images/assets/addtocoll.svg" />
            <span className="absolute top-12 bg-slate-900 flex items-center justify-center py-[2px] px-[6px] rounded-2xl font-medium text-white text-[12px] invisible group-hover/copy:visible">
              Save to Collection
            </span>
          </div>
          <div
            className={`group/copy h-10 w-10 ${
              menuIco == "menu" ? "bg-orange-500" : "bg-slate-900"
            } z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible`}
            onClick={() => {
              if (menuIco == "menu") {
                setMenuIco("");
              } else {
                setMenuIco("menu");
              }
            }}
          >
            <img src="/images/assets/threedots.svg" />
            <span className="absolute top-12 bg-slate-900 flex items-center justify-center py-[2px] px-[6px] rounded-2xl font-medium text-white text-[12px] invisible group-hover/copy:visible">
              Menu
            </span>
          </div>
          {menuIco == "menu" && (
            <div className="absolute top-12 bg-slate-900 py-[16px] w-[88%] z-50 px-3 rounded-xl invisible group-hover/item:visible">
              <div className="flex items-center py-[6px] hover:bg-slate-800 rounded-lg cursor-pointer">
                <img src="/images/assets/copy.svg" className="mx-2" />
                <span className="font-medium text-slate-100 text-[12px]">
                  Copy PNG
                </span>
              </div>
              <div
                className="flex items-center py-[6px] hover:bg-slate-800 rounded-lg my-3 cursor-pointer"
                onClick={saveFile}
              >
                <img src="/images/assets/downPng.svg" className="mx-2" />
                <span className="font-medium text-slate-100 text-[12px]">
                  Download PNG
                </span>
              </div>
              <div
                className="flex items-center py-[6px] hover:bg-slate-800 rounded-lg cursor-pointer"
                onClick={() => navigator.clipboard.writeText(image)}
              >
                <img src="/images/assets/copyLink.svg" className="mx-2" />
                <span className="font-medium text-slate-100 text-[12px]">
                  Copy Link
                </span>
              </div>
            </div>
          )}
          {menuIco == "save" && (
            <div className="absolute top-12 bg-slate-900 py-[16px] w-[88%] z-50 px-3 rounded-xl invisible group-hover/item:visible">
              <div className="flex items-center py-[6px] hover:bg-slate-800 rounded-lg mb-2 cursor-pointer">
                <img
                  src="/images/assets/publicIcon.svg"
                  className="mx-1 mr-2"
                />
                <span className="font-medium text-slate-100 text-[12px] mr-2">
                  Public Collection 2
                </span>
              </div>
              <div className="flex items-center py-[6px] hover:bg-slate-800 rounded-lg mb-2 cursor-pointer">
                <img
                  src="/images/assets/publicIcon.svg"
                  className="mx-1 mr-2"
                />
                <span className="font-medium text-slate-100 text-[12px] mr-2">
                  Public Collection 2
                </span>
              </div>
              <div className="flex items-center py-[6px] hover:bg-slate-800 rounded-lg mb-2 cursor-pointer">
                <img
                  src="/images/assets/privateIcon.svg"
                  className="mx-1 mr-2"
                />
                <span className="font-medium text-slate-100 text-[12px] mr-2">
                  Private Collection
                </span>
              </div>
              <span className="flex items-center justify-center py-2 bg-slate-800 rounded-2xl font- text-[12px] mt-3 text-slate-100">
                Create Collection
              </span>
            </div>
          )}
        </div>
        <div className="absolute w-[100%] top-16 flex justify-center drop-shadow-xl z-10">
          <span className="bg-slate-900 flex items-center justify-center py-[2px] px-[6px] rounded-2xl font-medium text-white text-[12px] cursor-pointer invisible group-hover/menu:visible ">
            Copy Image
          </span>
        </div>

        <div className="w-full rounded-2xl overflow-hidden min-720:gap-16 ">
          <BlurImage platform={1} src={image} />
        </div>
      </motion.div>
    </div>
  );
};

const HoverScreen = ({ images, app }: HoverScreenProps) => {
  // const [randomImages, setRandomImages] = useState<string[]>([""]);

  // useEffect(() => {
  //   setRandomImages(shuffle(images));
  // }, [images]);

  const toStorageUrl = (pathname: string) =>
    process.env.NEXT_PUBLIC_SUPABASE_URL +
    "/storage/v1/object/public/application/icons/" +
    pathname;
  if (!app) {
    return null;
  }
  return (
    <div className="flex justify-center items-center relative group/item cursor-pointer">
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.4 },
        }}
      >
        <div className="w-full rounded-2xl overflow-hidden min-720:gap-16 transform duration-500 border-[0px] hover:border-[3px] border-transparent hover:border-slate-300">
          <ImageHover app={app} images={images} />

          <div className="absolute w-[100%] bottom-3 flex justify-start items-center drop-shadow-xl opacity-0 transform transition duration-500 group-hover/item:opacity-100 z-20">
            <Image
              className="h-[15%] w-[15%] ml-[4%] rounded-full"
              width={48}
              height={48}
              src={app ? toStorageUrl(app.icon) : ""}
              alt="icon"
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
  const toStorageUrl = (pathname: string) =>
    process.env.NEXT_PUBLIC_SUPABASE_URL +
    "/storage/v1/object/public/application/screens/" +
    pathname;
  // console.log(toStorageUrl)
  if (!app) {
    return null;
  }
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
        <BlurImage
          platform={1}
          src={toStorageUrl(app.id + "/" + images[currentImage])}
        />
      )}
    </div>
  );
};

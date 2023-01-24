import { AppProps } from "next/app";
import Image from "next/image";
import { useEffect, useState } from "react";
import Background from "../backgound";
// import Navigation from "../navigation";

function AuthLayout({ children }: { children: React.ReactNode }) {
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
  }, [currentImage]);

  return (
    <div className="min-h-full bg-gradient-to-r from-[#0D1018] to-[#09132E]">
      <main className="flex lg:flex-row flex-col h-[calc(100vh-60px)] overflow-hidden lg:rounded-tl-3xl">
        <div className="z-10 flex-1 flex flex-col justify-center px-4">
          {children}
        </div>
        <div className="relative lg:block lg:w-0 w-full mx-auto lg:flex-1 flex-auto sm:ml-5">
          <Image
            className="absolute top-20 right-0 h-full object-contain z-10 lg:pt-24"
            src="/images/hand/hand.png"
            fill
            alt=""
          />
          {images[currentImage] && (
            <Image
              className="absolute inset-0 object-contain h-full lg:pt-24"
              src={images[currentImage]}
              fill
              alt=""
            />
          )}
        </div>
      </main>
      <Background />
    </div>
  );
}
export default AuthLayout;

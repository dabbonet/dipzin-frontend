import { AppProps } from "next/app";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navigation from "../navigation";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "",
    "/images/screen-1.png",
    "/images/screen-2.png",
    "/images/screen-3.png",
    "/images/screen-4.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="min-h-full bg-[url('/images/auth_bg.jpg')] bg-cover bg-slate-900">
      <Navigation />
      <main className="flex lg:flex-row flex-col h-[calc(100vh-74px)] overflow-auto lg:rounded-tl-3xl">
        <div className="flex-1 flex flex-col justify-center items-center px-4 lg:px-20 xl:px-24">
          {children}
        </div>
        <div className="relative lg:block lg:w-0 w-full mx-auto lg:flex-1 flex-auto sm:ml-5">
          {images[currentImage] && (
            <Image
              className="absolute inset-0 object-contain z-10 h-full lg:pt-24"
              src={images[currentImage]}
              fill
              alt=""
            />
          )}
          <Image
            className="absolute inset-0 h-full object-contain lg:pt-24"
            src="/images/auth.png"
            fill
            alt=""
          />
        </div>
      </main>
    </div>
  );
}
export default AuthLayout;

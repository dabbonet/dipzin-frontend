import Image from "next/image";
import { useState } from "react";
import cn from "../helpers";

type Image = {
  platform: number;
  src: string;
};

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

const BlurImage = ({ src, platform }: Image) => {
  const [isLoading, setLoading] = useState(true);

  if (platform == 1 || platform == 2) {
    return (
      <Image
        alt=""
        src={src}
        width={428}
        height={926}
        className={cn(
          "ease-in-out",
          isLoading ? "blur-xl scale-150" : "blur-0 scale-100"
        )}
        placeholder="blur"
        blurDataURL={rgbDataURL(30, 41, 59)}
        onLoadingComplete={() => setLoading(false)}
        quality={60}
        loading="lazy"
      />
    );
  } else {
    return (
      <Image
        alt=""
        src={src}
        width={926}
        height={570}
        loading="lazy"
        className={cn(
          "ease-in-out bg-slate-800 h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300",
          isLoading ? "blur-xl scale-150" : "blur-0 scale-100"
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    );
  }
};
export default BlurImage;

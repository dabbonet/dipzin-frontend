import Image from "next/image";
import { useState } from "react";
import { rgbDataURL } from "../helpers";
import clsx from "clsx";

type Image = {
  platform: number;
  src: string;
};

const BlurImage = ({ src, platform }: Image) => {
  const [isLoading, setLoading] = useState(true);

  if (platform == 1 || platform == 2) {
    return (
      <Image
        alt=""
        src={src}
        width={428}
        height={926}
        className={clsx(
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
        className={clsx(
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
  }
};
export default BlurImage;

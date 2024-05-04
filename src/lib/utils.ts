import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(input));
}

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`


const toStorageUrl = (pathname: string) =>
  process.env.NEXT_PUBLIC_SUPABASE_URL +
  "/storage/v1/object/public/application/" +
  pathname;


function shuffle<T>(array: T[] = []) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}


const getAssetsURL = (src) => 'https://dipzin.s3.us-east-1.amazonaws.com/' + src

const platfroms = ['', 'android', 'ios', 'web']

const getPlatformById = (platform_id: string | number) => {
  let platform;
  if (typeof platform_id === `number`) {
    switch (platform_id) {
      case 1:
        platform = "android";
        break;
      case 2:
        platform = "ios";
        break;
      case 3:
        platform = "web";
        break;
    }
    return platform;
  }
  if (typeof platform_id === `string`) {
    switch (platform_id) {
      case 'android':
        platform = 1;
        break;
      case 'ios':
        platform = 2;
        break;
      case 'web':
        platform = 3;
        break;
    }
    return platform;
  }
};

export { rgbDataURL, toStorageUrl, shuffle, getAssetsURL, platfroms, getPlatformById }
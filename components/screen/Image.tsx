import Image from 'next/image';
import { useState } from 'react';
import cn from '../helpers';

type Image = {
    platform: number
    src: string
}


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
                    'ease-in-out bg-slate-800 h-full w-full',
                    isLoading
                        ? 'blur-xl scale-150'
                        : 'blur-0 scale-100'
                )}
                onLoadingComplete={() => setLoading(false)}
            />
        )
    } else {
        return (
            <Image
                alt=""
                src={src}
                width={926}
                height={570}
                className={cn(
                    'ease-in-out bg-slate-800 h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300',
                    isLoading
                        ? 'blur-xl scale-150'
                        : 'blur-0 scale-100'
                )}
                onLoadingComplete={() => setLoading(false)}
            />
        )
    }
}
export default BlurImage
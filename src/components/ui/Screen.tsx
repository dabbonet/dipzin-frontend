import { FC, forwardRef } from 'react'
import Image from 'next/image'
import { rgbDataURL } from '@/lib/utils'
import { usePlatform } from '@/lib/platforms'

interface ScreenProps {
    src: any
    className?: any
    quality?: number
}

const Screen: FC<ScreenProps> = forwardRef(({ src, ...props }, ref) => {
    const { selected } = usePlatform();

    switch (selected) {
        case 3: {
            return (
                <Image
                    alt=""
                    src={src}
                    width={926}
                    height={570}
                    placeholder="blur"
                    blurDataURL={rgbDataURL(30, 41, 59)}
                    // onLoadingComplete={() => setLoading(false)}
                    quality={60}
                    loading="lazy"
                    {...props}
                />
            )
        }
        default: {
            return (
                <Image
                    alt=""
                    src={src}
                    width={428}
                    height={926}
                    placeholder="blur"
                    blurDataURL={rgbDataURL(30, 41, 59)}
                    // onLoadingComplete={() => setLoading(false)}
                    quality={30}
                    loading="lazy"
                    {...props}
                />
            )
        }

    }
})

Screen.displayName = "Screen"
export default Screen
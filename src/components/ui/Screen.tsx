import { FC } from 'react'
import Image from 'next/image'
import { rgbDataURL } from '@/lib/utils'
import { usePlatform } from '@/lib/platforms'

interface ScreenProps {
    src: any
}

const Screen: FC<ScreenProps> = ({ src }) => {
    const { selected } = usePlatform();

    switch (selected) {
        case 3: {
            return (
                <Image
                    alt=""
                    src={src}
                    width={926}
                    height={570}
                    className="ease-in-out"
                    placeholder="blur"
                    blurDataURL={rgbDataURL(30, 41, 59)}
                    // onLoadingComplete={() => setLoading(false)}
                    quality={60}
                    loading="lazy"
                    unoptimized
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
                    className="ease-in-out"
                    placeholder="blur"
                    blurDataURL={rgbDataURL(30, 41, 59)}
                    // onLoadingComplete={() => setLoading(false)}
                    quality={60}
                    loading="lazy"
                />
            )
        }

    }
}
export default Screen
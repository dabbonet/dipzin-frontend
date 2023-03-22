import { FC } from 'react'
import Image from 'next/image'
import { rgbDataURL } from '@/lib/utils'

interface ScreenProps {
    src: any
}

const Screen: FC<ScreenProps> = ({ src }) => {
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

export default Screen
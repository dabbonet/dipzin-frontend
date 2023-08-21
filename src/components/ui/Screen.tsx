import { FC, forwardRef } from 'react'
import Image from 'next/image'
import { cn, rgbDataURL } from '@/lib/utils'
import { usePlatform } from '@/context/usePlatforms'

interface ScreenProps {
    src?: string
    className?: string | undefined
    quality?: number
}

const Screen: FC<ScreenProps> = forwardRef(({ src, ...props }, ref) => {
    const { selected } = usePlatform();

    switch (selected) {
        case 3: {
            return (
                <Image
                    title="screenshot"
                    alt="screenshot"
                    src={src}
                    width={926}
                    height={570}
                    // placeholder="blur"
                    // blurDataURL={rgbDataURL(9, 16, 33)}
                    // onLoadingComplete={() => setLoading(false)}
                    quality={30}
                    loading="lazy"
                    {...props}
                    className={cn('bg-slate-900/80', props.className)}
                />
            )
        }
        default: {
            return (
                <Image
                    title="screenshot"
                    alt="screenshot"
                    src={src}
                    width={428}
                    height={926}
                    // placeholder="blur"
                    // blurDataURL={rgbDataURL(9, 16, 33)}
                    // onLoadingComplete={() => setLoading(false)}
                    quality={30}
                    loading="lazy"
                    {...props}
                    className={cn('bg-slate-900/80', props.className)}
                />
            )
        }

    }
})

Screen.displayName = "Screen"
export default Screen
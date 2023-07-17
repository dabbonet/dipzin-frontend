'use client'
import { usePathname } from "next/navigation";

const Banner = () => {
    const path = usePathname();
    const showPaths = ['/ios', '/android', '/web', '/search']
    if (!showPaths.includes(path)) return
    return (
        <div className="mx-auto rounded-[42px] max-w-[92%]">
            <img
                className="h-auto w-full"
                src="/images/assets/banner.png"
                alt="banner"
            />
        </div>
    )
}

export default Banner
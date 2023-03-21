const Background = () => {
    return (
        <div className='fixed top-0 -z-10 w-full h-full overflow-hidden'>
            {/* Noise */}
            <svg className="fixed top-0 contrast-[10] w-full h-full" xmlns='http://www.w3.org/2000/svg' opacity={0.07}>
                <filter id='noiseFilter'>
                    <feTurbulence
                        type='fractalNoise'
                        baseFrequency='3.5'
                        numOctaves='1'
                        stitchTiles='stitch' />
                </filter>

                <rect width='100%' height='100%' filter='url(#noiseFilter)' />
            </svg>

            {/* Blur Shape */}
            <svg className="fixed bottom-0 right-0 -z-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" version="1.1" opacity={0.60}>
                <defs>
                    <filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feGaussianBlur stdDeviation="76" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
                    </filter>
                </defs>
                <g filter="url(#bbblurry-filter)">
                    <ellipse rx="200" ry="200" cx="613.6625144264915" cy="320" fill="#102a71"></ellipse>
                </g>
            </svg>
        </div>)
}

export default Background
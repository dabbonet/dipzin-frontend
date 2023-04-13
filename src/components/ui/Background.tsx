const Background = () => {
    return (
        <div className='fixed top-0 -z-10 w-full h-full overflow-hidden'>
            {/* Noise */}
            <svg className="top-0 contrast-[10] w-full h-full fixed dark:opacity-[0.07] " xmlns='http://www.w3.org/2000/svg'>
                <filter id='noiseFilter'>
                    <feTurbulence
                        type='fractalNoise'
                        baseFrequency='6.5'
                        numOctaves='1'
                        stitchTiles='stitch' />
                    <feSpecularLighting className="dark:hidden" surfaceScale="8" specularConstant="0.1" specularExponent="25" lightingColor="#2563EB" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
                        <feDistantLight azimuth="3" elevation="100"></feDistantLight>
                    </feSpecularLighting>
                </filter>

                <rect width='100%' height='100%' filter='url(#noiseFilter)' />
            </svg>


            {/* Blur Shape */}
            <svg className="fixed bottom-0 right-0 -z-20 opacity-[0.2] dark:opacity-[0.2] text-blue-500 dark:text-blue-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" version="1.1">
                <defs>
                    <filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feGaussianBlur stdDeviation="76" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
                    </filter>
                </defs>
                <g filter="url(#bbblurry-filter)">
                    <ellipse rx="200" ry="200" cx="613.6625144264915" cy="320" fill="currentColor"></ellipse>
                </g>
            </svg>
        </div>
    )
}

export default Background
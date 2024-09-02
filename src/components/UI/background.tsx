import React from 'react';

export function Background() {
  return (
    <div className="fixed inset-0 -z-50">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g clipPath="url(#clip0_2605_44504)">
          <rect width="1920" height="1080" fill="#030304" />
          <g style={{ opacity: 0.6 }}>
            <g filter="url(#filter0_f_2605_44504)">
              <circle cx="553.5" cy="470.5" r="235.5" fill="hsl(202, 85%, 50%)" />
            </g>
            <g filter="url(#filter1_f_2605_44504)">
              <circle cx="1382.5" cy="844.5" r="235.5" fill="hsl(223, 70%, 35%)" />
            </g>
          </g>
        </g>
        <defs>
          <filter id="filter0_f_2605_44504" x="-286" y="-369" width="1679" height="1679" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="400" result="effect1_foregroundBlur_2605_44504" />
          </filter>
          <filter id="filter1_f_2605_44504" x="543" y="5" width="1679" height="1679" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="400" result="effect1_foregroundBlur_2605_44504" />
          </filter>
          <clipPath id="clip0_2605_44504">
            <rect width="1920" height="1080" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

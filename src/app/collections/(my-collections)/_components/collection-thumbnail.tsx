import React from 'react';
import Image from 'next/image';
import type { CollectionType } from '../types';

const CollectionThumbnail: React.FC<{ screens: CollectionType['screens'] }> = ({ screens }) => {
  const showcaseScreens = screens.filter((screen) => screen.is_showcase);
  const displayedScreens = showcaseScreens.length > 0 ? showcaseScreens : screens;

  const mobileScreens = displayedScreens.filter((screen) => ['ios', 'android'].includes(screen.platform));
  const webScreens = displayedScreens.filter((screen) => screen.platform === 'web');

  if (mobileScreens.length === screens.length) {
    // All screens are mobile
    return (
      <div className="relative w-full h-[450px] flex items-center justify-center">
        {mobileScreens.slice(0, 2).map((screen, index) => (
          <div
            key={screen.id}
            className={`absolute transition-transform duration-300 ${
              index === 0 ? '-translate-x-1/3' : 'translate-x-1/3 -translate-y-1/4'
            }`}
          >
            <Image
              src={screen.screen.imgSrc}
              alt={`Mobile screen ${index + 1}`}
              width={150}
              height={300}
              className="rounded-[23.926px] border-2 border-slate-400 shadow-collection-thumbnail"
            />
          </div>
        ))}
      </div>
    );
  } if (webScreens.length === screens.length) {
    // All screens are web
    const webScreen = webScreens[0];
    return (
      <div className="size-full px-4 flex items-center justify-center">
        <Image
          src={webScreen?.screen?.imgSrc || ''}
          alt="Web screen"
          width={350}
          height={200}
          className="rounded-[23.926px] border-2 border-slate-400 shadow-collection-thumbnail size-full max-w-[350px] max-h-[200px]"
        />
      </div>
    );
  }
  // Mixed platforms
  const mobileScreen = mobileScreens[0];
  const webScreen = webScreens[0];
  return (
    <div className="w-full h-[250px] flex px-4 items-center justify-center">
      <div className="relative size-full max-w-[250px] max-h-[200px]">
        {webScreen && webScreen.screen && (
        <Image
          src={webScreen.screen.imgSrc}
          alt="Web screen"
          width={300}
          height={250}
          className="rounded-[23.926px] border-2 border-slate-400 shadow-collection-thumbnail size-full"
        />
        )}
        {mobileScreen && (
        <Image
          src={mobileScreen.screen.imgSrc}
          alt="Mobile screen"
          width={100}
          height={200}
          className="rounded-[23.926px] border-2 border-slate-400 shadow-collection-thumbnail absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 z-10"
        />
        )}
      </div>
    </div>
  );
};

export default CollectionThumbnail;

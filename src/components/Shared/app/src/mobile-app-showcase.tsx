import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Shared/avatar';
import { Button } from '@/components/Shared/button';
import { Icon } from '@/components/UI/icon';
import { extractInitials } from '@/utils/StringUtils';
import { DialogClose } from '@/components/UI/dialog';
import type { AppType } from '@/types/app-types';
import { storage } from '@/utils/storage';
import { DownloadButton } from '../../button/DownloadButton';
import { Checkbox } from '@/components/UI/checkbox';
import { Dropdown } from '../../dropdown';
import { DropdownMenuItem } from '@/components/UI/dropdown-menu';
import useEmblaCarousel from 'embla-carousel-react';
import { Screen } from '../../screen';

const MobileAppShowcase = ({ app }: { app: AppType }) => {
  const isWeb = app.platform === 'web';
  const [currentScreen, setCurrentScreen] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const handleCopyLink = () => {
    const url = app.screens?.[currentScreen]?.screen
      ? storage(app.screens[currentScreen].screen.hash + app.screens[currentScreen].screen.ext)
      : '';
    navigator.clipboard.writeText(url);
  };

  const handleSelect = useCallback(() => {
    if (emblaApi) {
      setCurrentScreen(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', handleSelect);
    handleSelect();
    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi, handleSelect]);

  return (
    <div className="flex flex-col items-center justify-between w-screen h-screen gap-2 py-4 pl-0">
      <div className="h-fit w-full flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src={app.icon ? storage(app.icon.hash + app.icon.ext) : ''} alt={app.name} />
            <AvatarFallback>{extractInitials(app.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-medium text-white">{app.name}</h3>
            <p className="text-sm text-gray-400">{app.tag_line}</p>
          </div>
        </div>
        <DialogClose>
          <Icon.Close className="size-6" />
        </DialogClose>
      </div>

      <div className={`flex ${isWeb ? "w-full h-fit flex-col-reverse" : "size-full flex-row"} items-center pl-4 gap-2`}>
        <div className={`relative flex ${isWeb ? "w-full h-fit" : "size-full"} `}>
          <div ref={emblaRef} className={`${isWeb ? "w-full h-fit" : "size-full"} `}>
            <div className="flex size-full ">
              {app.screens?.map((screen) => (
                <div key={screen.id} className={`size-full flex my-auto ${isWeb ? "flex-[0_0_90%]" : "flex-[0_0_90%]"}`}>
                  <Screen className={`w-fit flex my-auto mx-1 ${isWeb ? "w-full h-fit" : "h-full max-h-[80vh]"}`} borderless screen={{ ...screen, app: { ...app } }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={`flex ${isWeb ? "flex-row" : "flex-col pr-2"} gap-4 z-50`}>
          <DownloadButton
            url={app.screens?.[currentScreen]?.screen
              ? storage(app.screens[currentScreen].screen.hash + app.screens[currentScreen].screen.ext)
              : ''}
            then={<Checkbox checked className="size-5" />}
            className="rounded-full"
            size="sm"
            variant="darkGray"
            isIconOnly
          >
            <Icon.Download className="size-5" />
          </DownloadButton>
          <Dropdown
            trigger={(
              <Button className="rounded-full" size="sm" variant="darkGray" isIconOnly>
                <Icon.Dots className="size-6" />
              </Button>
            )}
            content={(
              <DropdownMenuItem onClick={handleCopyLink}>
                <Icon.Link className="size-6" />
                Copy Link
              </DropdownMenuItem>
            )}
            placement="end"
          />
        </div>
      </div>

      <div className="w-full h-fit flex justify-center px-4">
        {app.screens?.map((_, index) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            variant="ghost"
            className={`size-2.5 p-0 aspect-square shrink-0 rounded-full mx-1 transition-colors ${index === currentScreen ? 'bg-aqua-600' : 'bg-slate-800'}`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileAppShowcase;

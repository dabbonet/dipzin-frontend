import { Avatar, AvatarImage, AvatarFallback } from '@/components/Shared/avatar';
import { DialogClose } from '@/components/UI/dialog';
import { storage } from '@/utils/storage';
import type { ScreenData } from '@/types/screen-types';
import { Icon } from '@/components/UI/icon';

interface MobileHeaderProps {
  screen: ScreenData;
}

export const MobileHeader = ({ screen }: MobileHeaderProps) => (
  <div className="w-full h-fit flex justify-between items-center p-4">
    <div className="flex items-center gap-3">
      <Avatar className="size-12">
        <AvatarImage
          src={storage((screen.app.icon.hash ?? '') + (screen.app.icon.ext ?? ''))}
          alt={screen.app.name}
        />
        <AvatarFallback>{screen.app.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-xl font-medium text-white">{screen.app.name}</h3>
        <p className="text-sm text-gray-400">{screen.app.tag_line}</p>
      </div>
    </div>
    <DialogClose>
      <Icon.Close className="size-5" />
    </DialogClose>
  </div>
);

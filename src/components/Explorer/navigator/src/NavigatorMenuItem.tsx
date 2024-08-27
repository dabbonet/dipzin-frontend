import { Icon } from "@/components/UI/icon";
import { cn } from "@/lib/utils";
import { extractInitials } from "@/utils/StringUtils";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Shared/avatar';
import Image from 'next/image';

type IconType = {
  imgSrc: string;
  width: number;
  height: number;
};

type MenuItemProps = {
  label: string;
  icon?: IconType;
  avatar?: string;
  showArrow?: boolean;
  isSelected?: boolean;
  onClick: () => void;
  isSearchResult?: boolean; // Added prop for conditional padding
};

const NavigatorMenuItem: React.FC<MenuItemProps> = ({
  label, icon, avatar, showArrow = false, isSelected = false, onClick, isSearchResult = false
}) => (
  <button
    className={cn("w-full rounded-2xl flex items-center justify-between hover:bg-slate-700 transition-colors", isSelected ? 'bg-[#2A3343]' : '', isSearchResult ? 'p-4' : 'p-6')}
    onClick={onClick}
    type="button"
  >
    <div className={cn("flex items-center", isSearchResult ? 'gap-3' : 'gap-4')}>
      {avatar ? (
        <Avatar size="default">
          <AvatarImage src={avatar} alt={label} />
          <AvatarFallback>{extractInitials(label)}</AvatarFallback>
        </Avatar>
      ) : null}
      {icon ? (
        <Image src={icon.imgSrc} alt={label} width={icon.width ?? 32} height={icon.height ?? 32} />
      ) : null}
      <span className="text-2xl text-start whitespace-nowrap truncate font-medium">{label}</span>
    </div>
    {showArrow && <Icon.ChevronRight className="size-5 text-white" />}
  </button>
);

export default NavigatorMenuItem;

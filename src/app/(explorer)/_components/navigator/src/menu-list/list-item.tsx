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
  description?: string;
  icon?: IconType;
  avatar?: string;
  showArrow?: boolean;
  isSelected?: boolean;
  onClick: () => void;
  isSearchResult?: boolean; // Added prop for conditional padding
};

export const NavigatorMenuItem: React.FC<MenuItemProps> = ({
  label, description, icon, avatar, showArrow = false, isSelected = false, onClick, isSearchResult = false
}) => (
  <button
    className={cn("w-full rounded-2xl flex items-center justify-between transition-colors hover:text-white/80", isSelected ? 'bg-slate-700' : '', isSearchResult ? 'p-4' : 'p-6')}
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
      <div className="flex flex-col items-start">
        <span title={label} className="text-xl text-start whitespace-nowrap truncate font-medium">{label}</span>
        {description && <span className="text-sm text-start text-white/60">{description}</span>}
      </div>
    </div>
    {showArrow && <Icon.ChevronRight className="size-5 text-white" />}
  </button>
);

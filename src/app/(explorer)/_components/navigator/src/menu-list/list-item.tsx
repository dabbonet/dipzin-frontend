import { Icon } from "@/components/UI/icon";
import { cn } from "@/lib/utils";
import { extractInitials } from "@/utils/StringUtils";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/Shared/avatar";
import Image from "next/image";

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
  onMouseEnter?: () => void;
  isSearchResult?: boolean; // Added prop for conditional padding
  onClick?: () => void;
};

export const NavigatorMenuItem: React.FC<MenuItemProps> = ({
  label,
  description,
  icon,
  avatar,
  showArrow = false,
  onMouseEnter,
  isSearchResult = false,
  onClick,
}) => (
  <button
    key={`search-result-${label}`}
    className={cn(
      "w-full rounded-2xl flex items-center justify-between transition-colors bg-[#1A2333] md:bg-transparent hover:text-white/80 hover:bg-slate-700/60",
      isSearchResult ? "p-4" : "p-4",
    )}
    onMouseEnter={onMouseEnter}
    onClick={onClick}
    type="button"
  >
    <div
      className={cn(
        "flex flex-col md:flex-row items-center justify-center md:justify-start w-full",
        isSearchResult ? "gap-3" : "gap-4",
      )}
    >
      {avatar ? (
        <Avatar size="medium">
          <AvatarImage src={avatar} alt={label} />
          <AvatarFallback>{extractInitials(label)}</AvatarFallback>
        </Avatar>
      ) : null}
      {icon ? (
        <Image
          src={icon.imgSrc}
          alt={label}
          width={icon.width ?? 32}
          height={icon.height ?? 32}
        />
      ) : null}
      <div className="flex flex-col text-center sm:text-start items-center sm:items-start">
        <span
          title={label}
          className="text-sm md:text-lg xl:text-base 2xl:text-xl whitespace-nowrap truncate font-medium"
        >
          {label}
        </span>
        {description && (
          <span className="text-xs text-white/60 xl:text-xs 2xl:text-sm">
            {description}
          </span>
        )}
      </div>
    </div>
    {showArrow && <Icon.ChevronRight className="size-5 text-white" />}
  </button>
);

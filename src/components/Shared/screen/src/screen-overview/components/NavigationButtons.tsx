import { Button } from '@/components/Shared/button';
import { Icon } from '@/components/UI/icon';

interface NavigationButtonsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
}

export const NavigationButtons = ({
  onPrevClick,
  onNextClick,
  prevDisabled,
  nextDisabled
}: NavigationButtonsProps) => (
  <>
    <Button
      className="absolute hidden md:flex -left-20 bottom-0 -translate-y-full size-16 transition-all rounded-full p-4"
      variant="liteGray"
      isIconOnly
      disabled={prevDisabled}
      onClick={onPrevClick}
    >
      <Icon.ChevronLeft className="size-6" />
    </Button>
    <Button
      className="absolute hidden md:flex -right-20 bottom-0 -translate-y-full size-16 transition-all rounded-full p-4"
      variant="liteGray"
      isIconOnly
      disabled={nextDisabled}
      onClick={onNextClick}
    >
      <Icon.ChevronRight className="size-6" />
    </Button>
  </>
);

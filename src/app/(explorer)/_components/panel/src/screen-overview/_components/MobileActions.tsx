import { Button } from "@/components/Shared/button";
import { Icon } from "@/components/UI/icon";

export const MobileActions = () => (
  <div className="flex flex-col gap-4 fixed right-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50">
    <Button className="p-2 rounded-full hidden md:flex" variant="darkGray" isIconOnly>
      <Icon.Copy className="size-5" />
    </Button>
    <Button className="p-2 rounded-full" variant="darkGray" isIconOnly>
      <Icon.Download className="size-5" />
    </Button>
    <Button className="p-2 rounded-full" variant="darkGray" isIconOnly>
      <Icon.Dots className="size-5" />
    </Button>
  </div>
);

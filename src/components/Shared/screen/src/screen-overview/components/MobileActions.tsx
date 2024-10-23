import { Button } from "@/components/Shared/button";
import { Icon } from "@/components/UI/icon";

export const MobileActions = () => (
  <div className="flex flex-col gap-4 absolute -right-3 top-1/2 -translate-y-1/2">
    <Button className="p-2 rounded-full" variant="darkGray" isIconOnly>
      <Icon.Copy2 className="size-5" />
    </Button>
    <Button className="p-2 rounded-full" variant="darkGray" isIconOnly>
      <Icon.Download className="size-5" />
    </Button>
    <Button className="p-2 rounded-full" variant="darkGray" isIconOnly>
      <Icon.EllipsisHorizontal className="size-5" />
    </Button>
  </div>
);

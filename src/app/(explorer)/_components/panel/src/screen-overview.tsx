import { Screen } from "@/components/Shared/screen";
import { ScreenDetails } from "@/components/Shared/screen/src/screen-details";
import { Tabs } from "@/components/UI/tabs";
import type { ScreenData } from "@/types/screen-types";
import Image from "next/image";

type ScreenOverviewProps = {
  screen: ScreenData;
};

const ScreenOverview = ({ screen }: ScreenOverviewProps) => {
  const isWeb = screen.platform === "web";

  return (
    <Tabs className="flex flex-col items-center justify-center relative pt-[7vh]">
      {/* Keep the container relative for absolute positioning of ScreenDetails */}
      <div className="fixed top-0">
        <ScreenDetails data={screen} type={isWeb ? "wide" : "default"} />
      </div>
      <Screen />
      <Image width={isWeb ? 1000 : 300} height={isWeb ? 600 : 650} src={screen.screen.url} alt={`${screen.app.name} screen shot`} className="rounded-2xl" />
    </Tabs>
  );
};

export default ScreenOverview;

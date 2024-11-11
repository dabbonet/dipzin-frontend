import React from "react";
import Image from "next/image";
import { storage } from "@/utils/storage";
import type { ScreenData } from "@/types/screen-types";

interface FullScreenProps {
  currentScreen: ScreenData;
}

const FullScreen = ({ currentScreen }: FullScreenProps) => (
  <div className="w-full h-[60vh] rounded-3xl overflow-y-scroll">
    <Image
      src={storage(
        `${currentScreen.screen.hash}${currentScreen.screen.ext}`
      )}
      alt={`${currentScreen.app.name} screen`}
      width={currentScreen.screen.width}
      height={currentScreen.screen.height}
      className="w-full h-auto bg-black-950 rounded-3xl"
    />
  </div>
);

export default FullScreen;

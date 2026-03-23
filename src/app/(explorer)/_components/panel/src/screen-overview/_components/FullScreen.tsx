import React from "react";
import Image from "next/image";
import { storage } from "@/utils/storage";
import type { ScreenData } from "@/types/screen-types";

interface FullScreenProps {
  currentScreen: ScreenData;
}

const FullScreen = ({ currentScreen }: FullScreenProps) => {
  // Handle missing screen or app data
  if (!currentScreen.screen) {
    return (
      <div className="w-full h-[60vh] rounded-3xl bg-slate-800 flex items-center justify-center">
        <p className="text-slate-400">No screen preview available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[60vh] rounded-3xl overflow-y-scroll">
      <Image
        src={storage(
          `${currentScreen.screen.hash}${currentScreen.screen.ext}`
        )}
        alt={currentScreen.app?.name ? `${currentScreen.app.name} screen` : 'Screen preview'}
        width={currentScreen.screen.width}
        height={currentScreen.screen.height}
        className="w-full h-auto bg-black-950 rounded-3xl"
      />
    </div>
  );
};

export default FullScreen;

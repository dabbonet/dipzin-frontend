"use client";

import { createContext, FC, useContext, useState } from "react";

interface Platform {
  id: number;
  name: string;
}

interface PlatformContextInterface {
  platforms: Platform[]
  selected: number
  setSelected: (selected: number) => void
  setPlatforms: (ids: any) => void
  singleApp: boolean
  setSingleApp: (single: boolean) => void
}

const PlatformContext = createContext<PlatformContextInterface>(null!);

export const usePlatform = () => useContext(PlatformContext);

const PlatformProvider: FC<any> = ({ children }) => {
  const allPlatforms: Platform[] = [
    {
      id: 1,
      name: "Android",
    },
    {
      id: 2,
      name: "IOS",
    },
    {
      id: 3,
      name: "Web",
    },
  ];
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [selected, setSelected] = useState<number>(2);
  const [singleApp, setSingleApp] = useState<boolean>(false);

  const setPlatformsWithIds = (ids: number[]) => {

    const selectedPlatforms = ids.map((id) =>
      allPlatforms.find((platform) => platform.id === id)
    );

    setPlatforms(
      selectedPlatforms
    );
  };

  return (
    <PlatformContext.Provider
      value={{
        platforms,
        selected,
        setSelected,
        setPlatforms: setPlatformsWithIds,
        singleApp,
        setSingleApp,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export default PlatformProvider;



"use client";

import { createContext, FC, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface Platform {
  id: number;
  name: string;
}

interface PlatformContextInterface {
  platforms: Platform[];
  selected: number;
  setSelected: (selected: number) => void;
  setPlatforms: (ids: any) => void;
  singleApp: string;
  setSingleApp: (single: string) => void;
  slug: any;
  isMobile: boolean;
}

const PlatformContext = createContext<PlatformContextInterface>(null!);

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
  const [selected, setSelected] = useState<number>(0);
  const [singleApp, setSingleApp] = useState<string>("");

  const setPlatformsWithIds = (ids: number[]) => {
    const selectedPlatforms = ids.map((id) =>
      allPlatforms.find((platform) => platform.id === id)
    );

    setPlatforms(selectedPlatforms);
  };

  const slug = () => {
    const platform = platforms.find((el) => el.id === selected);
    return platform ? platform.name.toLocaleLowerCase() : "";
  };

  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <PlatformContext.Provider
      value={{
        platforms,
        selected,
        setSelected,
        setPlatforms: setPlatformsWithIds,
        singleApp,
        setSingleApp,
        slug,
        isMobile,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export default PlatformProvider;

export const usePlatform = () => useContext(PlatformContext);

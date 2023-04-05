"use client";

import { createContext, FC, useContext, useState } from "react";

interface Platform {
  id: number;
  name: string;
}

interface PlatformContextInterface {
  platforms: Platform[];
  selected?: number;
  setSelected: (selected: number) => void;
  setPlatforms: (ids: any) => void;
  singleApp: boolean;
  setSingleApp: (single: boolean) => void;
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
      selectedPlatforms.filter(
        (platform) => platform !== undefined
      ) as Platform[]
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

// Define a base class for all members
class Member {
  // Common properties for all members
  public name: string;
  public email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

// Define a subclass for free members, inheriting from the Member class
class FreeMember extends Member {
  // Properties specific to free members
  public downloadLimit: number = 5;

  downloadImage(): void {
    // Code to download an image for a free member
    this.downloadLimit--;
    console.log(
      `You have downloaded an image. You have ${this.downloadLimit} downloads remaining.`
    );
  }
}

// Define a subclass for paid members, inheriting from the Member class
class PaidMember extends Member {
  // No additional properties for paid members

  downloadImage(): void {
    // Code to download an image for a paid member
    console.log("You have downloaded an image. You have unlimited downloads.");
  }
}

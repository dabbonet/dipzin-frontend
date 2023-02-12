import * as React from "react";

type SetValue = (value: any) => void;

interface Platform {
  id: number;
  name: string;
}

interface GlobalContextInterface {
  platform: number;
  setPlatform: SetValue;
  availablePlatforms: Platform[];
  setAvailablePlatforms: SetValue;
}

export const GlobalContext = React.createContext<GlobalContextInterface | null>(
  null
);

const GlobalProvider: React.FC<any> = ({ children }) => {
  const [platform, setPlatform] = React.useState(2);
  const platforms = [
    {
      id: 2,
      name: "ios",
    },
    {
      id: 1,
      name: "android",
    },
    {
      id: 4,
      name: "web",
    },
  ];
  const [availablePlatforms, setAvailablePlatforms] = React.useState(platforms);

  return (
    <GlobalContext.Provider
      value={{
        platform,
        setPlatform,
        availablePlatforms,
        setAvailablePlatforms,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

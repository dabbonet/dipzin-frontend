import * as React from "react";

type SetValue = (value: any) => void;

interface GlobalContextInterface {
    platform: string;
    setPlatform: SetValue
    availablePlatforms: string[];
    setAvailablePlatforms: SetValue
}

export const GlobalContext = React.createContext<GlobalContextInterface | null>(null);

const GlobalProvider: React.FC<any> = ({ children }) => {
    const [platform, setPlatform] = React.useState('');
    const [availablePlatforms, setAvailablePlatforms] = React.useState(['ios', 'android', 'web']);

    return (
        <GlobalContext.Provider
            value={{
                platform,
                setPlatform,
                availablePlatforms,
                setAvailablePlatforms
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;

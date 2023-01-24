import * as React from "react";

type SetValue = (value: any) => void;

interface GlobalContextInterface {
    platform: string;
    setPlatform: SetValue
}

export const GlobalContext = React.createContext<GlobalContextInterface | null>(null);

const GlobalProvider: React.FC<any> = ({ children }) => {
    const [platform, setPlatform] = React.useState('');
    return (
        <GlobalContext.Provider
            value={{
                platform,
                setPlatform,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;

'use client'

import { createContext, FC, useState } from "react";

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
    show: boolean;
    setShow: SetValue;
    single: boolean;
    setSingle: SetValue;
}

export const GlobalContext = createContext<GlobalContextInterface | null>(
    null
);

const GlobalProvider: FC<any> = ({ children }) => {
    const [platform, setPlatform] = useState(2);
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
            id: 3,
            name: "web",
        },
    ];
    const [availablePlatforms, setAvailablePlatforms] = useState(platforms);
    const [show, setShow] = useState(false);
    const [single, setSingle] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                show,
                setShow,
                platform,
                setPlatform,
                availablePlatforms,
                setAvailablePlatforms,
                single, setSingle
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;

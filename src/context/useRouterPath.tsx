'use client'
import { createContext, useContext, useState } from 'react';



const RouterPath = createContext(null);

export const RouterPathProvider = ({ children }: { children: React.ReactNode }) => {
    const [routerPath, setRouterPath] = useState([])
    return (
        <RouterPath.Provider
            value={{
                routerPath,
                setRouterPath
            }}
        >
            {children}
        </RouterPath.Provider>
    );
};

export const useRouterPath = () => useContext(RouterPath);
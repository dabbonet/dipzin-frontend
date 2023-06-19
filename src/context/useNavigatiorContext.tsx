
import { createContext, useContext, useState } from 'react';



const NavigatorContext = createContext(null);

export const NavigatorContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [navigatorUi, setNavigatorUi] = useState('')
    return (
        <NavigatorContext.Provider
            value={{
                navigatorUi,
                setNavigatorUi
            
            }}
        >
            {children}
        </NavigatorContext.Provider>
    );
};

export const useNavigator = () => useContext(NavigatorContext);
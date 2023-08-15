
import { createContext, useContext, useState } from 'react';



const NavigatorContext = createContext(null);

export const NavigatorContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeView, setActiveView] = useState('')
    const [activeControls, setActiveControls] = useState('')
    return (
        <NavigatorContext.Provider
            value={{
                activeView,
                setActiveView,
                activeControls,
                setActiveControls

            }}
        >
            {children}
        </NavigatorContext.Provider>
    );
};

export const useNavigator = () => useContext(NavigatorContext);

import { createContext, useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';



const ResponsiveContext = createContext(null);

export const ResponsiveContextProvider = ({ children }: { children: React.ReactNode }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' }); // Up to 767px
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' }); // 768px to 1023px
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' }); // 1024px and above
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' }); // Retina screens
    return (
        <ResponsiveContext.Provider
            value={{
                isMobile,
                isTablet,
                isDesktop,
                isRetina
            }}
        >
            {children}
        </ResponsiveContext.Provider>
    );
};

export const useResponsive = () => useContext(ResponsiveContext);
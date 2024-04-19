import useDebounce from '@/lib/debounce';
import { createContext, useContext, useState } from 'react';



interface ContentDiscoveryState {
    streamData: any;
    setStreamData: (data: any) => void;
}

const defaultState: ContentDiscoveryState = {
    streamData: null,
    setStreamData: () => { },
};

const ContentDiscoveryContext = createContext<ContentDiscoveryState>(
    defaultState
);

export const ContentDiscoveryProvider = ({ children }: { children: React.ReactNode }) => {
    const [streamData, setStreamData] = useState([]);
    const [filters, setFilters] = useState([]);
    return (
        <ContentDiscoveryContext.Provider
            value={{
                streamData,
                setStreamData,
            }}
        >
            {children}
        </ContentDiscoveryContext.Provider>
    );
};

export const useContentDiscovery = () => useContext(ContentDiscoveryContext);
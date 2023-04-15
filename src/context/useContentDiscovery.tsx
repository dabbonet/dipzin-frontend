import useDebounce from '@/lib/debounce';
import { createContext, useContext, useState } from 'react';

type Filter = {
    tags: String[],
    categories: String[]
}

interface ContentDiscoveryState {
    streamData: any;
    setStreamData: (data: any) => void;
    filters: Filter | null;
    setFilters: (filters: Filter) => void;
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
}

const defaultState: ContentDiscoveryState = {
    streamData: null,
    setStreamData: () => { },
    filters: null,
    setFilters: () => { },
    searchKeyword: '',
    setSearchKeyword: () => { }
};

const ContentDiscoveryContext = createContext<ContentDiscoveryState>(
    defaultState
);

export const ContentDiscoveryProvider = ({ children }: { children: React.ReactNode }) => {
    const [streamData, setStreamData] = useState<any>(null);
    const [filters, setFilters] = useState<Filter>(null);
    const [searchKeyword, setSearchKeyword] = useState<string>('');

    return (
        <ContentDiscoveryContext.Provider
            value={{
                streamData,
                setStreamData,
                filters,
                setFilters,
                searchKeyword,
                setSearchKeyword
            }}
        >
            {children}
        </ContentDiscoveryContext.Provider>
    );
};

export const useContentDiscovery = () => useContext(ContentDiscoveryContext);
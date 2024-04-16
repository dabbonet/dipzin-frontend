// /search/context/SearchContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import useSearch from '../hooks/useSearch';

interface SearchContextType {
    searchData: any; // Define a more specific type based on your data structure
    isLoading: boolean;
    error: string | null;
    setSearchParams: (params: any) => void;
    resetSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { searchData, isLoading, error, setSearchParams, resetSearch } = useSearch();

    return (
        <SearchContext.Provider value={{ searchData, isLoading, error, setSearchParams, resetSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};

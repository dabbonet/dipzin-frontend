'use client';

import React, { createContext, useContext, useState } from 'react';
import { useSearch } from '@/hooks/useSearch';

interface SearchContextProps {
    openScreen: any | null;
    setOpenScreen: React.Dispatch<React.SetStateAction<any | null>>;
    data: any[];
    isLoading: boolean;
    loadMore: () => void;
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
    searchKeyword: string;
    setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [openScreen, setOpenScreen] = useState<any | null>(null);
    const { data, isLoading, loadMore, filters, setFilters } = useSearch();

    return (
        <SearchContext.Provider value={{ searchKeyword, setSearchKeyword, openScreen, setOpenScreen, data, isLoading, loadMore, filters, setFilters }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = (): SearchContextProps => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }

    return context;
}
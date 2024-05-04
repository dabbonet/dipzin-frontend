'use client';

import React, { createContext, useContext, useState } from 'react';
import { useSearch } from '@/hooks/useSearch';

interface SearchContextProps {
    openScreen: any | null;
    setOpenScreen: React.Dispatch<React.SetStateAction<any | null>>;
    data: any[];
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    isLoading: boolean;
    loadMore: () => void;
    searchKeyword: string;
    setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [openScreen, setOpenScreen] = useState<any | null>(null);
    const { data, setData, isLoading, loadMore, searchKeyword, setSearchKeyword, filters, setFilters } = useSearch();

    return (
        <SearchContext.Provider value={{ searchKeyword, setSearchKeyword, openScreen, setOpenScreen, data, setData, isLoading, loadMore, filters, setFilters }}>
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
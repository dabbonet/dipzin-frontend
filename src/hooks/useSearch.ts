// /search/hooks/useSearch.ts
import { useState, useCallback } from 'react';

interface SearchParams {
    keyword: string;
    filters: any; // Specify the type based on your filters
}

const useSearch = () => {
    const [searchData, setSearchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setSearchParams = useCallback((params: SearchParams) => {
        setIsLoading(true);
        setError(null);
        // Simulate fetching data
        setTimeout(() => {
            // Fetching would normally happen here
            setSearchData([]); // Populate with results from API
            setIsLoading(false);
        }, 1000);
    }, []);

    const resetSearch = useCallback(() => {
        setSearchData([]);
        setError(null);
        // Reset other states as needed
    }, []);

    return { searchData, isLoading, error, setSearchParams, resetSearch };
};

export default useSearch;

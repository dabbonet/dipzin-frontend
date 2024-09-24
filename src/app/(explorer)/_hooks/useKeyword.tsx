import type { ReactNode } from 'react';
import React, {
  useState, useEffect, createContext, useContext, useMemo
} from 'react';
import { searchByKeyword } from '../_actions/searchByKeyword';

// Define the interfaces for Screen, Result, and SearchResults
interface Screen {
  [key: string]: any; // Define specific properties if known
}

interface Result {
  name: string;
  _meilisearch_id: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  screens: Screen | null;
  type?: string;
  flow_category?: string | null;
  types?: string[];
  component_category?: string | null;
}

interface SearchResults {
  hits: Result[];
  query: string;
  processingTimeMs: number;
  limit: number;
  offset: number;
  estimatedTotalHits: number;
}

// Define the context state interface
interface KeywordContextProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  results: SearchResults | null;
}

// Create the context with an initial value of undefined
const KeywordContext = createContext<KeywordContextProps | undefined>(undefined);

// Provider component
const KeywordProvider = ({ children }: { children: ReactNode }) => {
  const [keyword, setKeyword] = useState<string>('');
  const [results, setResults] = useState<SearchResults | null>(null);

  useEffect(() => {
    if (keyword) {
      const fetchResults = async () => {
        const data = await searchByKeyword(keyword);
        setResults(data);
      };

      fetchResults();
    } else {
      setResults(null);
    }
  }, [keyword]);
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ keyword, setKeyword, results }), [keyword, results]);
  return (
    <KeywordContext.Provider value={contextValue}>
      {children}
    </KeywordContext.Provider>
  );
};

// Custom hook to use the KeywordContext
const useKeyword = () => {
  const context = useContext(KeywordContext);
  if (!context) {
    throw new Error('useKeyword must be used within a KeywordProvider');
  }
  return context;
};

// Export the hook and provider together
export { KeywordProvider, useKeyword };

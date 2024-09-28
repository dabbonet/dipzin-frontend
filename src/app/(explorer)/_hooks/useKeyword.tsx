import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useEffect } from 'react';
import { searchByKeyword } from '../_actions/searchByKeyword';
import debounce from 'lodash/debounce'; // Import debounce from lodash

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

// Define the Zustand store
interface KeywordStoreState {
  keyword: string;
  setKeyword: (keyword: string) => void;
  results: SearchResults | null;
  selectedResult: Result | null;
  setSelectedResult: (result: Result | null) => void; // Allow null as a valid value
  fetchResults: (keyword: string) => void;
}

const useKeywordStore = create<KeywordStoreState>()(
  devtools((set) => ({
    keyword: '',
    results: null,
    selectedResult: null,
    setKeyword: (keyword: string) => {
      set({ keyword });
    },
    setSelectedResult: (selectedResult: Result | null) => set({ selectedResult }),
    fetchResults: debounce((keyword: string) => {
      if (keyword) {
        searchByKeyword(keyword)
          .then((data) => set({ results: data }))
          .catch(() => set({ results: null }));
      } else {
        set({ results: null, selectedResult: null }); // Reset selectedResult when keyword is empty
      }
    }, 500), // Debounce delay of 500ms
  }))
);

// Custom hook to use the Zustand store
const useKeyword = () => {
  const { keyword, setKeyword, results, selectedResult, setSelectedResult, fetchResults } = useKeywordStore();

  useEffect(() => {
    fetchResults(keyword);
  }, [keyword, fetchResults]);

  return { keyword, setKeyword, results, selectedResult, setSelectedResult };
};

export { useKeyword };

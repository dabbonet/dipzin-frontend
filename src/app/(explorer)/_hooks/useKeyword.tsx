import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useEffect, useRef } from 'react';
import { suggestSearch } from '../_actions/suggestedSearch';
import debounce from 'lodash/debounce'; // Import debounce from lodash
import { searchByKeyword } from '../_actions/searchByKeyword';
import type { KeywordResult, Category } from '@/types/navigation-types';

// Define the interfaces for Screen, Result, and SearchResults
interface Screen {
  [key: string]: any; // Define specific properties if known
}

interface SearchResults {
  hits: KeywordResult[];
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
  selectedResult: any;
  setSelectedResult: (result:  any) => void; // Allow null as a valid value
  fetchResults: (keyword: string) => void;
  suggestedSearch: any;
  setSuggestedSearch: (suggestedSearch: any) => void;
}

const useKeywordStore = create<KeywordStoreState>()(
  devtools((set) => ({
    keyword: '',
    results: null,
    selectedResult: null,
    suggestedSearch: null,
    setSuggestedSearch: (suggestedSearch: any) => set({ suggestedSearch }),
    setKeyword: (keyword: string) => {
      set({ keyword });
    },
    setSelectedResult: (selectedResult: any) => set({ selectedResult }),
    fetchResults: debounce((keyword: string) => {
      if (keyword) {
        searchByKeyword(keyword)
          .then((data) => set({ results: data }))
          .catch(() => set({ results: null }));
      } else {
        set({ results: null, selectedResult: null }); // Reset selectedResult when keyword is empty
      }
    }, 500), // Debounce delay of 500ms
  }),{enabled: true})
);

// Custom hook to use the Zustand store
const useKeyword = () => {
  const { keyword, setKeyword, results, selectedResult, setSelectedResult, fetchResults, suggestedSearch, setSuggestedSearch } = useKeywordStore();

  // Ref to prevent the effect from running multiple times
  const isFirstRender = useRef(true);

  useEffect(() => {
    fetchResults(keyword);
  }, [keyword, fetchResults]);

  useEffect(() => {
    // Check if the suggestedSearch data is already present in the Zustand store
    if (isFirstRender.current && !suggestedSearch) {
      isFirstRender.current = false; // Mark first render as completed
      const getSuggested = async () => {
        const suggested = await suggestSearch();
        setSuggestedSearch(suggested);
      };
      getSuggested();
    }
  }, [suggestedSearch, setSuggestedSearch]);

  return { keyword, setKeyword, results, selectedResult, setSelectedResult, suggestedSearch };
};

export { useKeyword };

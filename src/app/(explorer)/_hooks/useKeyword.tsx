import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useCallback, useEffect, useRef } from 'react';
import { suggestSearch } from '../_actions/suggestedSearch';
import { searchByKeyword } from '../_actions/searchByKeyword';
import type { KeywordResult } from '@/types/navigation-types';

interface SearchResults {
  hits: KeywordResult[];
  query: string;
  processingTimeMs: number;
  limit: number;
  offset: number;
  estimatedTotalHits: number;
}

interface KeywordStoreState {
  keyword: string;
  setKeyword: (keyword: string) => void;
  results: SearchResults | null;
  setResults: (results: SearchResults | null) => void;
  selectedResult: any;
  setSelectedResult: (result: any) => void;
  suggestedSearch: any;
  setSuggestedSearch: (suggestedSearch: any) => void;
}

const useKeywordStore = create<KeywordStoreState>()(
  devtools(
    (set) => ({
      keyword: '',
      results: null,
      selectedResult: null,
      suggestedSearch: null,
      setKeyword: (keyword: string) => set({ keyword }),
      setResults: (results: SearchResults | null) => set({ results }),
      setSelectedResult: (selectedResult: any) => set({ selectedResult }),
      setSuggestedSearch: (suggestedSearch: any) => set({ suggestedSearch }),
    }),
    { enabled: true }
  )
);

const DEBOUNCE_DELAY = 300;

const useKeyword = () => {
  const {
    keyword,
    setKeyword,
    results,
    setResults,
    selectedResult,
    setSelectedResult,
    suggestedSearch,
    setSuggestedSearch,
  } = useKeywordStore();

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchResults = useCallback(
    async (keywordInput: string) => {
      if (keywordInput) {
        try {
          const data = await searchByKeyword(keywordInput);
          setResults(data);
        } catch {
          setResults(null);
        }
      } else {
        setResults(null);
        setSelectedResult(null);
      }
    },
    [setResults, setSelectedResult]
  );

  // Debounced keyword setter - updates keyword immediately but debounces the fetch
  const setKeywordDebounced = useCallback((newKeyword: string) => {
    // Update keyword state immediately for responsive input
    setKeyword(newKeyword);

    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for debounced fetch
    debounceTimerRef.current = setTimeout(() => {
      fetchResults(newKeyword);
    }, DEBOUNCE_DELAY);
  }, [setKeyword, fetchResults]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!suggestedSearch) {
      const getSuggested = async () => {
        const suggested = await suggestSearch();
        setSuggestedSearch(suggested);
      };
      getSuggested();
    }
  }, [suggestedSearch, setSuggestedSearch]);

  return {
    keyword,
    setKeyword: setKeywordDebounced,
    results,
    selectedResult,
    setSelectedResult,
    suggestedSearch,
  };
};

export { useKeyword };

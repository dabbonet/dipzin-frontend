import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
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

  const fetchResults = useRef(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    debounce((keyword: string) => {
      if (keyword) {
        searchByKeyword(keyword)
          .then((data) => setResults(data))
          .catch(() => setResults(null));
      } else {
        setResults(null);
        setSelectedResult(null);
      }
    }, 300)
  ).current;

  useEffect(() => {
    fetchResults(keyword);
  }, [keyword, fetchResults]);

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
    setKeyword,
    results,
    selectedResult,
    setSelectedResult,
    suggestedSearch,
  };
};

export { useKeyword };

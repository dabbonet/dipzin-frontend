'use client';

import { useState, useEffect, useCallback } from 'react';

const SEARCH_HISTORY_KEY = 'dipzin_search_history';
const MAX_HISTORY_ITEMS = 5;

export interface SearchHistoryItem {
  name: string;
  type: string;
  timestamp: number;
}

/**
 * Custom hook to manage search history in localStorage
 * Stores the last 5 unique searches
 */
export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  // Load history from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSearchHistory(parsed);
        }
      }
    } catch (error) {
      console.warn('Failed to load search history:', error);
      setSearchHistory([]);
    }
  }, []);

  // Add a search item to history
  const addToHistory = useCallback((item: Omit<SearchHistoryItem, 'timestamp'>) => {
    if (!item.name || !item.type) return;

    setSearchHistory((prev) => {
      // Remove existing item with same name and type
      const filtered = prev.filter(
        (h) => !(h.name === item.name && h.type === item.type)
      );

      // Add new item at the beginning with timestamp
      const newItem: SearchHistoryItem = {
        ...item,
        timestamp: Date.now(),
      };

      // Keep only the last MAX_HISTORY_ITEMS
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);

      // Save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
        } catch (error) {
          console.warn('Failed to save search history:', error);
        }
      }

      return updated;
    });
  }, []);

  // Remove a specific item from history
  const removeFromHistory = useCallback((name: string, type: string) => {
    setSearchHistory((prev) => {
      const updated = prev.filter((h) => !(h.name === name && h.type === type));

      // Update localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
        } catch (error) {
          console.warn('Failed to update search history:', error);
        }
      }

      return updated;
    });
  }, []);

  // Clear all history
  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(SEARCH_HISTORY_KEY);
      } catch (error) {
        console.warn('Failed to clear search history:', error);
      }
    }
  }, []);

  return {
    searchHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}

export default useSearchHistory;
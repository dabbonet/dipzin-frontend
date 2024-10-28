"use client"

import { useEffect, useCallback } from 'react';

interface UseKeyboardNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  isFirstItem?: boolean;
  isLastItem?: boolean;
}

const useKeyboardNavigation = ({
  onNext,
  onPrev,
  isFirstItem = false,
  isLastItem = false
}: UseKeyboardNavigationProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' && !isLastItem) {
      onNext();
    } else if (e.key === 'ArrowLeft' && !isFirstItem) {
      onPrev();
    }
  }, [onNext, onPrev, isFirstItem, isLastItem]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

export default useKeyboardNavigation;

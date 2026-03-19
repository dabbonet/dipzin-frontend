"use client";

import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@/app/(explorer)/_hooks/useQuery";
import { useFetchData } from "@/app/(explorer)/_hooks/useFetchData";
import type { ScreenData } from "@/types/screen-types";
import { getScreen } from "../_actions/getScreen";
import { getFullScreen } from "../_actions/getFullScreen";
import useKeyboardNavigation from "@/hooks/useKeyboardNavigation";

const useScreensOverview = (initialScreenId: number) => {
  const {
    query, setQuery, data: screens, pagination, setPagination
  } = useQuery();
  const { fetchData } = useFetchData();
  const [currentScreen, setCurrentScreen] = useState<ScreenData | null>(null);
  const [originalScreen, setOriginalScreen] = useState<ScreenData | null>(null);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [hasFullPage, setHasFullPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextScreenAfterLoad, setNextScreenAfterLoad] = useState<ScreenData | null>(null);

  const loadMoreData = useCallback(async () => {
    if (isLoadingMore) return null;

    const newOffset = pagination.offset + pagination.limit;
    if (pagination.offset === newOffset) return null;

    setIsLoadingMore(true);

    try {
      const updatedQuery = { ...query, offset: newOffset };
      const result = await fetchData(updatedQuery, true);

      if (result && result.query) {
        setQuery(result.query);
        setPagination({
          ...pagination,
          offset: newOffset,
        });
        return result.query;
      }
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setIsLoadingMore(false);
    }
    return null;
  }, [pagination, query, fetchData, isLoadingMore, setQuery, setPagination]);

  const loadScreenData = useCallback(async () => {
    if (!screens || screens.length === 0) {
      const fetchedScreen = await getScreen(initialScreenId);
      setCurrentScreen(fetchedScreen);
      return;
    }

    const foundScreen = screens.find(
      (screen) => screen.id === Number(initialScreenId)
    );
    if (foundScreen) {
      setCurrentScreen(foundScreen);
    } else {
      const fetchedScreen = await getScreen(initialScreenId);
      setCurrentScreen(fetchedScreen);
    }
  }, [initialScreenId, screens]);

  const toggleFullScreen = useCallback(async () => {
    if (!currentScreen) return;

    if (!showFullScreen) {
      setLoading(true);
      setShowFullScreen(true);

      try {
        const fullScreenData = await getFullScreen(currentScreen.id);

        if (!fullScreenData?.full_page) {
          setHasFullPage(false);
          setLoading(false);
          return;
        }

        setHasFullPage(true);
        setOriginalScreen(currentScreen);
        setCurrentScreen(() => ({
          ...(currentScreen as any),
          screen: fullScreenData.full_page,
        }));
      } catch (error) {
        setHasFullPage(false);
        setShowFullScreen(false);
      } finally {
        setLoading(false);
      }
    } else {
      if (originalScreen) {
        setCurrentScreen(originalScreen);
      }
      setOriginalScreen(null);
      setShowFullScreen(false);
      setHasFullPage(false);
    }
  }, [currentScreen, showFullScreen, originalScreen]);

  const resetScreenStates = useCallback(() => {
    setShowFullScreen(false);
    setOriginalScreen(null);
    setHasFullPage(false);
    setLoading(false);
  }, []);

  // Modify the useEffect to run only once on mount
  useEffect(() => {
    loadScreenData();
  }, []);

  // Update the useEffect for handling nextScreenAfterLoad
  useEffect(() => {
    if (!isLoadingMore && nextScreenAfterLoad && screens) {
      const screen = screens.find((s) => s.id === nextScreenAfterLoad.id);
      if (screen) {
        resetScreenStates();
        setCurrentScreen(screen);
        window.history.replaceState(null, "", `/screen/${screen.id}`);
        setNextScreenAfterLoad(null);
      }
    }
  }, [isLoadingMore, nextScreenAfterLoad, screens, resetScreenStates]);

  const goToNextScreen = useCallback(async () => {
    if (!screens || !currentScreen) return;

    const currentIndex = screens.findIndex(
      (screen) => screen.id === currentScreen.id
    );

    if (currentIndex < screens.length - 1) {
      resetScreenStates();
      const nextScreen = screens[currentIndex + 1];
      setCurrentScreen(nextScreen);
      window.history.replaceState(null, "", `/screen/${nextScreen.id}`);
    } else if (currentIndex === screens.length - 1 && !isLoadingMore) {
      const newQuery = await loadMoreData();
      if (newQuery?.data?.[0]) {
        setNextScreenAfterLoad(newQuery.data[0]);
      }
    }
  }, [screens, currentScreen, resetScreenStates, loadMoreData, isLoadingMore]);

  const goToPrevScreen = useCallback(() => {
    if (!screens || screens.length === 0 || !currentScreen) return;

    const currentIndex = screens.findIndex(
      (screen) => screen.id === currentScreen.id
    );
    if (currentIndex > 0) {
      resetScreenStates();
      const prevScreen = screens[currentIndex - 1];
      setCurrentScreen(prevScreen);
      window.history.replaceState(null, "", `/screen/${prevScreen.id}`);
    }
  }, [screens, currentScreen, resetScreenStates]);

  useKeyboardNavigation({
    onNext: goToNextScreen,
    onPrev: goToPrevScreen,
    isFirstItem: screens?.[0]?.id === currentScreen?.id,
    isLastItem: false // Always allow "next" to handle loading more data
  });

  return {
    currentScreen,
    showFullScreen,
    toggleFullScreen,
    goToNextScreen,
    goToPrevScreen,
    hasNextScreen: !isLoadingMore, // Always allow next unless loading
    hasPrevScreen:
      !!currentScreen
      && screens
      && screens.findIndex((s) => s.id === currentScreen.id) > 0,
    loading: loading || isLoadingMore,
    hasFullPage,
  };
};

export default useScreensOverview;

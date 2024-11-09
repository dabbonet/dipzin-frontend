"use client";

import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@/app/(explorer)/_hooks/useQuery";
import type { ScreenData } from "@/types/screen-types";
import { getScreen } from "../_actions/getScreen";
import { getFullScreen } from "../_actions/getFullScreen";
import useKeyboardNavigation from "@/hooks/useKeyboardNavigation";

const useScreensOverview = (initialScreenId: number) => {
  const { data: screens } = useQuery();
  const [currentScreen, setCurrentScreen] = useState<ScreenData | null>(null);
  const [originalScreen, setOriginalScreen] = useState<ScreenData | null>(null);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [hasFullPage, setHasFullPage] = useState(false);
  const [loading, setLoading] = useState(false);

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
      // Switching to full screen view
      setLoading(true);
      setShowFullScreen(true); // Set this first to trigger loading state

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
      // Switching back to normal view
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

  const goToNextScreen = useCallback(() => {
    if (!screens || screens.length === 0 || !currentScreen) return;

    const currentIndex = screens.findIndex(
      (screen) => screen.id === currentScreen.id
    );
    if (currentIndex < screens.length - 1) {
      resetScreenStates();
      const nextScreen = screens[currentIndex + 1];
      setCurrentScreen(nextScreen);
      window.history.replaceState(null, "", `/screen/${nextScreen.id}`);
    }
  }, [screens, currentScreen, resetScreenStates]);

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
    isLastItem: screens?.[screens.length - 1]?.id === currentScreen?.id,
  });

  useEffect(() => {
    loadScreenData();
  }, [loadScreenData]);

  return {
    currentScreen,
    showFullScreen,
    toggleFullScreen,
    goToNextScreen,
    goToPrevScreen,
    hasNextScreen:
      !!currentScreen
      && screens
      && screens.findIndex((s) => s.id === currentScreen.id) < screens.length - 1,
    hasPrevScreen:
      !!currentScreen
      && screens
      && screens.findIndex((s) => s.id === currentScreen.id) > 0,
    loading,
    hasFullPage,
  };
};

export default useScreensOverview;

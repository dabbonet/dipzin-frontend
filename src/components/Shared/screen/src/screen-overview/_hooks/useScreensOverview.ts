"use client";

import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import type { ScreenData } from '@/types/screen-types';
import { getScreen } from '../_actions/getScreen';
import useKeyboardNavigation from '@/hooks/useKeyboardNavigation';

const useScreensOverview = (initialScreenId: number) => {
  const { data: screens } = useQuery(); // Fetch screens from query
  const [currentScreen, setCurrentScreen] = useState<ScreenData | null>(null);

  // Function to load initial or specific screen data
  const loadScreenData = useCallback(async () => {
    try {
      if (!screens || screens.length === 0) {
        const fetchedScreen: ScreenData = await getScreen(initialScreenId);
        setCurrentScreen(fetchedScreen);
        return;
      }

      const foundScreen = screens.find((screen: ScreenData) => screen.id === Number(initialScreenId));
      if (foundScreen) {
        setCurrentScreen(foundScreen);
      } else {
        const fetchedScreen: ScreenData = await getScreen(initialScreenId);
        setCurrentScreen(fetchedScreen);
      }
    } catch (error) {
      console.error("Error fetching screen:", error);
    }
  }, [initialScreenId, screens]);

  // Go to the next screen
  const goToNextScreen = useCallback(() => {
    if (!screens || screens.length === 0 || !currentScreen) return;

    const currentScreenIndex = screens.findIndex((screen: ScreenData) => screen.id === currentScreen.id);
    if (currentScreenIndex < screens.length - 1) {
      const nextScreen = screens[currentScreenIndex + 1];
      setCurrentScreen(nextScreen);
      window.history.replaceState(null, '', `/screen/${nextScreen.id}`);
    }
  }, [screens, currentScreen]);

  // Go to the previous screen
  const goToPrevScreen = useCallback(() => {
    if (!screens || screens.length === 0 || !currentScreen) return;

    const currentScreenIndex = screens.findIndex((screen: ScreenData) => screen.id === currentScreen.id);
    if (currentScreenIndex > 0) {
      const prevScreen = screens[currentScreenIndex - 1];
      setCurrentScreen(prevScreen);
      window.history.replaceState(null, '', `/screen/${prevScreen.id}`);
    }
  }, [screens, currentScreen]);

  // Keyboard Navigation Hook integration
  useKeyboardNavigation({
    onNext: goToNextScreen,
    onPrev: goToPrevScreen,
    isFirstItem: screens?.length > 0 && screens[0]?.id === currentScreen?.id,
    isLastItem: screens?.length > 0 && screens[screens.length - 1]?.id === currentScreen?.id,
  });

  // Load initial screen data on mount or when screens change
  useEffect(() => {
    loadScreenData();
  }, [loadScreenData, screens]);

  return {
    currentScreen,
    goToNextScreen,
    goToPrevScreen,
    hasNextScreen: currentScreen !== null && screens && screens.findIndex((screen: ScreenData) => screen.id === currentScreen.id) < screens.length - 1,
    hasPrevScreen: currentScreen !== null && screens && screens.findIndex((screen: ScreenData) => screen.id === currentScreen.id) > 0,
  };
};

export default useScreensOverview;

import { useState, useEffect, useCallback } from 'react';

export const useKeyboardNavigation = (
    data: any[],
    openScreen: any | null,
    setOpenScreen: (screen: any | null) => void
) => {
    // Current screen index
    const [currentIndex, setCurrentIndex] = useState(-1);

    // Open a screen by index
    const openScreenByIndex = useCallback(
        (index: number) => {
            if (index >= 0 && index < data.length) {
                setCurrentIndex(index);
                setOpenScreen(data[index]);
            }
        },
        [data, setOpenScreen]
    );

    // Navigate to the next screen
    const nextScreen = useCallback(() => {
        if (currentIndex < data.length - 1) {
            openScreenByIndex(currentIndex + 1);
        }
    }, [currentIndex, openScreenByIndex]);

    // Navigate to the previous screen
    const prevScreen = useCallback(() => {
        if (currentIndex > 0) {
            openScreenByIndex(currentIndex - 1);
        }
    }, [currentIndex, openScreenByIndex]);

    // Keyboard event handler
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (openScreen) {
                switch (event.key) {
                    case 'ArrowRight':
                        nextScreen();
                        break;
                    case 'ArrowLeft':
                        prevScreen();
                        break;
                    case 'Escape':
                        setOpenScreen(null);
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [openScreen, nextScreen, prevScreen, setOpenScreen]);

    return {
        openScreenByIndex,
        nextScreen,
        prevScreen,
    };
};

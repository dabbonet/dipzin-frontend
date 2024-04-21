import { useState, useEffect } from 'react';

const useKeyboardNavigation = (length) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                setActiveIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : length - 1);
            } else if (event.key === 'ArrowRight') {
                setActiveIndex(prevIndex => prevIndex < length - 1 ? prevIndex + 1 : 0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [length]);

    return activeIndex;
};

export default useKeyboardNavigation;
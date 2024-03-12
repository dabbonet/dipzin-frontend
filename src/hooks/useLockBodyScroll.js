import { useEffect } from 'react';

const useLockBodyScroll = (lock) => {
    useEffect(() => {
        if (lock) {
            // Lock the body scroll
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        } else {
            // Unlock the body scroll
            document.body.style.overflow = '';
            document.body.style.height = '';
        }

        // Cleanup function to revert the styles
        return () => {
            document.body.style.overflow = '';
            document.body.style.height = '';
        };
    }, [lock]);
};

export default useLockBodyScroll;
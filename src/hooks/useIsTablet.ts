import { useState, useEffect } from 'react';

const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1024);
    };

    // Set initial value
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isTablet;
};

export default useIsTablet;

'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/Shared/button';

const HorizontalBreak: React.FC = () => {
  const bannerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    // Integrity check
    const checkIntegrity = () => {
      const content = banner.innerHTML;
      const hash = btoa(content); // Simple hashing, use a more robust method in production
      const storedHash = sessionStorage.getItem('bannerHash');
      if (hash !== storedHash) {
        // Reload the page or take other appropriate action
        window.location.reload();
      }
    };

    // Store initial hash
    sessionStorage.setItem('bannerHash', btoa(banner.innerHTML));

    // Prevent removal
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && banner && !document.body.contains(banner)) {
          document.body.appendChild(banner);
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Periodic integrity checks
    const intervalId = setInterval(checkIntegrity, 1000);

    // Cleanup function
    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      ref={bannerRef}
      className=" inset-0 z-50 py-24 flex flex-col items-center justify-center gap-10 bg-[#030304]"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl md:text-6xl font-medium text-white text-center">
          Only 10% of flows are visible.
          Explore with unlimited access to all features.
        </h1>
        <p className="text-slate-400 text-base text-center">
          To continue using your free trial of our premium features, please upgrade to our premium package
          <br />
          {' '}
          from
          {' '}
          <span className="text-white font-medium">US$6/month</span>
        </p>
      </div>
      <Button href="#" className="rounded-full px-6 md:px-[90px]" size="2xl">
        See Our Plans
      </Button>
    </section>
  );
};

export default HorizontalBreak;

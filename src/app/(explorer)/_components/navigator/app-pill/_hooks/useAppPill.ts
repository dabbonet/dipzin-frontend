"use client";

import { useState, useEffect } from 'react';

interface AppData {
  slug: string;
  id: number;
  name: string;
  tag_line?: string;
  platform: string | string[];
  icon: string;
  categories: string | string[];
  neglected?: boolean;
}

interface UseAppPillProps {
  query: any;
  setApps: (apps: AppData[]) => void;
  setPlatform?: (platform: string) => void;
}

const useAppPill = ({ query, setApps, setPlatform }: UseAppPillProps) => {
  const [allApps, setAllApps] = useState<AppData[]>([]);
  const [hiddenAppSlugs, setHiddenAppSlugs] = useState<string[]>([]);

  // Helper to normalize platform to array
  const normalizePlatform = (platform: string | string[]): string[] => (Array.isArray(platform) ? platform : [platform]);

  // Helper to check if platform is mobile
  const isMobilePlatform = (platform: string): boolean => platform === 'ios' || platform === 'android';

  // Helper to check if an app has web platform
  const hasWebPlatform = (app: AppData): boolean => normalizePlatform(app.platform).includes('web');

  // Helper to check if an app has mobile platform
  const hasMobilePlatform = (app: AppData): boolean => normalizePlatform(app.platform).some(isMobilePlatform);

  const handlePlatformConflicts = (apps: AppData[]): string[] => {
    const newHiddenSlugs: string[] = [...hiddenAppSlugs];
    const visibleApps = apps.filter((app) => !newHiddenSlugs.includes(app.slug));

    // Check if we have both web and mobile apps visible
    const hasVisibleWeb = visibleApps.some(hasWebPlatform);
    const hasVisibleMobile = visibleApps.some(hasMobilePlatform);

    if (hasVisibleWeb && hasVisibleMobile) {
      // Hide all web apps if there are mobile apps
      visibleApps.forEach((app) => {
        if (hasWebPlatform(app)) {
          newHiddenSlugs.push(app.slug);
        }
      });
    }

    return newHiddenSlugs;
  };

  useEffect(() => {
    if (query?.apps && query.apps.length > 0) {
      setAllApps((prevApps) => {
        const newApps = [...prevApps];
        query.apps.forEach((app: AppData) => {
          if (!newApps.some((a) => a.slug === app.slug)) {
            newApps.push(app);
          }
        });
        return newApps;
      });

      // Check for platform conflicts whenever apps change
      const newHiddenSlugs = handlePlatformConflicts(query.apps);
      if (newHiddenSlugs.length !== hiddenAppSlugs.length) {
        setHiddenAppSlugs(newHiddenSlugs);
        // Update visible apps
        setApps(query.apps.filter((app: AppData) => !newHiddenSlugs.includes(app.slug)));
      }
    } else {
      setAllApps([]);
    }
  }, [query?.apps]);

  const handleToggleVisibility = (appSlug: string) => {
    const appToToggle = allApps.find((a) => a.slug === appSlug);
    if (!appToToggle) return;

    setHiddenAppSlugs((prev) => {
      const isCurrentlyHidden = prev.includes(appSlug);

      if (isCurrentlyHidden) {
        // Making app visible
        const updatedApps = [...query.apps, appToToggle];
        const newHiddenSlugs = handlePlatformConflicts(updatedApps)
          .filter((slug) => slug !== appSlug);

        // Update visible apps
        setApps(updatedApps.filter((app) => !newHiddenSlugs.includes(app.slug)));
        return newHiddenSlugs;
      }
      // Hiding app
      setApps(query.apps.filter((app: AppData) => app.slug !== appSlug));
      return [...prev, appSlug];
    });
  };

  const handleRemoveApp = (appSlug: string) => {
    setAllApps((prev) => prev.filter((app) => app.slug !== appSlug));
    const remainingApps = query.apps.filter((app: AppData) => app.slug !== appSlug);
    setApps(remainingApps);
    setHiddenAppSlugs((prev) => prev.filter((slug) => slug !== appSlug));
    
    // Update platform based on remaining apps
    if (setPlatform && remainingApps.length > 0) {
      // Check platforms of remaining apps
      const allPlatforms = remainingApps.flatMap((app: AppData) => normalizePlatform(app.platform));
      const hasIos = allPlatforms.includes('ios');
      const hasAndroid = allPlatforms.includes('android');
      const hasWeb = allPlatforms.includes('web');
      
      // Determine appropriate platform
      let newPlatform = 'web';
      if (hasIos || hasAndroid) {
        // If any mobile apps remain, prefer ios
        newPlatform = hasIos ? 'ios' : 'android';
      } else if (hasWeb) {
        newPlatform = 'web';
      }
      
      // Only update if different from current
      if (newPlatform !== query.platform) {
        setPlatform(newPlatform);
      }
    }
  };

  return {
    allApps,
    hiddenAppSlugs,
    handleToggleVisibility,
    handleRemoveApp,
  };
};

export default useAppPill;

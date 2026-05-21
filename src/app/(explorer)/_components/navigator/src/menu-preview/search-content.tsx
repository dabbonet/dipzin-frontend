'use client';

import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Shared/avatar';
import { extractInitials, mergeIconFromObject } from '@/utils/StringUtils';
import { storage } from '@/utils/storage';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';

interface SearchContentProps {
  selectedResult: any;
}

const SearchContent: React.FC<SearchContentProps> = ({ selectedResult }) => {
  const { query } = useQuery();
  const { platform } = query;

  // Safe access with null checks - selectedResult may be KeywordResult (missing some props)
  const categories = (selectedResult?.categories && Array.isArray(selectedResult.categories) && selectedResult.categories.length > 0)
    ? selectedResult.categories
    : [];
  const category = categories[0] || null;
  const platforms = (selectedResult?.platforms && Array.isArray(selectedResult.platforms) && selectedResult.platforms.length > 0)
    ? selectedResult.platforms.join(', ')
    : selectedResult?.platform || "Android, Web, Ios";

  // Determine the platform to use for displaying screenshots
  const resultPlatform = (() => {
    // Check if selectedResult.platforms exists and includes the current platform
    if (selectedResult?.platforms && Array.isArray(selectedResult.platforms) && selectedResult.platforms.includes(platform)) {
      return platform;
    }
    // If selectedResult.platforms exists but doesn't include the current platform, use the first available platform
    if (selectedResult?.platforms && Array.isArray(selectedResult.platforms) && selectedResult.platforms.length > 0) {
      return selectedResult.platforms[0];
    }
    // If selectedResult.platforms doesn't exist, use the current platform from query
    return platform;
  })();

  // Get the icon URL - handle both object format {hash, ext} and string format
  // Also handle missing icon (KeywordResult may not have icon property)
  // Also handle icon nested under app object (search results have app.app_icon)
  const iconUrl = React.useMemo(() => {
    const iconValue = selectedResult?.imgSrc || selectedResult?.icon || selectedResult?.app_icon || selectedResult?.app?.app_icon;
    if (!iconValue) return null;
    if (typeof iconValue === 'string') {
      // Don't prepend storage URL if it's already a full URL
      if (iconValue.startsWith('http')) return iconValue;
      return storage(iconValue);
    }
    if (iconValue?.hash && iconValue?.ext) {
      return storage(mergeIconFromObject(iconValue));
    }
    return null;
  }, [selectedResult?.icon, selectedResult?.app_icon, selectedResult?.app?.app_icon]);

  // Safe name and tagline access
  // Search results may have app details nested under app object
  const appName = selectedResult?.name || selectedResult?.app?.name || 'Unknown App';
  const tagLine = selectedResult?.tag_line || selectedResult?.app?.tag_line || '';

  // Get screens array - handle different data structures
  // Search results from API may have a single screen object or nested screen data
  // LIMIT to 5 screens for preview to prevent performance issues and crashes
  // (Backend should also limit, but frontend safeguard ensures stability)
  const MAX_PREVIEW_SCREENS = 5;
  
  // Normalize previewScreens (from Typesense) into screens format
  const normalizedResult = React.useMemo(() => {
    if (!selectedResult) return null;
    if (selectedResult.screens) return selectedResult;
    if (!selectedResult.previewScreens) return selectedResult;
    // Parse JSON strings from Typesense index
    const parsed = Array.isArray(selectedResult.previewScreens)
      ? selectedResult.previewScreens.map(s => typeof s === 'string' ? JSON.parse(s) : s)
      : selectedResult.previewScreens;
    return { ...selectedResult, screens: parsed };
  }, [selectedResult]);

  const screens = React.useMemo(() => {
    if (!normalizedResult?.screens) {
      // Check if the result itself is a screen record with a screen property
      if (normalizedResult?.screen) {
        return [normalizedResult.screen];
      }
      return [];
    }

    if (typeof normalizedResult.screens === 'object' && !Array.isArray(normalizedResult.screens)) {
      // Check if it has the screen properties directly (hash, ext, url)
      if (normalizedResult.screens.hash && normalizedResult.screens.ext) {
        return [normalizedResult.screens];
      }
      
      // Check for platform keys (ios, android, web)
      const platformScreens = normalizedResult.screens[resultPlatform];
      if (Array.isArray(platformScreens)) {
        return platformScreens.slice(0, MAX_PREVIEW_SCREENS);
      }
      // Try lowercase platform key
      const lowercaseKey = resultPlatform?.toLowerCase();
      if (normalizedResult.screens[lowercaseKey] && Array.isArray(normalizedResult.screens[lowercaseKey])) {
        return normalizedResult.screens[lowercaseKey].slice(0, MAX_PREVIEW_SCREENS);
      }
      // Try to find any platform key with screens
      const platformKeys = ['ios', 'android', 'web', 'IOS', 'Android', 'Web'];
      for (const key of platformKeys) {
        if (normalizedResult.screens[key] && Array.isArray(normalizedResult.screens[key])) {
          return normalizedResult.screens[key].slice(0, MAX_PREVIEW_SCREENS);
        }
      }
      return [];
    }

    // If screens is already an array - limit to prevent crash
    if (Array.isArray(normalizedResult.screens)) {
      return normalizedResult.screens.slice(0, MAX_PREVIEW_SCREENS);
    }

    return [];
  }, [normalizedResult, normalizedResult?.screens, normalizedResult?.screen, resultPlatform]);

  return (
    <div className="space-y-0 xl:space-y-4 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 justify-between px-4 pt-2 grow-0">
        <div className="flex items-center gap-4">
          <Avatar className="size-10 xl:size-12">
            <AvatarImage src={iconUrl || undefined} alt={appName} />
            <AvatarFallback>{extractInitials(appName)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-sm xl:text-xl font-semibold">{appName}</h2>
            <p className="text-xs xl:text-base text-slate-400">{tagLine}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <div className="flex flex-col">
            <p className="text-xs xl:text-base text-slate-400">Platform:</p>
            <p className="text-xs xl:text-base text-white font-semibold capitalize">{platforms}</p>
          </div>
          {category && (
          <div className="flex flex-col">
            <p className="text-xs xl:text-base text-slate-400">Category:</p>
            <p className="text-xs xl:text-base text-white font-semibold capitalize">{typeof category === 'object' ? category?.name : category}</p>
          </div>
          )}
        </div>
      </div>
      <div className="flex overflow-x-auto items-center flex-1 min-h-0 p-2 gap-2 xl:gap-4">
        {screens.length > 0 ? (
          screens.map((screenshot: any) => {
            // Handle screenshot being either a string or an object with screen data
            let screenshotUrl: string | null = null;
            
            if (typeof screenshot === 'string') {
              screenshotUrl = storage(screenshot);
            } else if (screenshot?.screen?.hash && screenshot?.screen?.ext) {
              screenshotUrl = storage(`${screenshot.screen.hash}${screenshot.screen.ext}`);
            } else if (screenshot?.hash && screenshot?.ext) {
              screenshotUrl = storage(`${screenshot.hash}${screenshot.ext}`);
            }

            if (!screenshotUrl) return null;
            
            // Use screen ID as key for stable rendering, fallback to URL hash
            const screenKey = screenshot?.id || `screen-${screenshotUrl.slice(-10)}`;

            return (
              <Image
                key={screenKey}
                src={screenshotUrl}
                alt={`${appName} screenshot`}
                width={200}
                height={430}
                className="h-full max-h-full w-auto object-contain rounded-xl xl:rounded-2xl"
              />
            );
          })
        ) : (
          <div className="flex items-center justify-center w-full h-full text-slate-500">
            No screens available
          </div>
        )}
      </div>
    </div>
  )
};

export default SearchContent;

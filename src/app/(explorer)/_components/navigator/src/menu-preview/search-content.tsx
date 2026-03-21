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
  const iconUrl = React.useMemo(() => {
    if (!selectedResult?.icon) return null;
    if (typeof selectedResult.icon === 'string') {
      return storage(selectedResult.icon);
    }
    if (selectedResult.icon?.hash && selectedResult.icon?.ext) {
      return storage(mergeIconFromObject(selectedResult.icon));
    }
    return null;
  }, [selectedResult?.icon]);

  // Safe name and tagline access
  const appName = selectedResult?.name || 'Unknown App';
  const tagLine = selectedResult?.tag_line || '';

  // Get screens array - handle different data structures
  const screens = React.useMemo(() => {
    if (!selectedResult?.screens) return [];

    // If screens is an object with platform keys (ios, android, web)
    if (typeof selectedResult.screens === 'object' && !Array.isArray(selectedResult.screens)) {
      const platformScreens = selectedResult.screens[resultPlatform];
      if (Array.isArray(platformScreens)) {
        return platformScreens;
      }
      // Try lowercase platform key
      const lowercaseKey = resultPlatform?.toLowerCase();
      if (selectedResult.screens[lowercaseKey] && Array.isArray(selectedResult.screens[lowercaseKey])) {
        return selectedResult.screens[lowercaseKey];
      }
      // Try to find any platform key with screens
      const platformKeys = ['ios', 'android', 'web', 'IOS', 'Android', 'Web'];
      for (const key of platformKeys) {
        if (selectedResult.screens[key] && Array.isArray(selectedResult.screens[key])) {
          return selectedResult.screens[key];
        }
      }
      return [];
    }

    // If screens is already an array
    if (Array.isArray(selectedResult.screens)) {
      return selectedResult.screens;
    }

    return [];
  }, [selectedResult?.screens, resultPlatform]);

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
            <p className="text-xs xl:text-base text-white font-semibold capitalize">{category}</p>
          </div>
          )}
        </div>
      </div>
      <div className="flex overflow-x-scroll justify-around min-h-0 p-2">
        {screens.length > 0 ? (
          screens.map((screenshot: any, index: number) => {
            // Handle screenshot being either a string or an object with screen data
            const screenshotUrl = typeof screenshot === 'string'
              ? storage(screenshot)
              : screenshot?.screen?.hash && screenshot?.screen?.ext
                ? storage(`${screenshot.screen.hash}${screenshot.screen.ext}`)
                : screenshot?.hash && screenshot?.ext
                  ? storage(`${screenshot.hash}${screenshot.ext}`)
                  : null;

            if (!screenshotUrl) return null;

            return (
              <Image
                key={`screenshot-${index}`}
                src={screenshotUrl}
                alt={`${appName} screenshot ${index + 1}`}
                width={200}
                height={430}
                className="h-full w-fit rounded-xl xl:rounded-2xl mx-1 xl:mx-2"
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

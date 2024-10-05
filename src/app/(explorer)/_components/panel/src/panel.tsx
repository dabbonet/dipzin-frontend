// Panel.tsx

'use client';

import React from 'react';
import { useQuery } from '@/app/(explorer)/_hooks/useQuery';
import { cn } from '@/lib/utils';
import ScreensGrid from './ScreensGrid';

const Panel = () => {
  const { query } = useQuery();
  switch (query.pattern) {
    case 'marketing':
    case 'screens':
    case 'components':
      return (
        <div
          className={cn(
            'relative',
            (query?.apps?.length ?? 0) > 0 ? 'top-40' : 'top-28'
          )}
        >
          <ScreensGrid />
        </div>
      );
    case 'flows':
      return (
        <div>
          {/* UI for flows */}
        </div>
      );
    case 'apps':
      return (
        <div
          className={cn(
            'relative',
            (query?.apps?.length ?? 0) > 0 ? 'top-32' : 'top-28'
          )}
        >
          <ScreensGrid />
        </div>
      );
    default:
      return null; // Handle invalid view prop value
  }
};

export default Panel;

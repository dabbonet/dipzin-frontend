"use client";

import React from 'react';
import { Icon } from '../UI/icon';
import { Button } from '../Shared/button';
import { useDownloadScreen } from '@/hooks/useDownloadScreen';
import { storage } from '@/utils/storage';
import { useBulkActionStore } from '@/stores/useBulkActionStore';

const BulkActions: React.FC = () => {
  const { selectedScreens, clearSelection } = useBulkActionStore();
  const selectedScreensArray = Object.values(selectedScreens);

  const { downloadScreen, loading: downloading } = useDownloadScreen();
  // const { copyImageToClipboard, loading: copying } = useCopyScreen();

  const handleDownload = () => {
    const imageUrls = selectedScreensArray.map(
      (screen) => storage(screen.screen.hash + screen.screen.ext)
    );
    downloadScreen(imageUrls, 'Screenshots');
  };

  // const handleCopy = async () => {
  //   await Promise.all(
  //     selectedScreensArray.map((screen) => copyImageToClipboard(storage(screen.screen.hash + screen.screen.ext)))
  //   );
  // };

  const hasSelectedScreens = selectedScreensArray.length > 0;

  return (
    <div
      className={`fixed z-40 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg p-3 rounded-2xl bg-slate-800 flex items-center justify-between transition-all duration-200 ease-in-out${
        hasSelectedScreens
          ? 'opacity-100 -translate-y-8'
          : 'opacity-0 translate-y-full'
      }`}
    >
      <span className="size-fit flex items-center justify-center gap-3">
        {selectedScreensArray.length}
        {' '}
        Selected
        <button
          type="button"
          aria-label="cancel bulk action"
          onClick={clearSelection}
        >
          <Icon.Close className="size-6" />
        </button>
      </span>
      <div className="size-fit flex items-center justify-center gap-3">
        <Button
          variant="darkGray"
          aria-label="download selected files"
          onClick={handleDownload}
          disabled={downloading}
        >
          <Icon.Download className="size-6" />
          <p className="hidden sm:block">Download</p>
        </Button>
        {/* <Button
          variant="darkGray"
          aria-label="Copy selected files"
          onClick={handleCopy}
          disabled={copying}
        >
          <Icon.Copy className='size-6' />
          <p className="hidden sm:block">Copy</p>
        </Button> */}
        <Button aria-label="Save selected files">
          Save
        </Button>
      </div>
    </div>
  );
};

export default BulkActions;

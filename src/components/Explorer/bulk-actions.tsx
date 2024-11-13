"use client";

import React from 'react';
import { Icon } from '../UI/icon';
import { useBulkActionStore } from '@/stores/useBulkActionStore';
import { DownloadButton } from '../Shared/button/DownloadButton';
import { storage } from '@/utils/storage';

const BulkActions: React.FC = () => {
  const { selectedScreens, clearSelection } = useBulkActionStore();
  const selectedScreensArray = Object.values(selectedScreens);

  // const { copyImageToClipboard, loading: copying } = useCopyScreen();

  // const handleCopy = async () => {
  //   await Promise.all(
  //     selectedScreensArray.map((screen) => copyImageToClipboard(storage(screen.screen.hash + screen.screen.ext)))
  //   );
  // };

  const screensUrls = selectedScreensArray.map(
    (screen) => storage(screen.screen.hash + screen.screen.ext)
  );

  console.log('screensUrls: ', JSON.stringify(screensUrls, null, 2));

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
        <DownloadButton
          variant="darkGray"
          url={screensUrls as unknown as string[]}
          then={(
            <>
              <Icon.Check className="size-6" />
              <p className="hidden sm:block">Downloaded!</p>
            </>
          )}
        >
          <Icon.Download className="size-6" />
          <p className="hidden sm:block">Download</p>
        </DownloadButton>

        {/* <Button
          variant="darkGray"
          aria-label="Copy selected files"
          onClick={handleCopy}
          disabled={copying}
        >
          <Icon.Copy className='size-6' />
          <p className="hidden sm:block">Copy</p>
        </Button> */}
        {/* <Button aria-label="Save selected files">
          Save
        </Button> */}
      </div>
    </div>
  );
};

export default BulkActions;

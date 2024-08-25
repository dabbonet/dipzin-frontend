import React from 'react';
import '../src/styles/global.css';
import type { Preview } from '@storybook/react';
import { Toaster } from '../src/components/Shared/toaster';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    layout: 'centered',
    decorators: [
      (Story : any) => (
        <>
          <Story />
          <Toaster />
        </>
      )
    ]
  },
};

export default preview;

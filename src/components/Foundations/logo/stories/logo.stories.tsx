import type { Meta } from '@storybook/react';

import Logo from '../src/logo';

export default {
  title: 'Foundations/Logo',
  component: Logo,
  argTypes: {
    theme: {
      control: {
        type: 'inline-radio',
      },
      options: ['light', 'dark'],
    },
  },
} as Meta<typeof Logo>;

const defaultProps = {
  theme: 'light',
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

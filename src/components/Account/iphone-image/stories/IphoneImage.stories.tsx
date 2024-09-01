import type { Meta, StoryObj } from '@storybook/react';
import { IphoneImage } from '@/components/Account/iphone-image';

export default {
  title: 'Access/IphoneImage',
  component: IphoneImage,
  tags: ['autodocs'],
} as Meta;

export const Default: StoryObj<typeof IphoneImage> = {
  args: {
    images: [
      "https://placehold.co/300x650/black/orange",
      "https://placehold.co/300x650/black/blue",
      "https://placehold.co/300x650/black/green",
      "https://placehold.co/300x650/black/red",
      "https://placehold.co/300x650/black/yellow",
    ]
  },
};

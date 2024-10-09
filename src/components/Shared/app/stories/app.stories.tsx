import type { Meta, StoryObj } from '@storybook/react';
import { App } from '@/components/Shared/app';

const meta: Meta = {
  title: 'Shared/App',
  component: App,
  tags: ['autodocs'],
  argTypes: {

  },
  args: {
    app: {
      id: 794,
      name: "Elk",
      slug: "elk",
      tag_line: "Winner of ADA 2017",
      platform: "ios",
      icon: {
        hash: "683e5e51_93c9_42e3_87bd_85aecacb15f0_c2adf5bda7",
        ext: ".jpg"
      },
      categories: [
        {
          id: 19,
          name: "Utilities"
        }
      ],
      screens: [
        {
          id: 2,
          screen: {
            id: 1126,
            width: 100,
            height: 200,
            hash: "0ea0221f_5dc2_4eaf_8afd_0b163709c312_747650c98f",
            ext: ".png"
          }
        },
        {
          id: 194,
          screen: {
            id: 1317,
            width: 100,
            height: 200,
            hash: "94c2a989_0b0b_4613_8922_02b8e7cc298f_4c1a3e80b6",
            ext: ".png"
          }
        }
      ]
    }
  }
};

export default meta;

type Story = StoryObj;

// Simulating loading state
export const LoadingScreen: Story = {
  args: {
    apps: {
      id: '1',
      imgSrc: 'https://app.requestly.io/delay/5000/https://placehold.co/300x650?text=This+image+is+delayed',
      width: 300,
      height: 650,
      app: {
        id: '1',
        avatar: {
          imgSrc: 'https://github.com/shadcn.png',
        },
        name: 'App Name',
        tagLine: 'App Tag Line',
      }
    },
  },
};

// Simulating error state
export const ErrorScreen: Story = {
  args: {
    apps: {
      id: '1',
      imgSrc: 'https://non-existent-image-url.jpg',
      width: 300,
      height: 650,
      app: {
        id: '1',
        avatar: {
          imgSrc: 'https://github.com/shadcn.png',
        },
        name: 'App Name',
        tagLine: 'App Tag Line',
      }
    },
  },
};

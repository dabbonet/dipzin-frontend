import type { Meta, StoryObj } from '@storybook/react';
import { Screen } from '@/components/Explorer/screen';

const meta: Meta = {
  title: 'Explorer/Screen',
  component: Screen,
  tags: ['autodocs'],
  argTypes: {
    view: {
      control: 'select',
      options: ['default', 'global', 'in-app'],
    },
  },
  args: {
    screen: {
      id: '1',
      imgSrc: 'https://placehold.co/300x650',
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
  }
};

export default meta;

type Story = StoryObj;

export const DefaultScreen: Story = {
  args: {
    view: 'default',
  },
};

export const GlobalScreen: Story = {
  args: {
    view: 'global',
  },
};

export const InAppScreen: Story = {
  args: {
    view: 'in-app',
  },
};

export const DefaultWebScreen: Story = {
  args: {
    screen: {
      id: '1',
      imgSrc: 'https://placehold.co/530x330',
      width: 530,
      height: 330,
      app: {
        id: '1',
        avatar: {
          imgSrc: 'https://github.com/shadcn.png',
        },
        name: 'App Name',
        tagLine: 'App Tag Line',
      }
    },
  }
};

export const GlobalWebScreen: Story = {
  args: {
    screen: {
      id: '1',
      imgSrc: 'https://placehold.co/530x330',
      width: 530,
      height: 330,
      app: {
        id: '1',
        avatar: {
          imgSrc: 'https://github.com/shadcn.png',
        },
        name: 'App Name',
        tagLine: 'App Tag Line',
      }
    },
    view: 'global',
  }
};

export const InAppWebScreen: Story = {
  args: {
    screen: {
      id: '1',
      imgSrc: 'https://placehold.co/530x330',
      width: 530,
      height: 330,
      app: {
        id: '1',
        avatar: {
          imgSrc: 'https://github.com/shadcn.png',
        },
        name: 'App Name',
        tagLine: 'App Tag Line',
      }
    },
    view: 'in-app',
  }
};

// Simulating loading state
export const LoadingScreen: Story = {
  args: {
    screen: {
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
    screen: {
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

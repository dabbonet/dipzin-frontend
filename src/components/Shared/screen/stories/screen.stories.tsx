import type { Meta, StoryObj } from '@storybook/react';
import { Screen } from '@/components/Shared/screen';

const meta: Meta = {
  title: 'Shared/Screen',
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
      id: 12,
      page_url: null,
      colors: '#046cfc,#114cac,#a2ccfc,#747c7c,#52555a,#d5dbe7',
      app: {
        id: 623,
        name: 'Simple Contacts',
        slug: 'simple-contacts',
        tag_line: 'Renew your Rx and buy lenses',
        platform: 'ios',
        icon: { hash: '79f73d85_4c07_4962_8e4f_e72ad4df24d3_eaedf7dd6d', ext: '.jpg' }
      },
      tags: [{ id: 7, name: 'Account Setup' }],
      components: [{ id: 9, name: 'Hero Image' }, { id: 2, name: 'Button' }],
      screen: {
        id: 1135,
        width: 1125,
        height: 2436,
        hash: 'a2e0c364_6e6b_4ead_9706_5270f0339557_d6f17c0795',
        ext: '.png'
      }
    }
  }
};

export default meta;

type Story = StoryObj;

// export const DefaultScreen: Story = {
//   args: {
//     view: 'default',
//   },
// };

// export const GlobalScreen: Story = {
//   args: {
//     view: 'global',
//   },
// };

// export const InAppScreen: Story = {
//   args: {
//     view: 'in-app',
//   },
// };

// export const DefaultWebScreen: Story = {
//   args: {
//     screen: {
//       id: '1',
//       imgSrc: 'https://placehold.co/530x330',
//       width: 530,
//       height: 330,
//       app: {
//         id: '1',
//         avatar: {
//           imgSrc: 'https://github.com/shadcn.png',
//         },
//         name: 'App Name',
//         tagLine: 'App Tag Line',
//       }
//     },
//   }
// };

// export const GlobalWebScreen: Story = {
//   args: {
//     screen: {
//       id: '1',
//       imgSrc: 'https://placehold.co/530x330',
//       width: 530,
//       height: 330,
//       app: {
//         id: '1',
//         avatar: {
//           imgSrc: 'https://github.com/shadcn.png',
//         },
//         name: 'App Name',
//         tagLine: 'App Tag Line',
//       }
//     },
//     view: 'global',
//   }
// };

// export const InAppWebScreen: Story = {
//   args: {
//     screen: {
//       id: '1',
//       imgSrc: 'https://placehold.co/530x330',
//       width: 530,
//       height: 330,
//       app: {
//         id: '1',
//         avatar: {
//           imgSrc: 'https://github.com/shadcn.png',
//         },
//         name: 'App Name',
//         tagLine: 'App Tag Line',
//       }
//     },
//     view: 'in-app',
//   }
// };

// Simulating loading state
export const LoadingScreen: Story = {
  args: {
    screen: {
      id: 12,
      page_url: null,
      colors: '#046cfc,#114cac,#a2ccfc,#747c7c,#52555a,#d5dbe7',
      app: {
        id: 623,
        name: 'Simple Contacts',
        slug: 'simple-contacts',
        tag_line: 'Renew your Rx and buy lenses',
        platform: 'ios',
        icon: { hash: '79f73d85_4c07_4962_8e4f_e72ad4df24d3_eaedf7dd6d', ext: '.jpg' }
      },
      tags: [{ id: 7, name: 'Account Setup' }],
      components: [{ id: 9, name: 'Hero Image' }, { id: 2, name: 'Button' }],
      screen: {
        id: 1135,
        width: 1125,
        height: 2436,
        hash: 'a2e0c364_6e6b_4ead_9706_5270f0339557_d6f17c0795',
        ext: '.png'
      }
    }
  },
};

// Simulating error state
export const ErrorScreen: Story = {
  args: {
    screen: {
      id: 12,
      page_url: null,
      colors: '#046cfc,#114cac,#a2ccfc,#747c7c,#52555a,#d5dbe7',
      app: {
        id: 623,
        name: 'Simple Contacts',
        slug: 'simple-contacts',
        tag_line: 'Renew your Rx and buy lenses',
        platform: 'ios',
        icon: { hash: '79f73d85_4c07_4962_8e4f_e72ad4df24d3_eaedf7dd6d', ext: '.jpg' }
      },
      tags: [{ id: 7, name: 'Account Setup' }],
      components: [{ id: 9, name: 'Hero Image' }, { id: 2, name: 'Button' }],
      screen: {
        id: 1135,
        width: 1125,
        height: 2436,
        hash: 'a2e0c364_6e6b_4ead_9706_5270f0339557_d6f17c0795',
        ext: '.png'
      }
    }
  },
};

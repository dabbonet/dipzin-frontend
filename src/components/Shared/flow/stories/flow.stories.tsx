import type { Meta, StoryObj } from '@storybook/react';
import { Flow } from '@/components/Shared/flow';

const meta: Meta = {
  title: 'Shared/Flow',
  component: Flow,
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
    flow: {
      id: 30062,
      name: "Settings and privacy",
      app: {
        id: 1072,
        name: "TikTok",
        slug: "tiktok",
        tag_line: "Videos, music & live streams",
        platform: "ios",
        icon: {
          hash: "cbf3df89_e669_4954_a3d8_4c50b3049f9b_8d90c52fde",
          ext: ".webp"
        }
      },
      flow_actions: [],
      flow_screens: [
        {
          id: 152625,
          screen: {
            id: 187780,
            screen: {
              id: 190153,
              width: 1179,
              height: 2556,
              hash: "a3f8582f_f7a3_45c3_b20c_4f6b599c134a_b752e814f8",
              ext: ".png"
            }
          }
        },
        {
          id: 152982,
          screen: {
            id: 177163,
            screen: {
              id: 179000,
              width: 1179,
              height: 2556,
              hash: "bbf4bb5d_8797_4dc0_8e79_ee59154099f5_82798829b5",
              ext: ".png"
            }
          }
        },
        {
          id: 153346,
          screen: {
            id: 177186,
            screen: {
              id: 179028,
              width: 1179,
              height: 2556,
              hash: "4a568fb1_6197_4912_b2df_1863a32a949f_0f9fc67649",
              ext: ".png"
            }
          }
        },
        {
          id: 153684,
          screen: {
            id: 177207,
            screen: {
              id: 179044,
              width: 1179,
              height: 2556,
              hash: "ec2e0e0b_927c_4046_8435_a5ee608f05d4_a0b0f17166",
              ext: ".png"
            }
          }
        },
        {
          id: 153,
          screen: {
            id: 177,
            screen: {
              id: 10,
              width: 1179,
              height: 2556,
              hash: "ec2e0e0b_927c_4046_8435_a5ee608f05d4_a0b0f17166",
              ext: ".png"
            }
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
    flow: {
      id: 30062,
      name: "Settings and privacy",
      app: {
        id: 1072,
        name: "TikTok",
        slug: "tiktok",
        tag_line: "Videos, music & live streams",
        platform: "ios",
        icon: {
          hash: "cbf3df89_e669_4954_a3d8_4c50b3049f9b_8d90c52fde",
          ext: ".webp"
        }
      },
      flow_actions: [],
      flow_screens: [
        {
          id: 152625,
          screen: {
            id: 187780,
            screen: {
              id: 190153,
              width: 1179,
              height: 2556,
              hash: "a3f8582f_f7a3_45c3_b20c_4f6b599c134a_b752e814f8",
              ext: ".png"
            }
          }
        },
        {
          id: 152982,
          screen: {
            id: 177163,
            screen: {
              id: 179000,
              width: 1179,
              height: 2556,
              hash: "bbf4bb5d_8797_4dc0_8e79_ee59154099f5_82798829b5",
              ext: ".png"
            }
          }
        },
        {
          id: 153346,
          screen: {
            id: 177186,
            screen: {
              id: 179028,
              width: 1179,
              height: 2556,
              hash: "4a568fb1_6197_4912_b2df_1863a32a949f_0f9fc67649",
              ext: ".png"
            }
          }
        },
        {
          id: 153684,
          screen: {
            id: 177207,
            screen: {
              id: 179044,
              width: 1179,
              height: 2556,
              hash: "ec2e0e0b_927c_4046_8435_a5ee608f05d4_a0b0f17166",
              ext: ".png"
            }
          }
        },
        {
          id: 153,
          screen: {
            id: 177,
            screen: {
              id: 10,
              width: 1179,
              height: 2556,
              hash: "ec2e0e0b_927c_4046_8435_a5ee608f05d4_a0b0f17166",
              ext: ".png"
            }
          }
        }
      ]
    }
  },
};

// Simulating error state
export const ErrorScreen: Story = {
  args: {
    flow: {
      id: 30062,
      name: "Settings and privacy",
      app: {
        id: 1072,
        name: "TikTok",
        slug: "tiktok",
        tag_line: "Videos, music & live streams",
        platform: "ios",
        icon: {
          hash: "cbf3df89_e669_4954_a3d8_4c50b3049f9b_8d90c52fde",
          ext: ".webp"
        }
      },
      flow_actions: [],
      flow_screens: [
        {
          id: 152625,
          screen: {
            id: 187780,
            screen: {
              id: 190153,
              width: 1179,
              height: 2556,
              hash: "a3f8582f_f7a3_45c3_b20c_4f6b599c134a_b752e814f8",
              ext: ".png"
            }
          }
        },
        {
          id: 152982,
          screen: {
            id: 177163,
            screen: {
              id: 179000,
              width: 1179,
              height: 2556,
              hash: "bbf4bb5d_8797_4dc0_8e79_ee59154099f5_82798829b5",
              ext: ".png"
            }
          }
        },
        {
          id: 153346,
          screen: {
            id: 177186,
            screen: {
              id: 179028,
              width: 1179,
              height: 2556,
              hash: "4a568fb1_6197_4912_b2df_1863a32a949f_0f9fc67649",
              ext: ".png"
            }
          }
        },
        {
          id: 153684,
          screen: {
            id: 177207,
            screen: {
              id: 179044,
              width: 1179,
              height: 2556,
              hash: "ec2e0e0b_927c_4046_8435_a5ee608f05d4_a0b0f17166",
              ext: ".png"
            }
          }
        },
        {
          id: 153,
          screen: {
            id: 177,
            screen: {
              id: 10,
              width: 1179,
              height: 2556,
              hash: "ec2e0e0b_927c_4046_8435_a5ee608f05d4_a0b0f17166",
              ext: ".png"
            }
          }
        }
      ]
    }
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar, AvatarFallback, AvatarImage
} from '@/components/Shared/avatar';

// Meta configuration
const meta: Meta<typeof Avatar> = {
  title: 'Shared/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['default', 'large'],
    },
    radius: {
      control: { type: 'radio' },
      options: ['circle', 'square'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

// Avatar with Image Story
export const AvatarDefault: Story = {
  args: {
    size: 'default',
    radius: 'circle',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>Shadcn</AvatarFallback>
    </Avatar>
  ),
};

// Large Square Avatar Story
export const LargeSquareAvatar: Story = {
  args: {
    size: 'large',
    radius: 'square',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>Shadcn</AvatarFallback>
    </Avatar>
  ),
};

// Avatar with Fallback Story
export const AvatarWithFallback: Story = {
  args: {
    size: 'default',
    radius: 'circle',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

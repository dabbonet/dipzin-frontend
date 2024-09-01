import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@/components/UI/icon';

import { Button } from '@/components/Shared/button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'secondary',
        'strocked',
        'link',
        'liteGray',
        'darkGray',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

// General Button Story
export const DefaultButton: Story = {
  args: {
    variant: 'default',
    children: 'Button CTA',
  },
};

// Button with Icons
export const ButtonWithIcon: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <Icon.Example className="size-5" />
        Button Cta
        <Icon.Example className="size-5" />
      </>
    ),
  },
};

// Icon-only Button
export const IconButton: Story = {
  args: {
    variant: 'default',
    isIconOnly: true,
    children: <Icon.Example className="size-5" />,
  },
};

// Disabled Button
export const DisabledButton: Story = {
  args: {
    variant: 'secondary',
    children: 'Button CTA',
    disabled: true,
  },
};

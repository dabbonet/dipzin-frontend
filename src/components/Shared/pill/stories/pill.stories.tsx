import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@/components/UI/icon';

import { Pill } from '@/components/Shared/pill';

const meta: Meta<typeof Pill> = {
  title: 'Shared/Pill',
  component: Pill,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['default', 'selected', 'suggestion'],
    },
    startContent: { control: 'text' },
    endContent: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const DefaultPill: Story = {
  args: {
    state: 'default',
    children: 'Label',
  },
};

export const PillWithAction: Story = {
  args: {
    state: 'selected',
    startContent: <Icon.Example className="size-5 hover:bg-slate-500 rounded-full" />, // Replace with your icon
    children: "label",
  },
};

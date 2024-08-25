import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@/components/UI/icon';

import { Button } from '@/components/Shared/button';
import { Input } from '@/components/Shared/input';

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'disabled'],
    },
    type: {
      control: { type: 'select' },
      options: ['search'],
    },
    startContent: { control: 'text' },
    endContent: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const DefaultInput: Story = {
  args: {
    label: 'Label',
    helpText: 'Help text goes here.',
    placeholder: 'Enter text...',
    state: 'default',
    className: "w-[500px]"
  },
};

export const InputWithIcons: Story = {
  args: {
    ...DefaultInput.args,
    startContent: <Icon.Example className="size-5" />,
    endContent: <Icon.Example className="size-5" />,
    state: "default"
  },
};

export const InputWithButton: Story = {
  args: {
    ...DefaultInput.args,
    endContent: <Button variant="default" size="sm">Button CTA</Button>,
    label: "",
    helpText: ""
  },
};

export const ErrorStateInput: Story = {
  args: {
    ...DefaultInput.args,
    state: 'error',
    errorMessage: 'Error message goes here.',
  },
};

export const DisabledInput: Story = {
  args: {
    ...DefaultInput.args,
    state: 'disabled',
    disabled: true,
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    className: "w-[700px]"
  },
};

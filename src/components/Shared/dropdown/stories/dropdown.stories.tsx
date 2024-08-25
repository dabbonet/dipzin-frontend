import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from "@/components/Shared/dropdown"; // Adjust the path as necessary
import { Icon } from '@/components/UI/icon';
import { Button } from '@/components/Shared/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Shared/avatar';
import {
  Command, CommandInput, CommandList
} from '@/components/UI/command';

// Meta configuration
const meta: Meta<typeof Dropdown> = {
  title: 'Shared/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

// Default Dropdown Story
export const DropdownDefault: Story = {
  args: {
    trigger: (
      <Button
        variant="darkGray"
        role="combobox"
        className="w-full justify-between py-4 bg-slate-800"
      >
        <span className="flex items-center gap-x-2">
          <Avatar className="size-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          open
        </span>
        <Icon.ChevronDown className="size-6 text-slate-400" />
      </Button>
    ),
    content: (
      <Command>
        <CommandInput placeholder="Search" />

      </Command>
    ),
  },
  render: (args) => (
    <Dropdown
      classNames={{
        base: "w-[600px]",
        content: "w-[600px]",
      }}
      placement="center"
      {...args}
    />
  ),
};

// Menu Story (Three-dot menu button)
export const Menu: Story = {
  args: {
    trigger: (
      <Button variant="darkGray" className="p-2 bg-slate-800">
        <Icon.EllipsisVertical className="size-6 text-slate-400" />
      </Button>
    ),
    content: (
      <Command />
    ),
  },
  render: (args) => (
    <Dropdown
      classNames={{
        base: "",
        content: "w-[200px]",
      }}
      placement="end"
      {...args}
    />
  ),
};

// User Menu Story (Avatar and burger menu icon)
export const UserMenu: Story = {
  args: {
    trigger: (
      <Button
        variant="darkGray"
        role="combobox"
        className="flex items-center gap-x-2 p-1 pr-2 size-fit rounded-full bg-slate-900"
      >
        <Avatar className="size-6">
          <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Icon.BurgerMenu className="size-6 text-slate-400" />
      </Button>
    ),
    content: (
      <Command>
        <CommandList />
      </Command>
    ),
  },
  render: (args) => (
    <Dropdown
      classNames={{
        base: "",
        content: "w-[400px] bg-slate-900",
      }}
      placement="end"
      {...args}
    />
  ),
};

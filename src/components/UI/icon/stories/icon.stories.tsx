import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Icon } from '@/components/UI/icon';
import type { IconProps } from '@/components/UI/icon';

const meta: Meta = {
  title: 'Shared/Icon',
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<IconProps>;

const IconGrid: React.FC<IconProps> = (args) => {
  const iconNames = Object.keys(Icon) as Array<keyof typeof Icon>;

  return (
    <div className="size-full flex flex-wrap items-center justify-center gap-10">
      {iconNames.map((name) => {
        const IconComponent = Icon[name];
        return (
          <div key={name} className="flex flex-col items-center">
            <IconComponent {...args} />
            <p>{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export const AllIcons: Story = {
  render: (args) => <IconGrid {...args} />,
  args: {
    className: 'size-8',
  },
};

export const WithClassName: Story = {
  render: (args) => <IconGrid {...args} />,
  args: {
    className: 'text-blue-500 size-6',
  },
};

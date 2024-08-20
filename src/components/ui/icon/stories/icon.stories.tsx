import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import type { IconProps } from '../src/icon';
import Icon from '../src/icon';

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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
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
    width: 24,
    height: 24,
  },
};

export const CustomSize: Story = {
  render: (args) => <IconGrid {...args} />,
  args: {
    width: 32,
    height: 32,
    className: '',
  },
};

export const WithClassName: Story = {
  render: (args) => <IconGrid {...args} />,
  args: {
    width: 24,
    height: 24,
    className: 'fill-blue-500',
  },
};

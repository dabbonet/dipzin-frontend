import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Logo } from '@/components/UI/logo';
import type { LogoProps } from '@/components/UI/logo';

const meta: Meta = {
  title: 'Shared/Logo',
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<LogoProps>;

const LogoGrid: React.FC<LogoProps> = (args) => {
  const logoNames = Object.keys(Logo) as Array<keyof typeof Logo>;

  return (
    <div className="size-full flex flex-wrap items-center justify-center gap-10">
      {logoNames.map((name) => {
        const LogoComponent = Logo[name];
        return (
          <div key={name} className="flex flex-col items-center">
            <LogoComponent {...args} />
            <p>{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export const AllLogos: Story = {
  render: (args) => <LogoGrid {...args} />,
  args: {
    className: 'size-8',
  },
};

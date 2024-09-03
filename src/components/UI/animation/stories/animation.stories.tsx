import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Animation } from '@/components/UI/animation';
import type { AnimationProps } from '@/components/UI/animation';

const meta: Meta = {
  title: 'Shared/Animation',
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<AnimationProps>;

const AnimationsGrid: React.FC<AnimationProps> = (args) => {
  const AnimationNames = Object.keys(Animation) as Array<keyof typeof Animation>;

  return (
    <div className="size-full flex flex-wrap items-center justify-center gap-10">
      {AnimationNames.map((name) => {
        const AnimationComponent = Animation[name];
        return (
          <div key={name} className="flex flex-col items-center">
            <AnimationComponent {...args} />
            <p>{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export const AllAnimations: Story = {
  render: (args) => <AnimationsGrid {...args} />,
  args: {
    className: 'size-8',
  },
};

export const WithClassName: Story = {
  render: (args) => <AnimationsGrid {...args} />,
  args: {
    className: 'text-blue-500 size-6',
  },
};

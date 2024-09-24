import type { Meta, StoryObj } from '@storybook/react';
import { Navigator } from '@/app/(explorer)/_components/navigator';

const meta: Meta<typeof Navigator> = {
  title: 'Explorer/Navigator',
  component: Navigator,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Navigator>;

export const DefaultNavigator: Story = {
};

import type { Meta, StoryObj } from '@storybook/react';
import { Panel } from '@/components/Explorer/panel';

const meta: Meta<typeof Panel> = {
  title: 'Explorer/Panel',
  component: Panel,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Panel>;

export const DefaultPanel: Story = {
};

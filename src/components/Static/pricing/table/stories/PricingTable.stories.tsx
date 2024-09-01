import type { Meta, StoryObj } from '@storybook/react';
import { PricingTable } from '@/components/Static/pricing/table';

type Story = StoryObj;

export default {
  title: 'Static/Pricing/PricingTable',
  component: PricingTable,
} as Meta;

export const DefaultTable: Story = {
  args: {
    checkout: {
      unit_amount: 699, // $10.00
      recurring: {
        interval: 'month',
        interval_count: 1,
      },
    },
  }
};

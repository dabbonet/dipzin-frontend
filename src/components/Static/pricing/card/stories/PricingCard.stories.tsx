import type { Meta, StoryObj } from '@storybook/react';
import { PricingCard } from '@/components/Static/pricing/card';

type Story = StoryObj<typeof PricingCard>;

export default {
  title: 'Static/Pricing/PricingCard',
  component: PricingCard,
} as Meta<typeof PricingCard>;

export const DefaultCard: Story = {
  args: {
    planName: "Personal",
    planDescription: "Great for freelancers",
    amount: 6.99,
    featuresList: ["Feature 1", "Feature 2", "Feature 3"],
    billingPeriod: "Quarterly",
    isCurrentPlan: false,
  },
};

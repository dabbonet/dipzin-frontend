import React from 'react';
import PricingHero from './_components/PricingHero';
import PricingNav from './_components/PricingNav';
import { TopFeatures } from './_components/top-features';
import PricingTable from './_components/PricingTable';
import CustomerLoveCorner from './_components/CustomerLoveCorner';
import PricingFooter from './_components/PricingFooter';
import { getPricing } from './_actions/getPricing';

export default async function PricingPage() {
  const pricingData = await getPricing();

  const mockData = {
    unit_amount: 1000,
    recurring: {
      interval: 'month',
      interval_count: 1,
    },
    id: '1',
  }

  return (
    <div>
      <PricingNav />
      <PricingHero checkoutPlans={pricingData} />
      <PricingTable checkout={mockData as any} currentPlan="free" />
      <TopFeatures />
      <CustomerLoveCorner />
      <PricingFooter />
    </div>
  );
}

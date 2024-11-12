import React from 'react';
import PricingHero from './_components/PricingHero';
import PricingNav from './_components/PricingNav';
import type { Checkout } from './_components/PricingTable';
import { TopFeatures } from './_components/top-features';
import PricingTable from './_components/PricingTable';
import CustomerLoveCorner from './_components/CustomerLoveCorner';
import PricingFooter from './_components/PricingFooter';

const mockData : Checkout = {
  unit_amount: 1000,
  recurring: {
    interval: 'month',
    interval_count: 1,
  },
  id: '1',
}

// const pricingData = await getPricing();
const PricingPage: React.FC = () => (
  <div>
    <PricingNav />
    <PricingHero />
    <PricingTable checkout={mockData} currentPlan="free" />
    <TopFeatures />
    <CustomerLoveCorner />
    <PricingFooter />
  </div>
)

export default PricingPage;

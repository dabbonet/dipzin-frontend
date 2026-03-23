import React from 'react';
import PricingHero from './_components/PricingHero';
import PricingNav from './_components/PricingNav';
import { TopFeatures } from './_components/top-features';
import PricingTable from './_components/PricingTable';
import CustomerLoveCorner from './_components/CustomerLoveCorner';
import PricingFooter from './_components/PricingFooter';
import { getPricing } from './_actions/getPricing';

export const dynamic = 'force-dynamic';

export default async function PricingPage() {
  const pricingData = await getPricing();

  // Get the personal plan (usually the second plan, or first available)
  // Use API defaults that match backend ($89.99 for 1 year)
  const personalPlan = pricingData.length > 0 
    ? pricingData[pricingData.length > 1 ? 1 : 0] 
    : {
        unit_amount: 8999, // $89.99
        recurring: { interval: 'year', interval_count: 1 },
        id: 'default',
      };

  return (
    <>
      <PricingNav />
      <PricingHero checkoutPlans={pricingData} />
      <PricingTable checkout={personalPlan as any} currentPlan="free" />
      <TopFeatures />
      <CustomerLoveCorner />
      <PricingFooter />
    </>
  );
}

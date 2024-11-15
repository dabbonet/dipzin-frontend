"use client"

import { Button } from '@/components/Shared/button';
import {
  Card, CardContent, CardFooter, CardHeader
} from '@/components/UI/card';
import { Icon } from '@/components/UI/icon';
import React from 'react';
import { postCheckout } from '../_actions/postCheckout';

const pricingPlans = [
  {
    id: 1,
    duration: '6 Months',
    accountType: 'Premium Account',
    features: [
      'Download in bulk',
      'Select and Copy',
      'Unlimited Collections',
      'Unlimited Search & Filters'
    ],
    buttonText: 'Get started',
    buttonLink: '/'
  },
  {
    id: 2,
    duration: '1 Year',
    accountType: 'Premium Account',
    features: [
      'Download in bulk',
      'Select and Copy',
      'Unlimited Collections',
      'Unlimited Search & Filters'
    ],
    buttonText: 'Get started',
    buttonLink: '/'
  },
  {
    id: 3,
    duration: '3 Years',
    accountType: 'Premium Account',
    features: [
      'Download in bulk',
      'Select and Copy',
      'Unlimited Collections',
      'Unlimited Search & Filters'
    ],
    buttonText: 'Get started',
    buttonLink: '/'
  }
];

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  unit_amount: number;
  recurring: {
    interval: string;
    interval_count: number;
  };
  features: string[];
}

interface PricingHeroProps {
  checkoutPlans: PricingPlan[];
}

const PricingHero: React.FC<PricingHeroProps> = ({ checkoutPlans }) => (
  <section className="py-8 mx-auto max-w-screen-2xl lg:py-16">
    <div className="mx-auto max-w-screen-lg text-center mb-8 lg:mb-12">
      <span className="text-aqua-500 text-base font-medium mb-1">Our Plans</span>
      <h2 className="mb-4 text-6xl tracking-tight">Tailored Pricing for Every Business</h2>
      <p className="mb-14 text-xl text-[#949DAD]">No matter your size or needs, we’ve got a plan that’s just right for you.</p>
    </div>
    <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
      {pricingPlans.map((plan, i) => (
        <Card key={plan.id} className="size-full mx-auto max-w-lg">
          <CardHeader className="text-2xl font-semibold">
            <h3 className="font-outfit text-2xl font-semibold">{plan.duration}</h3>
            <p className="text-lg font-medium text-slate-300">{plan.accountType}</p>
          </CardHeader>
          <CardContent>
            <h2 className="text-7xl font-semibold font-outfit">
              $
              {(checkoutPlans[i]?.unit_amount ?? 0) / 100}
              <span className="text-5xl font-medium text-slate-300">$</span>
            </h2>
          </CardContent>
          <CardFooter className="flex-col items-start">
            <ul className="mb-5 space-y-2.5 text-left">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center space-x-1">
                  <Icon.Check className="size-5 text-aqua-100" />
                  <span className="text-lg font-medium font-outfit leading-6">{feature}</span>
                </li>
              ))}
            </ul>
            <form className="w-full" action={() => postCheckout(plan.id.toString())}>
              <Button fullWidth size="2xl" variant="darkGray" type="submit">
                Get Started
              </Button>
            </form>
          </CardFooter>
        </Card>
      ))}
    </div>
  </section>
);

export default PricingHero;

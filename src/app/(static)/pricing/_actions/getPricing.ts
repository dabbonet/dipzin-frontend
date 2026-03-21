"use server";

import { get } from "@/utils/api";

interface PricingPlan {
  id: string;
  name?: string;
  unit_amount: number;
  recurring: {
    interval: string;
    interval_count: number;
  };
  features?: string[];
}

interface PricingResponse {
  data: PricingPlan[] | { data: PricingPlan[] };
  isDefault?: boolean;
  error?: string;
}

export const getPricing = async (): Promise<PricingPlan[]> => {
  try {
    const pricingReq: PricingResponse = await get('/pricing');

    if (!pricingReq || !pricingReq.data) {
      console.warn('[Pricing] No pricing data available, using defaults');
      return getDefaultPricing();
    }

    // Handle both direct array and nested data structure
    const pricingData = Array.isArray(pricingReq.data) 
      ? pricingReq.data 
      : (pricingReq.data as { data: PricingPlan[] }).data;

    if (!pricingData || pricingData.length === 0) {
      console.warn('[Pricing] Empty pricing data, using defaults');
      return getDefaultPricing();
    }

    if (pricingReq.isDefault) {
      console.info('[Pricing] Using default pricing (Stripe not configured)');
    }

    return pricingData;
  } catch (error) {
    console.error('[Pricing] Error fetching pricing:', error);
    return getDefaultPricing();
  }
};

// Default pricing fallback
const getDefaultPricing = (): PricingPlan[] => [
  {
    id: 'price_default_6months',
    name: '6 Months',
    unit_amount: 1500,
    recurring: { interval: 'month', interval_count: 6 },
    features: ['Download in bulk', 'Select and Copy', 'Unlimited Collections', 'Unlimited Search & Filters'],
  },
  {
    id: 'price_default_1year',
    name: '1 Year',
    unit_amount: 2500,
    recurring: { interval: 'year', interval_count: 1 },
    features: ['Download in bulk', 'Select and Copy', 'Unlimited Collections', 'Unlimited Search & Filters'],
  },
  {
    id: 'price_default_3years',
    name: '3 Years',
    unit_amount: 5000,
    recurring: { interval: 'year', interval_count: 3 },
    features: ['Download in bulk', 'Select and Copy', 'Unlimited Collections', 'Unlimited Search & Filters'],
  },
];

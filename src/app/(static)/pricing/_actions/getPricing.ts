"use server";

// Use direct fetch with fallback URL to avoid module-level errors
const API_BASE_URL = process.env.NEXT_PUBLIC_API || 'https://dipbk.fin.dabbo.net';

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
    // Use direct fetch instead of the shared get() to have more control
    const response = await fetch(`${API_BASE_URL}/pricing`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn(`[Pricing] API returned ${response.status}, using defaults`);
      return getDefaultPricing();
    }

    const pricingReq: PricingResponse = await response.json();

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

// Default pricing fallback (matches backend defaults)
const getDefaultPricing = (): PricingPlan[] => [
  {
    id: 'price_default_6months',
    name: '6 Months',
    unit_amount: 4999, // $49.99
    recurring: { interval: 'month', interval_count: 6 },
    features: ['Download in bulk', 'Select and Copy', 'Unlimited Collections', 'Unlimited Search & Filters'],
  },
  {
    id: 'price_default_1year',
    name: '1 Year',
    unit_amount: 8999, // $89.99
    recurring: { interval: 'year', interval_count: 1 },
    features: ['Download in bulk', 'Select and Copy', 'Unlimited Collections', 'Unlimited Search & Filters'],
  },
  {
    id: 'price_default_3years',
    name: '3 Years',
    unit_amount: 19999, // $199.99
    recurring: { interval: 'year', interval_count: 3 },
    features: ['Download in bulk', 'Select and Copy', 'Unlimited Collections', 'Unlimited Search & Filters'],
  },
];

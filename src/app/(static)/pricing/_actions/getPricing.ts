"use server";

import { get } from "@/utils/api";

export const getPricing = async () => {
  const pricingReq = await get('/pricing');

  if (!pricingReq) {
    throw new Error("Failed to fetch pricing");
  }

  return pricingReq.url.data;
};
